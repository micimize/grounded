import { Theme, Props } from './types'

type CProps = object & { theme: Theme } & Props

export const size = ({ theme, size = 0 }: CProps) => {
  return theme.size.text.getSize(size) || '1em'
}
