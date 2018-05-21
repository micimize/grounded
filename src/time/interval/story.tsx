import React from 'react';
import { View, Text } from 'react-native';
import TimeInterval from './interval'
import { LocalTime } from 'js-joda'

import theme from '../../theme/default-theme'
import { ThemeProvider } from 'styled-components/native'

const sampleInterval = {
  start: LocalTime.parse('07:00'),
  end: LocalTime.parse('10:00'),
}

export default class TimeIntervalStory extends React.Component<{}> {
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
      <ThemeProvider theme={theme}>
        <View style={this.styles.wrapper}>
          <Text style={this.styles.header}>hacking together some sample stuff</Text>
          <TimeInterval value={sampleInterval} />
        </View>
      </ThemeProvider>
    );
  }
}
