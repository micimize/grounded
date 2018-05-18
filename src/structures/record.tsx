import React, { ReactChildren } from 'react';
import * as R from 'ramda'
import { Easing } from 'react-native';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import * as Animatable from 'react-native-animatable'

import { withShadowedProps, Editable, createEditable } from '../lib/wrapper-components'

import { ThemeProvider } from 'styled-components/native'

import poems from '../storybook/poems'

type Props<T> = {
  value: T,
  onEdit: (value: Partial<T>) => any,
}

type State<T> = { changed: Partial<T> }

type Editables<T extends object> = {
  [K in keyof T]: Editable<T[K]>
}

type ComponentProps<T, Default = any> =
  T extends (props: infer P & { children?: React.ReactNode }) => any ? P :
  T extends new (props: infer P) => any ? P:
  Default

type ShadowedEditables<T extends object, Components extends Editables<T>> = {
  [K in keyof T]: withShadowedProps.Keys<
    ComponentProps<Components[K], Editable.Props<T[K]>>,
    'value' | 'onEdit'
  >
}

// createRecord takes a map of fields to Editables, as well as a way to "render" them
const createRecord = <T extends object>() =>
  <Components extends Editables<T>>(components: Components) =>
  <
    Shadowed extends ShadowedEditables<T, Components>,
    D extends Editable.DisplayProps<T>,
    E extends Editable.EditorProps<T> & D
  >(
    Layout: (components: Shadowed) => React.ComponentType<E>
  ) => {
  class RecordEditor extends React.Component<E, State<T>> {
    state: State<T> = { changed: {} }

    cursor = <K extends keyof T>(key: K) => ({
      value: this.state.changed[key] || (
        this.props.value ? (this.props.value as T)[key] : undefined
      ),
      onEdit: (value: T[K]) => this.setState({
        changed: Object.assign(this.state.changed, { [key]: value })
      })
    })

    render() {
      let RecordEditor = Layout(
          R.mapObjIndexed(
          (Component, key) =>
            withShadowedProps(this.cursor(key), Component),
          components
        ) as Shadowed
      )
      return <RecordEditor {...this.props} />
    }
  }
  let Fields = (value?: T) => R.mapObjIndexed(
    (Component, key) =>
      withShadowedProps(
        { value: value ? value[key] : undefined },
        Component
      ),
    components
  ) as Shadowed
  const Record = (props: D) => {
    let RecordDisplay = Layout(Fields(props.value))
    return <RecordDisplay {...props}/>
  }
  return createEditable<T, D, E, Editable.SugarProps>({
    display: Record,
    editor: RecordEditor,
    sugar: p => <View style={{ flex: 1 }} {...p}/>
  })
 }

export default createRecord