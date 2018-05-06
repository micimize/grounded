// supporting +/-1 the ratio up to 14x, which will roughly double or vanish the text respectively
type ValidSizes = 0
  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14
  |-1 |-2 |-3 |-4 |-5 |-6 |-7 |-8 |-9 |-10 |-11 |-12 |-13 |-14

type ValidUnits = 'rem' | 'em' | '%' | 'px'

type ShortHandProp = 'mini' | 'tiny' | 'small' | 'medium' | 'large' | 'big' | 'huge' | 'massive'
type ShortHands = Record<ShortHandProp, ValidSizes>

type Sizing = {
  default: 0
  getSize: (size: ValidSizes | ShortHandProp, unit?: ValidUnits) => string
} & ShortHands

type Size = { text: Sizing }

type Props = { size?: ValidSizes | ShortHandProp }

type Theme = { size: { text: Sizing } }

export { Props, Theme, ShortHands }