import React from 'react';
import { View, Text } from 'react-native';
import Time from './editable' 
import { LocalTime } from 'js-joda'

import TimeInput from './time-input.web'

import theme from '../../theme/default-theme'

const sampleTime = LocalTime.parse('07:00')

export default class TimeStory extends React.Component<{}, any> {
  state = {
    sampleTime
  }


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
        <TimeInput value={this.state.sampleTime}
          onEdit={sampleTime => this.setState({ sampleTime })} />
        <TimeInput onEdit={console.log}/>
        <Text style={this.styles.header}>hacking together some sample stuff</Text>
        <Time color="secondary" value={sampleTime} theme={theme} />
        <Time size="massive" color="primary" background value={sampleTime} theme={theme} />
        <Time size="massive" color="primary" background value={sampleTime} theme={theme}
          onEdit={sampleTime => this.setState({ sampleTime })} />
      </View>
    );
  }
}
