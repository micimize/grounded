import React from 'react';
import { View, Text } from 'react-native';
import TimeInterval from './interval' 
import { LocalTime } from 'js-joda'

type Props = {
  showApp?: () => void
}

const sampleInterval: TimeInterval = {
  start: LocalTime.parse('07:00'),
  end: LocalTime.parse('10:00'),
}

export default class TimeIntervalStory extends React.Component<Props> {
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
        <TimeInterval {...sampleInterval} />
      </View>
    );
  }
}
