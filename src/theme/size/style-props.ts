import { Theme, Props } from './types'

type CProps = object & { theme: Theme } & Props

type ValidUnits = 'rem' | 'em' | '%' | 'px'

export const size = (base = 14, units = undefined) =>
  ({ theme, size = 0 }: CProps) =>
    theme.size.text.getSize(size, base, units)