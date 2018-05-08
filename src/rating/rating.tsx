import React from 'react'
import * as R from 'ramda'
import Color from 'color'
import { Rating as _Rating } from 'react-native-ratings'
import styled from 'styled-components/native'
import * as select from '../theme/select'
import * as themed from '../theme/themed'
import withDefaultProps from '../theme/with-default-props'

// https://github.com/rcaferati/react-native-really-awesome-button

const logProps = C => props => console.log(props) || <C {...props}/>

const size = (base = 100) => ({ theme, size = 0 }: Props) => {
  return theme.size.button.getSize(size, undefined, base)
}

const Rating = styled(_Rating).attrs({
})`
`

type Props = themed.Props<{}>

export default withDefaultProps<Props>(
  themed.defaultProps({}),
  Rating as any
) as any
