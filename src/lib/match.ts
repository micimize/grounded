import * as R from 'ramda'
import OLens from './lens/optional'
import FLens from './lens/full'

type OptionalMatch = <
  V,
  T,
  P extends (OLens.Path<T> | FLens.Path<T>),
  L extends P extends FLens.Path<T> ? FLens<T, P> :
            P extends OLens.Path<T> ? OLens<T, P> : never,
  F extends P extends FLens.Path<T> ? FLens<T, P> :
            P extends OLens.Path<T> ? OLens<T, P> : never,
>(lens: L, cases: Record<F & string, V>) => 
  P extends FLens.Path<T> ?
    (t: T) => V :
    (t: T) => V | undefined | null

type FullMatch = <
  V,
  T,
  P extends FLens.Path<T>,
  F extends FLens.Focus<T, P> & string
>(lens: FLens<T, P>, cases: Record<F, V>) =>
  (t: T) => V

let hashTo = <F extends string, V>(cases: Record<F, V>) =>
  R.flip<F, Record<F, V>, V>(R.prop)(cases)

export function optional<
  V,
  T,
  P extends OLens.Path<T>,
  F extends OLens.Focus<T, P>
>(lens: OLens<T, P, F>, cases: Record<F, V>): (t: T) => V | undefined | null {
  return R.pipe(
    R.view(lens),
    R.unless(
      R.isNil,
      hashTo<F, V>(cases)
    )
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

const match: OptionalMatch | FullMatch = (lens, cases) =>
  R.pipe(
    R.view(lens),
    R.unless(
      R.isNil,
      hashTo(cases)
    )
  )

let r = full(
  FLens<{ a: { b: { c: 'c' }} }>().a.b.c,
  {
    c: 'woo'
  }
)

export default match
