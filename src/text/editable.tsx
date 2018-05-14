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

const editing = (left, middle, right) => props =>
  !props.editing ? left :
  props.editing === 'invite' ? middle :
  right

const editingColors = (left, right) => props => props.editing === true ?
  props.theme.colors[right[0]][right[1]] :
  props.theme.colors[left[0]][left[1]] 

const Animated = withDefaultProps<Animatable.ViewProps>(
  {
    useNativeDriver: true,
    transition: [
      'paddingBottom', 'borderBottomColor', 'borderBottomWidth',
      'paddingLeft', 'borderLeftColor', 'borderLeftWidth'
    ] as any
  },
  Animatable.View
)

const Wrapper = styled<{ editing?: boolean, multiline: boolean } & Animatable.ViewProps>(Animated)`
  margin-bottom: 12px;
  flex-direction: row;
  align-items: ${props => props.multiline ? 'flex-start' : 'center'};
  border-style: dashed;
  padding-bottom: ${editing(4, 2, 1)};
  border-bottom-width: ${editing(0, 2, 3)};
  border-bottom-color: ${editingColors(['content', 'muted'], ['feedback', 'info'])};
  ${props => props.multiline ? css`
    padding-left: ${editing(4, 2, 1)}
    border-left-width: ${editing(0, 2, 3)(props)}
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