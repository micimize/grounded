// heavily modified version of
// https://github.com/Monte9/react-native-ratings/blob/master/src/rating.js
import React, { Component } from 'react';
import * as R from 'ramda'

import { View, Text, Animated, TextStyle, ViewStyle } from 'react-native';

import PanHandler from './pan-handler'

function times<T>(num: number, fn: (num: number) => T): Array<T> {
  let unfold = (n: number) => n >= num ? false : [fn(n), n + 1] as [T, number]
  return R.unfold(unfold, 0)
}

function positionAt(x: number) {
  const newPosition = new Animated.ValueXY();
  newPosition.setValue({ x, y: 0 });
  return newPosition
}

type RatingStyle = Pick<TextStyle, 'color'> &
  Partial<Pick<TextStyle, 'backgroundColor' | 'opacity' | 'textDecorationColor'>>

namespace Rating {
  export type Props = {
    ratingComponent: any,
    count: number,
    ratingWidth: number,
    styles?: {
      filled: RatingStyle,
      unfilled: RatingStyle,
    }
    onEdit?: (rating: number) => any,
    style?: ViewStyle,
    readonly?: boolean,
    startingValue?: number
    precision?: number,
  }
}

type State = {
  pageX: number,
  position: Animated.ValueXY,
  value: number
}

function round(source: number, precision?: number) {
  // 0 precision is invalid anyways
  return precision ?
    Math.round(source / precision) * precision :
    source
}

let startingValue = ({ startingValue, count, precision }: Rating.Props) => {
  let value = startingValue !== undefined ? startingValue : (count / 2)
  return round(value, precision)
}

class Rating extends Component<Rating.Props, State> {

  pan = (locationX: number) => {
    let value = this.valueOf(locationX)
    this.setState({ value, position: positionAt(value) })
  }

  onRelease = (locationX: number) => {
    const rating = this.getCurrentRating();
    this.setCurrentRating(rating)
    if (this.props.onEdit) {
      this.props.onEdit(rating);
    }
  }

  valueOf = (locationX: number) => {
    let { ratingWidth, count } = this.props
    return locationX - (ratingWidth * count / 2)
  }

  constructor(props: Rating.Props) {
    super(props);
    let value = startingValue(this.props)
    this.state = {
      value,
      pageX: 0,
      position: positionAt(value)
    };
  }

  componentDidMount() {
    this.setCurrentRating(this.state.value)
  }

  // this seems rather silly because everything's based on pageX now
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
    const { precision, ratingWidth, count } = this.props;
    let currentRating =
      (value > count * ratingWidth / 2) ? count
      : (value < -count * ratingWidth / 2) ? 0
      : (value < ratingWidth || value > ratingWidth) ?
        startingValue(this.props) + value / ratingWidth
      : startingValue(this.props)
    return round(currentRating, precision)
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
    this.setState({
      position: positionAt(value),
      value
    });
  }

  render() {
    const {
      readonly,
      count,
      ratingWidth,
      styles: {
        filled = {},
        unfilled = {}
      } = {},
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
      <View pointerEvents={!this.props.onEdit ? 'none' : 'auto'}
        style={[{ width: count * ratingWidth }, style]}>
        <PanHandler onGrant={this.pan} onMove={this.pan} onRelease={this.onRelease}>
          <View style={{ flexDirection: 'row' }}>
            <Animated.View style={this.getPrimaryViewStyle()}>
              {...units(filled)}
            </Animated.View>
            <Animated.View style={this.getSecondaryViewStyle()}>
              {...units(unfilled)}
            </Animated.View>
          </View>
        </PanHandler>
      </View >
    );
  }
}
export default Rating
