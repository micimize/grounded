import React, { Component, ReactChildren, ReactChild } from 'react';
import {
  View, ViewStyle,
  PanResponder, PanResponderInstance,
  UIManager, findNodeHandle,
} from 'react-native';
import { pipe } from 'ramda'

import { withDefaultProps } from '../lib/wrapper-components';

const defaultStyle = {
  flexDirection: 'row' as 'row',
  flexWrap: 'nowrap' as 'nowrap'
}

type Callback = (locationX: number) => any

type Props = {
  onGrant: Callback,
  onMove: Callback,
  onRelease: Callback,
  style: ViewStyle,
  children: ReactChildren | ReactChild
}

type State = {
  pageX: number
  responder: PanResponderInstance
}

class PanHandler extends Component<Props, State> {

  panHandlerRef: View

  locationX = (event: any, gesture: any): number => {
    return event.nativeEvent.pageX - this.state.pageX
  }

  handler = (callback: Callback) => pipe(this.locationX, callback)

  constructor(props: Props) {
    super(props);
    const { onGrant, onMove, onRelease, } = this.props;

    const responder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: this.handler(onGrant),
      onPanResponderMove: this.handler(onMove),
      onPanResponderRelease: this.handler(onRelease)
    })
    this.state = { pageX: 0, responder }
  }

  // TODO If either of these fail, this component will just behave brokenly
  // I don't know what happens if this is null, or why it might be
  getRef = (handlerRef: View | null) => {
    if (handlerRef) {
      this.panHandlerRef = handlerRef
    } 
  }
  onLayout = () => {
    let handle = findNodeHandle(this.panHandlerRef)
    // Again, I don't know what happens if this is null, or why it might be
    if (handle) {
      UIManager.measure(
        handle,
        (x, y, width, height, pageX, pageY) => {
          this.setState({ pageX })
        })
    }
  }

  render() {
    return (
        <View
          style={this.props.style}
          ref={this.getRef}
          onLayout={this.onLayout}
          {...this.state.responder.panHandlers}
        >
        {this.props.children}
        </View >
    );
  }
}

export default withDefaultProps<Props>({ style: defaultStyle }, PanHandler)
