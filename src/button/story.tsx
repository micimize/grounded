import React from 'react';
import { View, Text } from 'react-native';
import Button from './button' 
import { LocalTime } from 'js-joda'

import theme from '../theme/default-theme'

type Props = {
  showApp?: () => void
}

const sampleTime = LocalTime.parse('07:00')

const SizeButton = ({ size }) =>
  <Button size={size} content background theme={theme}>{size}</Button>

export default class TimeStory extends React.Component<Props> {
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
        <Button color="background" background="secondary" theme={theme}>Text</Button>
        <Button primary background theme={theme}/>
        <Button size="massive" color="background" background="info" theme={theme}>
          So many options!
        </Button>
        <Text style={{marginTop: 10, marginBottom: 5 }}> Sizes: </Text>
        <SizeButton size="mini"/>
        <SizeButton size="tiny"/>
        <SizeButton size="small"/>
        <SizeButton size="medium"/>
        <SizeButton size="large"/>
        <SizeButton size="big"/>
        <SizeButton size="huge"/>
        <SizeButton size="massive"/>
      </View>
    );
  }
}
