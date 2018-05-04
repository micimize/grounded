import * as R from 'ramda'
import { Deep } from './deep-path'

// this doesn't work and I don't know why

declare module 'ramda/src/path' {
  declare const path: path_00;
  type path_00 = {
    <T, P extends Deep.PathOf<T>>(p: P): (t: T) => Deep.TypeOf<T, P>
  }
  export = path
}