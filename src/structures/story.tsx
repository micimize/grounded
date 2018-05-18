import React, { ReactChildren } from 'react';
import { Easing } from 'react-native';
import * as Button from '../button'
import Rating from '../rating/rating'
import Time from '../time/interval/interval'
import PlainText from '../text/editable'
import { View, Text } from 'react-native';
import theme from '../theme/default-theme'

import Icon from 'react-native-vector-icons/FontAwesome'
import * as Animatable from 'react-native-animatable'

import OrderedList from './ordered-list'

import { ThemeProvider } from 'styled-components/native'

import { Sprout } from '../styled/animations'

import data from '../storybook/poems'

/*
interface Props {
  showApp?: () => void,
}
*/

export default class FullExample extends React.Component<{}, { data: typeof data, pressed: boolean }> {
  state = { data, pressed: false }
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
    subheader: {
      fontSize: 15,
    },
    content: {
      fontSize: 12,
      marginBottom: 10,
      lineHeight: 18,
    },
  };

  cursor = (key: keyof typeof data) => ({
    value: this.state.data[key],
    onEdit: this.state.pressed ? text => this.setState({
      data: Object.assign(this.state.data, { [key]: text })
    }) : undefined
  })

  render() {
    let pressed = this.state.pressed
    let toggle = () => this.setState({ pressed: !this.state.pressed })
    return (
      <View style={this.styles.wrapper}>
        <ThemeProvider theme={theme}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <OrderedList data={data} renderItem={({item}) => <Text>{item}</Text>}/>
          </View>
        </ThemeProvider>
        {/*<Rating/>*/}
      </View >
    );
  }
}
