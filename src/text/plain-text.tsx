import React from 'react';
import * as R from 'ramda';
import { Easing, TextProps, TextInputProps, ViewProps, NativeSyntheticEvent as NSEvent } from 'react-native'
import styled from 'styled-components/native'
import * as select from '../theme/select'
import themed from '../theme/themed'
import withDefaultProps from '../theme/with-default-props'

import * as Animatable from 'react-native-animatable'

import Icon from 'react-native-vector-icons/FontAwesome'
import { IconProps } from 'react-native-vector-icons/Icon';

const editing = (left, middle, right) => props =>
  !props.editing ? left :
  props.editing === 'invite' ? middle :
  right

const editingColors = (left, right) => props => props.editing === true ?
  props.theme.colors[right[0]][right[1]] :
  props.theme.colors[left[0]][left[1]] 

const Wrapper = styled(Animatable.View).attrs<{ editing?: 'invite' | boolean } & ViewProps>({
  transition: ['paddingBottom', 'borderBottomColor', 'borderBottomWidth'] as any
})`
  padding-bottom: ${editing(3, 1, 0)}
  border-style: dashed
  border-bottom-width: ${editing(0, 2, 3)}
  border-bottom-color: ${editingColors(['content', 'muted'], ['feedback', 'info'])}
`

type SproutProps = { show?: boolean } & Animatable.ViewProps

function Sprout ({
  show,
  style: _style,
  easing = Easing.elastic(1.25),
  duration = 300,
  transition: _transition = [],
  ...props
}: SproutProps) {
  let transition = typeof _transition === 'string' ?
    [ _transition, 'opacity', 'scale' ] :
    Array.isArray(_transition) ?
    [ ..._transition, 'opacity', 'scale' ] :
    [ 'opacity', 'scale' ] as any
  let style = [
    _style || {},
    show ?
      { opacity: 1, transform: [{ scale: 1 }] } :
      { opacity: 0, transform: [{ scale: 0.5 }] }
  ]
  return (
    <Animatable.View {...{ style, easing, duration, transition }} {...props}/>
  )
}

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

const Input = themed<IP>(({ onEdit, multiline = true, ...props }) =>
  <TextInput onChangeText={onEdit} multiline={multiline} {...props}/>)

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
    let { onFocus: focus, onBlur: blur, value, numberOfLines, } = this.props
    return {
      value,
      numberOfLines: numberOfLines !== undefined ?
        numberOfLines :
        (value || '').split('\n').length,
      onFocus: and(() => this.setState({ editStyle: true}), focus),
      onBlur: and(() => this.setState({ editStyle: 'invite'}), blur)
    }
  }
  render() {
    let { onEdit, onFocus, onBlur, editing, value, numberOfLines, ...props } = this.props
    return (
      <Wrapper editing={onEdit === undefined ? false : this.state.editStyle}>
        {onEdit ?
          <Input onEdit={onEdit} {...this.inputProps()} {...props} /> :
          <PlainText {...props}>{value}</PlainText>}
        <Sprout show={onEdit !== undefined} style={{ position: 'absolute', right: 0 }}>
          <EditIcon name="pencil" {...R.omit(['primary', 'secondary'], props)}
            color={this.state.editStyle === 'invite' ? 'muted' : 'info'} />
        </Sprout>
      </Wrapper>
    )
  }
}

export { Input, PlainText }

export default themed<IP>(EditablePlainText as any)