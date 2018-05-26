import React from 'react';
import { View } from 'react-native';
import theme from '../theme/default-theme'
import Text from './plain-text'
import Input from './editable'

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

type Props = {
  showApp?: () => void
}

class SampleInput extends React.Component<any, { value: string }> {
  state = { value: '' }
  render() {
    return (
      <Input {...this.props} onEdit={value => this.setState({ value })}>{this.state.value}</Input>
    );
  }
}

export default class RatingStory extends React.Component<Props> {
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

  showApp(event: Event) {
    event.preventDefault();
    if (this.props.showApp) {
      this.props.showApp();
    } 
  }

  render() {
    return (
      <View style={this.styles.wrapper}>
        <Text style={this.styles.header}>hacking together some sample stuff</Text>
        <Text color="secondary" theme={theme}>
          Cool text bro
        </Text>
        <Text size="massive" color="primary" background theme={theme}>So big</Text>
        <Input size="massive" color="primary" background theme={theme} placeholder="big editable" />
      </View>
    );
  }
}
