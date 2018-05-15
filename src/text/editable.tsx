import React from 'react';
import styled, { css } from 'styled-components/native'
import * as select from '../theme/select'
import * as themed from '../theme/themed'

import selector, { pick } from '../lib/selector'
import lens from '../lib/lens'
import { Sprout } from '../styled/animations'

import Icon from 'react-native-vector-icons/FontAwesome'
import { IconProps } from 'react-native-vector-icons/Icon';

import PlainText from './plain-text'
import PlainTextInput from './plain-text-input'

import Box from './edit-box'

const EditIcon = themed.default<IconProps>(styled(Icon)`
  color: ${select.text.color};
  font-size: ${select.text.size};
  font-size: 15;
` as any)

type Editable<Props, Edit extends keyof Props> = Props & {
  onEdit?: Props[Edit]
  editing?: 'invite' | boolean
}

type IP = Editable<PlainTextInput.Props, 'onChangeText'>

const Input = themed.default<IP>(({ onEdit, ...props }) =>
  <PlainTextInput onChangeText={onEdit} {...props}/>)

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
      <Box editing={onEdit === undefined ? false : this.state.editFocus || 'invite'} multiline={multi}>
        {onEdit ?
          <Input onEdit={onEdit} {...this.inputProps()} {...props} /> :
            <PlainText {...props}>{value}</PlainText>}
        <Sprout show={onEdit !== undefined}
          style={{ position: 'absolute', right: 0 }}>
          <EditIcon name="pencil" {...props}
            color={this.state.editFocus ? 'info' : 'muted'} />
        </Sprout>
      </Box>
    )
  }
}

export { Input, PlainText }

const Editable = themed.default<IP>(EditablePlainText as any)

namespace Editable {
  export type Props = themed.Props<IP>
}

export default Editable