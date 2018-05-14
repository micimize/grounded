import full from './full'
import optional from './optional'

function lens<T>(kind: '!' | '?' = '!') {
  return kind === '?' ? optional<T>() : full<T>()
}

export default lens