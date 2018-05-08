import React from 'react'
import * as R from 'ramda'
import Color from 'color'
import AwesomeButton from 'react-native-really-awesome-button'
import styled from 'styled-components/native'
import * as select from '../theme/select'
import * as themed from '../theme/themed'
import withDefaultProps from '../theme/with-default-props'

// https://github.com/rcaferati/react-native-really-awesome-button

const logProps = C => props => console.log(props) || <C {...props}/>

const size = (base = 100) => ({ theme, size = 0 }: Props) => {
  return theme.size.button.getSize(size, undefined, base)
}

const Button = styled(AwesomeButton).attrs({
  backgroundColor: select.text.background,
  backgroundDarker: R.pipe(select.text.background, b => Color(b).darken(0.25).hex()),
  backgroundPlaceholder: R.pipe(select.text.color, b => Color(b).fade(0.66).toString()),
  textColor: select.text.color,
  textSize: select.text.size,
  width: size(100),
  height: size(50),
})`
`
/*
  padding-top: 0.78571429em;
  padding-bottom: 0.78571429em;
  padding-left: 1.5em;
  padding-right: 1.5em;
*/

type Props = themed.Props<{}>

export default withDefaultProps<Props>(
  themed.defaultProps({}),
  Button as any
) as any

/*
type Props = TouchableHighlightProperties & {

}
*/
