import React from 'react';
import { Easing, EasingFunction } from 'react-native'
import * as Animatable from 'react-native-animatable'
import styled from 'styled-components/native'

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


namespace Raise {
  export type Props = {
    maxRise: number
    rise: number
    children: React.ReactChildren | React.ReactChild
  } & Omit<Animatable.ViewProps, 'color'>
}

const backfaceStyles = {
  position: 'absolute' as 'absolute',
  bottom: 0,
  width: '100%',
  height: '100%',
  zIndex: -1
}

let View = styled.View``

function Raise ({
  maxRise,
  rise = 0,
  easing = 'ease-out',
  duration = 75,
  children,
  transition = [ 'bottom' ] as any,
  style,
  ...props
}: Raise.Props) {
  return (
    <View style={style}> 
      <Animatable.View
        style={{ position: 'relative', bottom: rise, height: '100%' }}
        {...{ easing, duration, transition }}>
        {children}
        <View style={[style, backfaceStyles]}/>
      </Animatable.View>
    </View>
  )
}

export { Sprout, Raise }
