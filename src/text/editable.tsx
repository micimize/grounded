import React from 'react';
import * as R from 'ramda';
import { Easing, TextProps, TextInputProps, ViewProps, NativeSyntheticEvent as NSEvent } from 'react-native'
import styled, { css } from 'styled-components/native'
import * as select from '../theme/select'
import * as themed from '../theme/themed'
import withDefaultProps from '../theme/with-default-props'

import * as Animatable from 'react-native-animatable'

import Icon from 'react-native-vector-icons/FontAwesome'
import { IconProps } from 'react-native-vector-icons/Icon';

import { Sprout } from '../styled/animations'

import PlainText from './plain-text'
import PlainTextInput from './plain-text-input'

import lens from '../lib/lens'

const editingColors = (left, right) => props => props.editing === true ?
  props.theme.colors[right[0]][right[1]] :
  props.theme.colors[left[0]][left[1]] 

type Keyable<T, Ks extends keyof T = keyof T> = Ks
  | Ks extends 'true' ? true : Ks
  | Ks extends 'false' ? false : Ks
  | Ks extends 'undefined' ? undefined : Ks
  | Ks extends 'null' ? null : Ks

type ToKeyable = string | true | false | null | undefined | number
type ToString<K extends string | true | false | null | undefined | number> =
  K extends true ? 'true' :
  K extends false ? 'false' :
  K extends undefined ? 'undefined' :
  K extends number ? 'number' :
  K extends null ? 'null' :
  K

type Cases<Keys extends ToKeyable, DK extends Keys = Keys> = (
  Record<ToString<DK>, any> & Partial<Record<ToString<Keys>, any>>
)

type C = Cases<'invite' | boolean | undefined, false>

let propOf = <DK extends ToKeyable>({ default: defaultKey }: { default: DK }) =>
 <T extends Cases<DK>>(obj: T): <K extends Keyable<T>>(key: K) => T[keyof T] => 
  R.pipe(
    R.flip(R.prop)(obj),
    R.when(
      R.isNil,
      R.always(obj[defaultKey as ToString<DK>])
    )
  )

type P = { editing: boolean | 'invite', multiline: boolean } & Animatable.ViewProps

type _P = { editing: boolean | 'invite' }

function selector<
  T,
  Focus extends ToKeyable,
  DK extends Focus,
>(lens: R.ManualLens<Focus, T>, { default: defaultKey }: { default: DK }) {
  return (cases: Cases<Focus, DK>) => R.pipe(
    R.view(lens) as (t: T) => Keyable<Cases<Focus, DK>>,
    propOf<DK>({ default: defaultKey })(cases)
  ) 
}

let whenEditing = selector(
  lens<_P>('!').editing, {
    default: false
  }
)

let paddingWidth = whenEditing({
  false: 4,
  invite: 2,
  true: 1,
})
let borderWidth = whenEditing({
  false: 0,
  invite: 2,
  true: 3
})

const Animated = withDefaultProps<P>(
  {
    useNativeDriver: true,
    transition: [
      'paddingBottom', 'borderBottomColor', 'borderBottomWidth',
      'paddingLeft', 'borderLeftColor', 'borderLeftWidth'
    ] as any
  },
  Animatable.View as any
)

const Wrapper = styled<P>(Animated)`
  margin-bottom: 12px;
  flex-direction: row;
  align-items: ${props => props.multiline ? 'flex-start' : 'center'};
  border-style: dashed;
  padding-bottom: ${paddingWidth};
  border-bottom-width: ${borderWidth};
  border-bottom-color: ${editingColors(['content', 'muted'], ['feedback', 'info'])};
  ${props => props.multiline ? css`
    padding-left: ${paddingWidth};
    border-left-width: ${borderWidth};
    border-left-color: ${editingColors(['content', 'muted'], ['feedback', 'info'])(props)}
  ` : css`
    padding-left: 4
  `}
`

const EditIcon = themed.default<IconProps>(styled(Icon)`
  color: ${select.text.color};
  font-size: ${select.text.size};
  font-size: 15;
` as any)

type Editable<Props, Edit extends keyof Props> = Props & {
  onEdit?: Props[Edit]
  editing?: 'invite' | boolean
}

type IP = Editable<TextInputProps, 'onChangeText'>

const Input = themed.default<IP>(({ onEdit, ...props }) =>
  <PlainTextInput onChangeText={onEdit} {...props}/>)

function and(f: () => any, other?: () => any) {
  if (other) {
    return () => (
      f(),
      other()
    )
  }
  return f
}
class EditablePlainText extends React.Component<IP, { editFocus: boolean }> {
  state = { editFocus: false }
  inputProps = () => {
    let { onFocus, onBlur, value, numberOfLines, multiline } = this.props
    numberOfLines = numberOfLines !== undefined ?
      numberOfLines :
      (value || '').split('\n').length
    let setFocus = (editFocus, cb) => cb ? 
      () => (this.setState({ editFocus }), cb()) :
      () => this.setState({ editFocus })
    return {
      value,
      multiline: multiline || numberOfLines > 1,
      numberOfLines,
      onFocus: setFocus(true, onFocus),
      onBlur: setFocus(false, onBlur),
    }
  }
  render() {
    let { onEdit, onFocus, onBlur, editing, value, numberOfLines, multiline, ...props } = this.props
    let inputProps = this.inputProps()
    let multi = inputProps.multiline
    return (
      <Wrapper editing={onEdit === undefined ? false : this.state.editFocus} multiline={multi}>
        {onEdit ?
          <Input onEdit={onEdit} {...this.inputProps()} {...props} /> :
            <PlainText {...props}>{value}</PlainText>}
        <Sprout show={onEdit !== undefined}
          style={{ position: 'absolute', right: 0 }}>
          <EditIcon name="pencil" {...R.omit(['primary', 'secondary'], props)}
            color={this.state.editFocus ? 'info' : 'muted'} />
        </Sprout>
      </Wrapper >
    )
  }
}

export { Input, PlainText }

const Editable = themed.default<IP>(EditablePlainText as any)

namespace Editable {
  export type Props = themed.Props<IP>
}

export default Editable