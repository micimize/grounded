import * as R from 'ramda'
import OLens from './lens/optional'
import FLens from './lens/full'

let hashTo = <F extends string, V>(cases: Record<F, V>) =>
  R.flip<F, Record<F, V>, V>(R.prop)(cases)

export function optional<
  V,
  T,
  P extends OLens.Path<T>,
  F extends OLens.Focus<T, P>
>(
  lens: OLens<T, P>,
  cases: Record<F, V>,
  defaultCase: V
): (t: T) => V {
  return R.pipe(
    R.view(lens as R.ManualLens<F, T>),
    R.unless(
      R.isNil,
      hashTo<F, V>(cases)
    ),
    R.when(R.isNil, R.always(defaultCase))
  )
}

export function full<
  V,
  T,
  P extends FLens.Path<T>,
  F extends FLens.Focus<T, P> & string
>(lens: FLens<T, P>, cases: Record<F, V>): (t: T) => V {
  return R.pipe(
    R.view(lens),
    hashTo<F, V>(cases)
  )
}

// can't figure out the inference
export default function match<T>(kind: '!' | '?' = '!') {
  return kind === '?' ? optional : full
}
