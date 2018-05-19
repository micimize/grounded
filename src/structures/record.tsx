import React, { ReactChildren } from 'react';
import * as R from 'ramda'
import { Easing } from 'react-native';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import * as Animatable from 'react-native-animatable'

import { withShadowedProps, Editable, createEditable } from '../lib/wrapper-components'

import { ThemeProvider } from 'styled-components/native'

import * as Button from '../button'
import { Sprout } from '../styled/animations'

import poems from '../storybook/poems'

type Props<T> = {
  value: T,
  onEdit: (value: Partial<T>) => any,
}

type State<T> = { changed: Partial<T> }

type Fields<T> = {
  [K in keyof T]: <
    P extends Editable.Props<T[K]>,
    E extends React.ReactElement<Partial<P>>
  >(element: E) => React.ReactElement<Partial<P> & Pick<P, 'value' | 'onEdit'>>
}

// createRecord takes a map of fields to Editables, as well as a way to "render" them
const createRecord = <
  T extends object,
  D extends Editable.DisplayProps<T> = Editable.DisplayProps<T>,
  E extends Editable.EditorProps<Partial<T>> & D = Editable.EditorProps<Partial<T>> & D,
  >(Layout: React.ComponentType<E & { field: Fields<T>, controls?: React.ReactElement<any> }>) => {
  let valueOf = <K extends keyof T>(value: T | undefined, key: K) =>
    value ? (value as T)[key] : undefined

  let getter = (getter: (key: keyof T) => any) =>
    new Proxy({}, {
      get(obj: {}, key: keyof T ) {
        return getter(key)
      }
    }) as Fields<T>
  
  class RecordEditor extends React.Component<E, {}> {

    field: Fields<T> = getter(
      <K extends keyof T>(field: K) => <
        P extends Editable.Props<T[K]>,
        E extends React.ReactElement<Partial<P>>
      >(element: E) => React.cloneElement(
        element as any as React.ReactElement<Partial<P> & Pick<P, 'value' | 'onEdit'>>,
        this.cursor(field) as Partial<P>
      )
    )

    cursor = <K extends keyof T>(key: K) => ({
      value: valueOf(this.props.value, key),
      onEdit: this.props.onEdit ?
        (value: T[K]) => this.props.onEdit &&
          this.props.onEdit({ [key]: value } as any as Partial<T>) :
        undefined
    })

    render() {
      return (
        <Layout field={this.field} {...R.omit(['onEdit'], this.props)} />
      )
    }
  }

  let Record = (props: D) => (
    <Layout
      field={getter(<
        K extends keyof T,
        P extends Editable.Props<T[K]>,
        E extends React.ReactElement<Partial<P>>
        >(field: K) => (element: E) =>
          React.cloneElement(
            element as any as React.ReactElement<Partial<P> & Pick<P, 'value' | 'onEdit'>>,
            { value: valueOf(props.value, field) } as Partial<P>
          )
      )}
      {...R.omit(['onEdit'], props)} />
  )

  let Controller = ({ children, editing, focus, blur, commitEdit }: Editable.ControllerProps) => {
    let focused = editing === 'focused'
    let blurred = editing === 'blurred'
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {children}
        <View style={{ flexDirection: 'column', paddingLeft: 10 }}>
          <Sprout show={Boolean(editing)}>
            <Button.Icon
              color="info"
              background="background"
              name="pencil"
              onPress={focus}
              disabled={focused} />
          </Sprout>
          <Sprout show={focused}>
            <Button.Icon
              color="background"
              background="success"
              name="check"
              onPress={commitEdit}
              disabled={!focused} />
          </Sprout>
          <Sprout show={focused}>
            <Button.Icon
              color="background"
              background="danger"
              name="ban"
              disabled={!focused}
              onPress={blur} />
          </Sprout>
        </View>
      </View>
    )
  }

  return createEditable<T, D, E, Editable.ControllerProps>({
    display: Record,
    editor: RecordEditor,
    controller: Controller,
    controlledEdit: (value, old) => Object.assign({}, old || {}, value)
  })
}

export default createRecord