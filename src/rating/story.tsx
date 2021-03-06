import React from 'react';
import { View, Text } from 'react-native';
import Rating from './rating' 

import theme from '../theme/default-theme'

import Icon from 'react-native-vector-icons/dist/FontAwesome';

// Generate required css
const iconFont = require('react-native-vector-icons/Fonts/FontAwesome.ttf')
const iconFontStyles = `@font-face {
  src: url(${iconFont});
  font-family: FontAwesome;
}`;

// Create stylesheet
const style = document.createElement('style');
style.type = 'text/css';
if ('styleSheet' in style) {
  (style as any).styleSheet.cssText = iconFontStyles;
} else {
  style.appendChild(document.createTextNode(iconFontStyles));
}

// Inject stylesheet
document.head.appendChild(style);

export default class RatingStory extends React.Component<{}> {
  styles = {
    wrapper: {
      flex: 1,
      padding: 24,
      justifyContent: 'center' as 'center',
    },
    header: {
      fontSize: 18,
      marginBottom: 18,
    },
    content: {
      fontSize: 12,
      marginBottom: 10,
      lineHeight: 18,
    },
  };

  render() {
    return (
      <View style={this.styles.wrapper}>
        <Text style={this.styles.header}>hacking together some sample stuff</Text>
        <Rating theme={theme} />
        <Rating
          theme={theme}
          color="primary"
          background="muted"
          onEdit={console.log}
          precision={0.5} count={5} ratingWidth={60} ratingComponent={
          ({ style }) => <View>
            <Icon selectable={false} name="rocket" size={style.width} style={style} />
            </View>}/>
      </View>
    );
  }
}
