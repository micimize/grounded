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
  props.theme.colors[left[0]][left[1]] 

const Wrapper = styled(Animatable.View).attrs<{ editing?: 'invite' | boolean, multiline: boolean } & ViewProps>({
  useNativeDriver: true,
  transition: [
    'paddingBottom', 'borderBottomColor', 'borderBottomWidth',
    'paddingLeft', 'borderLeftColor', 'borderLeftWidth'
  ] as any
})`
  margin-bottom: 12px
  flex-direction: row
  align-items: ${props => props.multiline ? 'flex-start' : 'center'}
  border-style: dashed
  padding-bottom: ${editing(4, 2, 1)}
  border-bottom-width: ${editing(0, 2, 3)}
  border-bottom-color: ${editingColors(['content', 'muted'], ['feedback', 'info'])}
  ${props => props.multiline ? css`
    padding-left: ${editing(4, 2, 1)}
    border-left-width: ${editing(0, 2, 3)(props)}
    border-left-color: ${editingColors(['content', 'muted'], ['feedback', 'info'])(props)}
  ` : css`
    padding-left: 4
  `}
`

const EditIcon = themed<IconProps>(styled(Icon)`
  color: ${select.text.color}
  font-size: ${select.text.size}
  font-size: 15
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
  flex: 1
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
    let multi = inputProps.multiline
    return (
      <Wrapper editing={onEdit === undefined ? false : this.state.editStyle} multiline={multi}>
        {onEdit ?
          <Input onEdit={onEdit} {...this.inputProps()} {...props} /> :
            <PlainText {...props}>{value}</PlainText>}
        <Sprout show={onEdit !== undefined}
          style={{ position: 'absolute', right: 0 }}>
          <EditIcon name="pencil" {...R.omit(['primary', 'secondary'], props)}
            color={this.state.editStyle === 'invite' ? 'muted' : 'info'} />
        </Sprout>
      </Wrapper >
    )
  }
}

export { Input, PlainText }

export default themed<IP>(EditablePlainText as any)