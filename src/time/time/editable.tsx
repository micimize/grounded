import React from 'react';
import themed from '../../theme/themed'
import EditBox from '../../text/edit-box'

import Time from './display'
import Input from './input.web'
import { createEditable } from '../../lib/wrapper-components'

/*
  Eventually characters will be a general solution for "tuple-like" strings.
  Time is a great example, where maybe you want a big primary hour, and a tiny, muted minutes.
  So, it'll look like characters={[['large', 'primary'], { '...': ['tiny', 'muted'] }]}
*/
namespace EditableTime {
  export type Props = Input.Props & {
    format?: string,
    characters?: Array<string>
  }
  export type Component = React.ComponentType<Props>
}

const EditableTime = themed<EditableTime.Props>(createEditable({
  display: Time,
  editor: Input,
  controller: EditBox,
}) as any)

export default EditableTime