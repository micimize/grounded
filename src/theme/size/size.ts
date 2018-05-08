import { Theme, ShortHands } from './types'
// derived from semantic ui button ratio
// https://semantic-ui.com/elements/button.html#size
const TEXT_RATIO = 0.07142857 

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

const sizer = (modifier: Modifier, defaultBase, defaultUnits) =>
  (size, units = defaultUnits, base = defaultBase) => {
    // todo shorthands shouldn't be hard coded
    let mod = typeof size === 'string' ? shortHands[size] : size
    let scalar = modifier(base, mod)
    return units ? `${scalar}${units}` : scalar
  }

const size: Theme['size'] = {
  text: {
    default: 0, // index of size array
    ratio: TEXT_RATIO,
    getSize: sizer((base, mod) => base + TEXT_RATIO * mod, 1, 'em'),
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