import React, { ReactChildren } from 'react';
import * as R from 'ramda'
import { Easing } from 'react-native';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import * as Animatable from 'react-native-animatable'

import { withShadowedProps, Editable } from '../lib/wrapper-components'

import { ThemeProvider } from 'styled-components/native'

import poems from '../storybook/poems'

type Props<T> = {
  value: T,
  onEdit: (value: Partial<T>) => any,
}

type State<T> = { changed: Partial<T>, editing: boolean }

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
  <Shadowed extends ShadowedEditables<T, Components>>(render: (components: Shadowed) => React.ReactElement<any>) =>
  class Record extends React.Component<Props<T>, State<T>> {
    state: State<T> = { changed: {}, editing: false }

    cursor = <K extends keyof T>(key: K) => ({
      value: this.state.changed[key] || this.props.value[key],
      onEdit: this.state.editing ?
        (value: T[K]) => this.setState({
          changed: Object.assign(this.state.changed, { [key]: value })
        }) :
        undefined
    })

    render() {
      let wrapped = R.mapObjIndexed(
        <K extends keyof T & keyof Components>(Component, key: K) =>
          withShadowedProps(this.cursor(key), Component),
        components
      ) as Shadowed
      return render(wrapped)
    }
  }

export default createRecord