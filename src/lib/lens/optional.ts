import * as R from 'ramda'
import { DeepPathOf, DeepTypeOf, PathAppend } from './deep-path'

type PathOf<T> = DeepPathOf<DeepFull<T>>
type TypeOf<T, Path extends PathOf<T>> = DeepTypeOf<DeepFull<T>, Path>

const optLensPath = <T, P extends PathOf<T>>(p: P) =>
  R.lensPath<TypeOf<T, P> | undefined, T>(p)

type PrettyLens<
  T,
  Path extends PathOf<T> = never
> = R.ManualLens<TypeOf<T, Path>, T> & (Path extends never ? {
  [K in keyof T]-?: PrettyLens<T, [ K ]>
} : {
  [K in keyof TypeOf<T, Path>]-?: PrettyLens<T, PathAppend<DeepFull<T>, TypeOf<T, Path>, K>>
})

function nestedLensPath<T, Path extends PathOf<T>>(p: Path): PrettyLens<T, Path> {
  let handler = {
    get<N extends keyof TypeOf<T, Path> >(target: PrettyLens<T, Path>, name: N) {
      return nestedLensPath<T, PathAppend<DeepFull<T>, Path, N>>(
        [ ...p, name ] as PathAppend<DeepFull<T>, Path, N>
      )
    } }
  return new Proxy(optLensPath<T, Path>(p), handler) as PrettyLens<T, Path>
}

function PrettyLens<T>() {
  let lens = (t: T) => t
  let handler = {
    get<N extends keyof T>(target: typeof lens, name: N) {
      return nestedLensPath<T, [ N ]>([ name ])
    }
  }
  return new Proxy(lens, handler) as PrettyLens<T>
}

namespace PrettyLens {
  export type Path <T > = PathOf<T>
  export type Focus < T, P extends Path < T >> = TypeOf<T, P>
}

export default PrettyLens