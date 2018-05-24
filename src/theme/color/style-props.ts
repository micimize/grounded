import { Theme, Props } from './types'

type CProps = object & { theme: Theme } & Props

export const color = ({ color, theme, ...props }: CProps) => {
  if (typeof color === 'string') {
    // return defaults
    let value = theme.colors[color] && theme.colors[color].default
    if (value) {
      return value
    }
    for (let kind of ['feedback', 'branding', 'content', 'background']) {
      value = theme.colors[kind][color]
      if (value) {
        return value
      }
    }
  }
  return theme.colors.content.default
}

export const background = ({ background, theme }: CProps) => {
  if (background === true || background === 'background') {
    // background has been explicitly set to true
    return theme.colors.background.default
  }
  if (typeof background === 'string') {
    // return defaults
    let value = theme.colors[background] && theme.colors[background].default
    if (value) {
      return value
    }
    for (let kind of ['feedback', 'branding', 'content', 'background']) {
      value = theme.colors[kind][background]
      if (value) {
        return value
      }
    }
  }
  return '#00000000' // transaprent
}
