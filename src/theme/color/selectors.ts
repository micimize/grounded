import { Theme, Props } from './types'

type CProps = object & { theme: Theme } & Props

export const color = (props: CProps) => {
  // todo maybe faster with a hashmap later
  for (let kind of ['feedback', 'branding', 'content', 'background']) {
    if (kind in props) {
      // return defaults
      let value = props.theme.colors[kind].default
      if (value) {
        return value
      }
    }
    for (let selector in props.theme.colors[kind] || {}) {
      if (selector in props) {
        let value = props.theme.colors[kind][selector]
        if (value) {
          return value
        }
      }
    }
  }
  return props.theme.colors.content.default
}

export const background = ({ background = false, theme }: CProps) => {
  if (background === true) {
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
