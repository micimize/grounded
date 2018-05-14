import full from './full'
import optional from './optional'

export default function lens<T>(kind: '!' | '?' = '!') {
  return kind === '?' ? optional<T>() : full<T>()
}
