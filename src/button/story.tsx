import React from 'react';
import { View } from 'react-native';
import GroundedButton from './simple' 
import Button from './raised' 
import Text from '../text/plain-text';

import theme from '../theme/default-theme'

const SizeButton = ({ size }) => (
  <Button size={size} color="content" background theme={theme}>
    <Text size={size}>{size}</Text>
  </Button>
)

export default class ButtonStory extends React.Component<{}> {
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
        <Text style={this.styles.header}>grounded bespoke button</Text>
        <Button background="secondary" theme={theme}>
          <Text size="large" color="background">wow</Text>
        </Button>
        <Button size="massive" background="info" theme={theme}>
          <Text color="background" >So many options!</Text>
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
