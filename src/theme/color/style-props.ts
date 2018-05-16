import { Theme, Props } from './types'

type CProps = object & { theme: Theme } & Props

export const color = ({ color, theme, ...props }: CProps) => {
  // todo maybe faster with a hashmap later
  for (let kind of ['feedback', 'branding', 'content', 'background']) {
    if (kind in props || color === kind) {
      // return defaults
      let k = theme.colors[kind]
      let value = k && k.default
      if (value) {
        return value
      }
    }
    if (color) {
      let value = theme.colors[kind][color]
      if (value) {
        return value
      }
    }
    for (let selector in theme.colors[kind] || {}) {
      if (selector in props) {
        let value = theme.colors[kind][selector]
        if (value) {
          return value
        }
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
