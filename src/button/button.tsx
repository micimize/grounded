import React from 'react'
import { ViewStyle } from 'react-native'
import * as R from 'ramda'
import Color from 'color'
import AwesomeButton from 'react-native-really-awesome-button'
import styled from 'styled-components/native'
import * as select from '../theme/select'
import * as themed from '../theme/themed'
import withDefaultProps from '../theme/with-default-props'

// https://github.com/rcaferati/react-native-really-awesome-button

type AwesomeProps = Partial<{
  activityColor: string, // Progress button error label text
  backgroundActive: string, // Button active background-color
  backgroundColor: string, // Button main background-color
  backgroundPlaceholder: string, // Button placeholder background-color
  backgroundProgress: string, // Button progress bar background-color
  backgroundShadow: string,
  backgroundDarker: string, // Button front face background-color
  horizontalPadding: number,
  borderColor: string, // border-color
  borderRadius: number, // border-radius
  borderWidth: number, // border-width
  disabled: boolean, // disabled state: cancels animation and onPress func
  height: number, // height
  onPress: Function, // onPress function
  progress: boolean, // progress animation
  raiseLevel: number, // 3D raise level
  springRelease: boolean, // uses spring on the release animation
  style: ViewStyle, // container custom styles
  textColor: string, // Button default label text color
  textLineHeight: number, // default label text line-height
  textSize: number, // default label text font-size
  width: number, // width
}>

const logProps = C => props => console.log(props) || <C {...props}/>

const size = (base = 100) => ({ theme, size = 0 }: Props) => {
  return theme.size.button.getSize(size, undefined, base)
}

type Props = themed.Props<Partial<
  Omit<AwesomeProps,
    | 'backgroundColor'
    | 'backgroundDarker'
    | 'backgroundShadow'
    | 'backgroundPlaceholder'
    | 'backgroundProgress'
    | 'backgroundActive'
    | 'activityColor'
    | 'textColor'
    | 'textLineHeight'
    | 'textSize'
    | 'borderColor'
    | 'borderRadius'
    | 'borderWidth'
  > & {
  styles: Partial<{
    button: Partial<{
      backgroundColor: string,
      color: string,
      lineHeight: number,
      fontSize: number,
      borderColor: string,
      borderRadius: number,
      borderWidth: number,
      paddingHorizontal: number,
      shadowColor: string,
    }>,
    active: Partial<{
      backgroundColor: string,
      color: string,
    }>,
    placeholder: Partial<{
      backgroundColor: string,
    }>,
    progress: Partial<{
      backgroundColor: string,
    }>,
    bottom: Partial<{
      backgroundColor: string,
    }>
  }>
}>>

function toAwesome({
  button = {}, active, placeholder, progress, bottom
}: NonNullable<Props['styles']>): AwesomeProps {
  let simpleBg = s => s && s.backgroundColor
  let {
    shadowColor: backgroundShadow,
    paddingHorizontal: horizontalPadding,
    fontSize: textSize,
    color: textColor,
    lineHeight: textLineHeight,
    ...regular
  } = button
  return R.reject(R.isNil)({
    backgroundShadow,
    horizontalPadding,
    textSize,
    textColor,
    textLineHeight,
    backgroundActive: simpleBg(active),
    activityColor: simpleBg(active),
    backgroundPlaceholder: simpleBg(placeholder),
    backgroundProgress: simpleBg(progress),
    backgroundDarker: simpleBg(bottom),
    ...regular,
  })
}

function AButton({ styles, ...props }: Props) {
  return <AwesomeButton {...props} {...styles ? toAwesome(styles) : {}}/>
}

const asBackground = backgroundColor => ({ backgroundColor })

const Button = styled(AButton).attrs<Props>({
  styles: props => {
    let color = select.text.color(props)
    let background = select.text.background(props)
    return {
      button: {
        color,
        borderColor: color,
        backgroundColor: background,
        fontSize: select.text.size(props),
      },
      bottom: asBackground(
        Color(background).darken(0.25).hex()
      ),
      placeholder: asBackground(
        Color(background).fade(0.66).toString(),
      ),
    }
  },
  width: size(100),
  height: size(50)
})`
`

export default Button as any