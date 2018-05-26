import React from 'react';
import * as themed from '../theme/themed'

import { createEditable } from '../lib/wrapper-components'

import PlainText from './plain-text'
import PlainTextInput from './plain-text-input'
import Box from './edit-box'

/* 
with the recent changes to how `themed` works, the following is invalid;
const EditablePlainText = createEditable<
  string,
  PlainText.Props,
  PlainTextInput.Props,
  Box.Props,
>({
  display: PlainText,
  editor: PlainTextInput,
  sugar: Box,
})
*/
const EditablePlainText = createEditable({
  display: PlainText,
  editor: PlainTextInput,
  controller: Box,
})

const Editable = themed.default(EditablePlainText)

namespace Editable {
  export type Props = themed.Props<PlainTextInput.Props>
}

export default Editable
