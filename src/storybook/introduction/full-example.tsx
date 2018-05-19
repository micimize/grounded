import React, { ReactChildren } from 'react';
import { Easing } from 'react-native';
import * as Button from '../../button'
import Rating from '../../rating/rating'
import Time from '../../time/time/time'
import PlainText from '../../text/editable'
import { View, Text } from 'react-native';
import theme from '../../theme/default-theme'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as Animatable from 'react-native-animatable'

import { ThemeProvider } from 'styled-components/native'

import { Sprout } from '../../styled/animations'

import poems from '../poems'

import createRecord from '../../structures/record'

/*
interface Props {
  showApp?: () => void,
}
*/

let data = poems[1]
type Poem = typeof data

let Record = createRecord<
  Partial<Poem> & Pick<Poem, 'title' | 'author' | 'content'>
>(({ field, ...props }) => (
  <View style={{ backgroundColor: theme.colors.background.default, padding: 15, borderRadius: 15, flex: 1 }}>
    {field.title(<PlainText primary size="massive" />)}
    {field.author(<PlainText secondary size="big" />)}
    {field.content(<PlainText multiline style={{ paddingLeft: 10, paddingBottom: 10 }} muted />)}
  </View>
))

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

  onEdit = partial => this.setState({
    data: Object.assign(this.state.data, partial)
  })

  render() {
    let pressed = this.state.pressed
    let toggle = () => this.setState({ pressed: !this.state.pressed })
    return (
      <View style={this.styles.wrapper}>
        <ThemeProvider theme={theme}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Button.Icon
              color={!pressed ? 'background' : 'info'}
              background={pressed ? 'background' : 'info'}
              name="pencil"
              onPress={toggle} />
            <Record value={this.state.data} onEdit={pressed ? this.onEdit : undefined} />
          </View>
        </ThemeProvider>
        {/*<Rating/>*/}
      </View >
    );
  }
}
