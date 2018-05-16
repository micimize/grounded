import React from 'react';
import { Easing } from 'react-native'
import * as Animatable from 'react-native-animatable'

namespace Sprout {
  export type Props = { show?: boolean } & Animatable.ViewProps
}

function Sprout ({
  show,
  style: _style,
  easing = Easing.elastic(1.25),
  duration = 300,
  transition: _transition = [],
  ...props
}: Sprout.Props) {
  let transition = typeof _transition === 'string' ?
    [ _transition, 'opacity', 'scale' ] :
    Array.isArray(_transition) ?
    [ ..._transition, 'opacity', 'scale' ] :
    [ 'opacity', 'scale' ] as any
  let style = [
    _style || {},
    show ?
      { opacity: 1, transform: [{ scale: 1 }] } :
      { opacity: 0, transform: [{ scale: 0.5 }] }
  ]
  return (
    <Animatable.View {...{ style, easing, duration, transition }} {...props}/>
  )
}

export { Sprout }
