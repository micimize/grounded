// heavily modified version of
// https://github.com/Monte9/react-native-ratings/blob/master/src/rating.js
import React, { Component } from 'react';
import styled from 'styled-components/native'
import * as R from 'ramda'

import {
  View, Text,
  PanResponder, PanResponderInstance,
  Animated, UIManager, findNodeHandle,
  Platform, TextStyle, ViewStyle
} from 'react-native';

const Wrapper = styled.View`
  flex-direction: row;
  flex-wrap: nowrap;
`

const Inner = styled.View`
  position: absolute;
  flex-direction: row;
  top: 0;
  left: 0;
`

function times<T>(num: number, fn: (num: number) => T): Array<T> {
  let unfold = n => n >= num ? false : [fn(n), n + 1]
  return R.unfold(unfold, 0)
}

type RatingStyle = Pick<TextStyle, 'color'> &
  Partial<Pick<TextStyle, 'backgroundColor' | 'opacity' | 'textDecorationColor'>>

type Props = {
  ratingComponent: any,
  count: number,
  ratingWidth: number,
  filledStyle: RatingStyle,
  unfilledStyle: RatingStyle,
  onChange: (rating: number) => any,
  style?: ViewStyle,
  readonly?: boolean,
  startingValue?: number
  fractions?: number,
}

type State = {
  pageX: number,
  position: Animated.ValueXY,
  panResponder: PanResponderInstance
  value: number
}

export default class Rating extends Component<Props, State> {

  panHandlerRef: typeof Wrapper

  valueOf(event: any) {
    let { ratingWidth, count } = this.props
    return (
      event.nativeEvent.pageX - this.state.pageX
    ) - (ratingWidth * count / 2)
  }

  constructor(props: Props) {
    super(props);
    const { onChange, fractions } = this.props;
    const position = new Animated.ValueXY();

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (event, gesture) => {
        const newPosition = new Animated.ValueXY();
        let x = this.valueOf(event)
        newPosition.setValue({ x, y: 0 });
        this.setState({
          position: newPosition,
          value: x
        });
      },
      onPanResponderMove: (event, gesture) => {
        const newPosition = new Animated.ValueXY();
        let x = this.valueOf(event)
        newPosition.setValue({ x, y: 0 });
        this.setState({
          position: newPosition,
          value: x
        });
      },
      onPanResponderRelease: event => {
        const rating = this.getCurrentRating();
        if (!fractions) {
          // "round up" to the nearest rating image
          this.setCurrentRating(rating);
        }
        onChange(rating);
      },
    });

    let fallback = this.props.count / 2
    if (!this.props.fractions) {
      fallback = Math.ceil(fallback)
    }
    this.state = {
      panResponder,
      value: this.props.startingValue || fallback,
      pageX: 0,
      position
    };
  }

  componentDidMount() {
    let fallback = this.props.count / 2
    if (!this.props.fractions) {
      fallback = Math.ceil(fallback)
    }
    this.setCurrentRating(this.props.startingValue || fallback);
  }

  interpolatedPositionInto = (outputRange: [number, number, number]) => {
    const { position } = this.state;
    const { ratingWidth, count } = this.props;
    const inputRange = [
      -count * (ratingWidth / 2),
      0,
      count * (ratingWidth / 2)
    ]
    return position.x.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'clamp',
    }) // , { useNativeDriver: true })
  }

  getPrimaryViewStyle = () => {
    const { ratingWidth, count } = this.props;

    const width = this.interpolatedPositionInto([
      0,
      count * ratingWidth / 2,
      count * ratingWidth
    ])

    return {
      // backgroundColor: color,
      width,
      overflow: 'hidden',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      flexWrap: 'nowrap',
    };
  }

  getSecondaryViewStyle = () => {
    const { ratingWidth, count, style } = this.props;

    const width = this.interpolatedPositionInto([
      count * ratingWidth,
      count * ratingWidth / 2,
      0,
    ])

    return {
      backgroundColor: style ? style.backgroundColor : 'white',
      overflow: 'hidden',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      flexWrap: 'nowrap',
      width,
    };
  }

  getCurrentRating = () => {
    const { value } = this.state;
    const { fractions, ratingWidth, count } = this.props;
    const startingValue = count / 2;
    let currentRating = 0;

    if (value > count * ratingWidth / 2) {
      currentRating = count;
    } else if (value < -count * ratingWidth / 2) {
      currentRating = 0;
    } else if (value < ratingWidth || value > ratingWidth) {
      currentRating = startingValue + value / ratingWidth;
      currentRating = !fractions ?
        Math.ceil(currentRating) :
        +currentRating.toFixed(fractions);
    } else {
      currentRating = !fractions ?
        Math.ceil(startingValue) :
        +startingValue.toFixed(fractions);
    }

    return currentRating;
  }

  setCurrentRating = (rating: number) => {
    const { ratingWidth, count } = this.props;

    // `initialRating` corresponds to `startingValue` in the getter. Naming it
    // differently here avoids confusion with `value` below.
    const initialRating = count / 2;
    let value = 0;

    if (rating > count) {
      value = count * ratingWidth / 2;
    } else if (rating < 0) {
      value = -count * ratingWidth / 2;
    } else if (rating < count / 2 || rating > count / 2) {
      value = (rating - initialRating) * ratingWidth;
    }
    const newPosition = new Animated.ValueXY();
    newPosition.setValue({
      x: value,
      y: 0
    });
    this.setState({
      position: newPosition,
      value
    });
  }

  render() {
    const {
      readonly,
      count,
      ratingWidth,
      filledStyle,
      unfilledStyle,
      style,
      ratingComponent: Unit
    } = this.props;

    let units = style => times(count, index => (
      <View key={index}>
        <Unit style={{
          width: ratingWidth,
          lineHeight: ratingWidth,
          ...style
        }} />
      </View>
    ))

    return (
      <View pointerEvents={readonly ? 'none' : 'auto'}
        style={[{ width: count * ratingWidth }, style]}>
        <Wrapper innerRef={panHandler => this.panHandlerRef = panHandler}
          onLayout={() => {
            let handle = findNodeHandle(this.panHandlerRef)
            if (handle) {
              UIManager.measure(
                handle,
                (x, y, width, height, pageX, pageY) => {
                  this.setState({ pageX })
                })
            }
          }}
          {...this.state.panResponder.panHandlers}
        >
          <Inner>
            <Animated.View style={this.getPrimaryViewStyle()}>
              {...units(filledStyle)}
            </Animated.View>
            <Animated.View style={this.getSecondaryViewStyle()}>
              {...units(unfilledStyle)}
            </Animated.View>
          </Inner>
        </Wrapper>
      </View >
    );
  }
}
