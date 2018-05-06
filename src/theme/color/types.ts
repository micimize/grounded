import { light } from './solarized'

type Colors = typeof light

type ColorProps = Diff<
  | keyof Colors['branding']
  | keyof Colors['feedback']
  | keyof Colors['content']
  | keyof Colors['background']
  | 'content',
  'default'
>

type Props = Partial<Record<ColorProps, true>> & {
  background?: boolean | ColorProps
}

type Theme = { colors: Colors }

export { Theme, Props }