// supporting +/-1 the ratio up to 14x, which will roughly double or vanish the text respectively
type ValidSizes = 0
  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14
  |-1 |-2 |-3 |-4 |-5 |-6 |-7 |-8 |-9 |-10 |-11 |-12 |-13 |-14

type ValidUnits = 'rem' | 'em' | '%' | 'px'

type ShortHandProp = 'mini' | 'tiny' | 'small' | 'medium' | 'large' | 'big' | 'huge' | 'massive'
type ShortHands = Record<ShortHandProp, ValidSizes>

type Sizing = {
  default: 0
  ratio: number,
  getSize: <U extends ValidUnits | undefined>(
    size: ValidSizes | ShortHandProp, base?: number, unit?: U
  ) => U extends undefined ? number : string
} & ShortHands

type Props = { size?: ValidSizes | ShortHandProp }

type Theme = { size: { text: Sizing, button: Sizing } }

export { Props, Theme, ShortHands }