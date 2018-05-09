import React from 'react'
import * as R from 'ramda'
import Color from 'color'
import _Rating from './rating-impl'
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
export default _Rating

/*
export default withDefaultProps<Props>(
  themed.defaultProps({}),
  Rating as any
)

/*
<VictoryChart animate={{ duration: 2000, easing: "bounce" }}>
<VictoryScatter animate={{ duration: 2000, easing: "bounce" }}
  style={{ data: { fill: "#c43a31" } }}
  data={[
    { x: 0, y: 0, size: 25, symbol: "star" },
    { x: 1, y: 0, size: 25, symbol: "star" },
    { x: 2, y: 0, symbol: "star" },
    { x: 3, y: 0, symbol: "star" },
    { x: 4, y: 0, symbol: "star" },
  ]}
/>
*/