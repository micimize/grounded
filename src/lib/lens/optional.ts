import * as R from 'ramda'
import { DeepPathOf, DeepTypeOf, PathAppend } from './deep-path'

type PathOf<T> = DeepPathOf<DeepFull<T>>
type TypeOf<T, Path extends PathOf<T>> = DeepTypeOf<DeepFull<T>, Path>

const optLensPath = <T, P extends PathOf<T>>(p: P) =>
  R.lensPath<TypeOf<T, P> | undefined, T>(p) 

type Lens<T, Path extends PathOf<T>, Top extends boolean> = (
  Top extends true ?
    R.ManualLens<T, T> :
    R.ManualLens<TypeOf<T, Path>, T>
)

type PrettyLens<
  T,
  Path extends PathOf<T>,
  Top extends boolean = true
> = Lens<T, Path, Top> & (Top extends true ? {
  [K in keyof T]-?: PrettyLens<T, [ K ], false>
} : {
  [K in keyof TypeOf<T, Path>]-?: PrettyLens<T, PathAppend<DeepFull<T>, TypeOf<T, Path>, K>, false>
})

function nestedLensPath<T, Path extends PathOf<T>>(p: Path): PrettyLens<T, Path, false> {
  let handler = {
    get<N extends keyof TypeOf<T, Path> >(target: PrettyLens<T, Path, false>, name: N) {
      type P = PathAppend<DeepFull<T>, Path, N>
      return nestedLensPath<T, P>([ ...p, name ] as P)
    } }
  return new Proxy(optLensPath<T, Path>(p), handler) as PrettyLens<T, Path, false>
}

function PrettyLens<T>() {
  let handler = {
    get<N extends keyof T>(target: PrettyLens<T, [never], true>, name: N) {
      type P = [ N ] & PathOf<T>
      return nestedLensPath<T, P>([ name ])
    }
  }
  return new Proxy(R.lens((t: T) => t, (t: T) => t), handler) as PrettyLens<T, [never], true>
}

namespace PrettyLens {
  export type Path <T > = PathOf<T>
  export type Focus < T, P extends Path < T >> = TypeOf<T, P>
}

type F = { a: { b: { c: { d: 'd' } } } }
let f: F = { a: { b: { c: { d: 'd' } } } }
// let p = nestedLensPath<F, ['a', 'b']>(['a', 'b'])
let pc = PrettyLens<F>().a.b
let c = R.view(pc, f)

export default PrettyLens