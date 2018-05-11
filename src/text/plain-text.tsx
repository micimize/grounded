import React from 'react';
import * as R from 'ramda';
import { Easing, TextProps, TextInputProps, ViewProps, NativeSyntheticEvent as NSEvent } from 'react-native'
import styled, { css } from 'styled-components/native'
import * as select from '../theme/select'
import themed from '../theme/themed'
import withDefaultProps from '../theme/with-default-props'

import * as Animatable from 'react-native-animatable'

import Icon from 'react-native-vector-icons/FontAwesome'
import { IconProps } from 'react-native-vector-icons/Icon';

import { Sprout } from '../styled/animations'

const editing = (left, middle, right) => props =>
  !props.editing ? left :
  props.editing === 'invite' ? middle :
  right

const editingColors = (left, right) => props => props.editing === true ?
  props.theme.colors[right[0]][right[1]] :
  props.editing ? props.theme.colors[left[0]][left[1]] :
  'transparent'

const Wrapper = styled(Animatable.View).attrs<{ editing?: 'invite' | boolean, multiline: boolean } & ViewProps>({
  transition: [ 'borderBottomColor', 'borderLeftColor' ] as any
})`
  border-style: dashed
  border-bottom-width: ${editing(0, 2, 3)}
  border-bottom-color: ${editingColors(['content', 'muted'], ['feedback', 'info'])}
  ${props => props.multiline ? css`
    padding-left: ${editing(3, 1, 0)}
    border-left-width: ${editing(0, 2, 3)(props)}
    border-left-color: ${editingColors(['content', 'muted'], ['feedback', 'info'])(props)}
  ` : css`
    padding-left: 3
  `}
`

const EditIcon = themed<IconProps>(styled(Icon)`
  color: ${select.text.color}
  font-size: ${select.text.size}
  font-size: ${R.pipe(select.text.size, (s = 12) => s * 0.75)}
` as any)

const PlainText = styled.Text`
  color: ${select.text.color}
  background: ${select.text.background}
  font-size: ${select.text.size}
`

type Editable<Props, Edit extends keyof Props> = Props & {
  onEdit?: Props[Edit]
  editing?: 'invite' | boolean
}

type IP = Editable<TextInputProps, 'onChangeText'>

const TextInput = styled.TextInput`
  color: ${select.text.color}
  background: ${select.text.background}
  font-size: ${select.text.size}
  outline: none
`

const Input = themed<IP>(({ onEdit, ...props }) =>
  <TextInput onChangeText={onEdit} {...props}/>)

function and(f: () => any, other?: () => any) {
  if (other) {
    return () => (
      f(),
      other()
    )
  }
  return f
}
class EditablePlainText extends React.Component<IP, { editStyle: 'invite' | true }> {
  state = { editStyle: 'invite' as 'invite' }
  inputProps = () => {
    let { onFocus: focus, onBlur: blur, value, numberOfLines, multiline } = this.props
    numberOfLines = numberOfLines !== undefined ?
      numberOfLines :
      (value || '').split('\n').length
    return {
      value,
      multiline: multiline || numberOfLines > 1,
      numberOfLines,
      onFocus: and(() => this.setState({ editStyle: true}), focus),
      onBlur: and(() => this.setState({ editStyle: 'invite'}), blur)
    }
  }
  render() {
    let { onEdit, onFocus, onBlur, editing, value, numberOfLines, multiline, ...props } = this.props
    let inputProps = this.inputProps()
    return (
      <Wrapper editing={onEdit === undefined ? false : this.state.editStyle} multiline={inputProps.multiline}>
        {onEdit ?
          <Input onEdit={onEdit} {...this.inputProps()} {...props} /> :
            <PlainText {...props}>{value}</PlainText>}
        <Sprout show={onEdit !== undefined} style={{ position: 'absolute', right: 0 }}>
          <EditIcon name="pencil" {...R.omit(['primary', 'secondary'], props)}
            color={this.state.editStyle === 'invite' ? 'muted' : 'info'} />
        </Sprout>
      </Wrapper >
    )
  }
}

export { Input, PlainText }

export default themed<IP>(EditablePlainText as any)