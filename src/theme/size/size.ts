import { Theme, ShortHands } from './types'
// derived from semantic ui button ratio
// https://semantic-ui.com/elements/button.html#size
const TEXT_RATIO = 30 * 0.07142857 

const shortHands: ShortHands = {
  // short hand prop names
  mini: -3,
  tiny: -2,
  small: -1,
  medium: 0,
  large: 2,
  big: 4,
  huge: 6,
  massive: 10,
}

const BUTTON_RATIO = 0.1

type Modifier = (base: number, ratio: number) => number
type ValidUnits = 'rem' | 'em' | '%' | 'px'

const sizer = (modifier: Modifier, defaultBase: number, defaultUnits) =>
  <U extends ValidUnits | undefined>(size, base = defaultBase, units: U = defaultUnits) => {
    // todo shorthands shouldn't be hard coded
    let mod = typeof size === 'string' ? shortHands[size] : size
    let scalar = modifier(base, mod)
    return (
      units !== undefined ? `${scalar}${units}` : scalar
    )as U extends undefined ? number : string
  }

const size: Theme['size'] = {
  text: {
    default: 0, // index of size array
    ratio: TEXT_RATIO,
    getSize: sizer((base, mod) => base + TEXT_RATIO * mod, 14, undefined),
    ...shortHands
  },
  button: {
    default: 0, // index of size array
    ratio: BUTTON_RATIO,
    getSize: sizer((base, mod) => base + (base * mod / 10), 10, undefined),
    ...shortHands
  }
}

export default size