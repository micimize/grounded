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
    Value extends T[K],
    P extends Editable.Props<Value>,
    E extends React.ReactElement<Partial<P>>
    >(element: E) => React.ReactElement<Partial<P> & Pick<P, 'value' | 'onEdit'>>
}

type Layout<EProps, _T> = React.ComponentType<EProps & {
  field: Fields<Full<_T>>,
  controls?: React.ReactElement<any>
}>

let defaultControlledEdit = (old = {}, value = {}) => Object.assign({}, old, value)
let defaultControlledCommit = (old = {}, value) => value

export const merge = defaultControlledEdit
// R.pipe(R.unapply(R.identity), R.mergeAll)

// createRecord takes a map of fields to Editables, as well as a way to "render" them
const createRecord = <
  _T extends object, // todo a bit of a mess with all these Partial<>s and Full<>s
  T extends Partial<_T> = Partial<T>,
  D extends Editable.DisplayProps<T> = Editable.DisplayProps<T>,
  E extends Editable.EditorProps<Partial<T>> & D = Editable.EditorProps<Partial<T>> & D,
>(options: {
    onEdit?: Editable.ControlledEdit<T>
    render: Layout<E, _T>,
  } | Layout<E, _T>)  => {
  let {
    onEdit: controlledCommit = defaultControlledCommit as Editable.ControlledEdit<T>,
    render: Layout
  } = ('render' in options) ? options : { render: options }


  let valueOf = <K extends keyof T>(value: T | undefined, key: K) =>
    value ? (value as T)[key] : undefined

  let getter = (getter: (key: keyof T) => any) =>
    new Proxy({}, {
      get(obj: {}, key: keyof T) {
        return getter(key)
      }
    }) as Fields<Full<_T>>

  class RecordEditor extends React.Component<E, {}> {

    field: Fields<Full<_T>> = getter(
      <K extends keyof T>(field: K) => <
        Value extends T[K],
        P extends Editable.Props<Value>,
        E extends React.ReactElement<Partial<P>>
        >(element: E) => React.cloneElement(
          element as any as React.ReactElement<Partial<P> & Pick<P, 'value' | 'onEdit'>>,
          this.cursor(field) as Partial<P>
        )
    )

    cursor = <K extends keyof T>(key: K) => ({
      value: valueOf(this.props.value, key),
      onEdit: this.props.onEdit ?
        (value: T[K]) => {
          if (this.props.onEdit) {
            this.props.onEdit({ [key]: value } as any as Partial<T>)
          }
        } :
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
              pressed={focused} />
          </Sprout>
          <Sprout show={focused}>
            <Button.Icon
              color="background"
              background="success"
              name="check"
              onPress={() => (commitEdit && commitEdit(), blur && blur())}
              disabled={!focused} />
          </Sprout>
          <Sprout show={focused}>
            <Button.Icon
              color="background"
              background="warning"
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
    controlledEdit: defaultControlledEdit as Editable.ControlledEdit<T>,
    controlledCommit
  })
}

export default createRecord