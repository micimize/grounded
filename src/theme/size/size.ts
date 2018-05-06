import { Theme, ShortHands } from './types'
// derived from semantic ui button ratio
// https://semantic-ui.com/elements/button.html#size
const RATIO = 0.07142857 

const shortHands: ShortHands = {
  // short hand prop names
  mini: -2,
  tiny: -2,
  small: -1,
  medium: 0,
  large: 2,
  big: 4,
  huge: 6,
  massive: 10,
}

const size: Theme['size'] = {
  text: {
    default: 0, // index of size array
    getSize: (size, units = 'em') => {
      // todo shorthands shouldn't be hard coded
      let mod = typeof size === 'string' ? shortHands[size] : size
      return `${1 + RATIO * mod}${units}`
    },
    ...shortHands
  }
}

export default size