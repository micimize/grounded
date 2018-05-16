import React from 'react'
import { ViewStyle } from 'react-native'
import * as R from 'ramda'
import Color from 'color'
import AwesomeButton from 'react-native-really-awesome-button'
import styled from 'styled-components/native'
import * as select from '../theme/style-props'
import * as themed from '../theme/themed'
import { withDefaultProps } from '../lib/wrapper-components';

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

const size = (base = 100) => ({ theme, size = 0 }: Props) => {
  return theme.size.button.getSize(size, undefined, base) as number
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

function withDefaultStyles(props: Props) {
  let color = select.text.color(props)
  let background = select.text.background(props)
  return R.mergeDeepRight(props.styles || {}, {
    button: {
      color,
      borderColor: color,
      backgroundColor: background,
      fontSize: select.text.size(props),
    },
    bottom: {
      backgroundColor: Color(background).darken(0.25).hex()
    },
    placeholder: {
      backgroundColor: Color(background).fade(0.66).toString(),
    }
  })
}

function AButton(props: Props) {
  let {
    styles,
    style,
    raiseLevel = 4,
    width = size(100)(props),
    height = size(50)(props),
    ...passThrough
  } = props
  return (
    <AwesomeButton {...passThrough}
      /* explicitly pass some styles we want inherited */
      raiseLevel={raiseLevel}
      width={width}
      /* height must include raise level  */
      height={height + raiseLevel}
      {...toAwesome(withDefaultStyles(props))}/>
  )
}

type P = Props
namespace AButton {
  export type Props = P
}

const Button = themed.default<Props>(AButton)

export default AButton
