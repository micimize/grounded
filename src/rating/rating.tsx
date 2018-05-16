import React from 'react'
import * as R from 'ramda'
import Color from 'color'
import Implementation from './rating-impl'
import styled from 'styled-components/native'
import * as select from '../theme/style-props'
import * as themed from '../theme/themed'
import { withDefaultProps } from '../lib/wrapper-components'

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { IconProps } from 'react-native-vector-icons/Icon'

// https://github.com/rcaferati/react-native-really-awesome-button

const logProps = C => props => console.log(props) || <C {...props}/>

const size = (base = 100) => ({ theme, size = 0 }: Props) => {
  return theme.size.button.getSize(size, undefined, base)
}

type Props = themed.Props<Implementation.Props>

const Rating = styled(Implementation).attrs<Props>({
  styles: (props: Props) => ({
    filled: {
      color: select.text.color(props)
    },
    unfilled: {
      color: select.text.background(props),
      opacity: 0.5
    }
  })
})`
`
const icon = <P extends IconProps>(props: P) => ({ style }) => (
  <FontAwesome selectable={false} size={style.width} style={style} {...props}/>
)

export { icon }

export default withDefaultProps<Props>(
  {
    ratingComponent: icon({ name: 'star' }),
    precision: 0.5,
    count: 5,
    ratingWidth: 30,
    accent: true,
    background: 'muted',
  },
  Rating
)
