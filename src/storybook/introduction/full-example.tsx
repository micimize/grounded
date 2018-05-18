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

import OrderedList from '../../structures/ordered-list'

import { ThemeProvider } from 'styled-components/native'

import { Sprout } from '../../styled/animations'

import poems from '../poems'

import createRecord from '../../structures/record'

/*
interface Props {
  showApp?: () => void,
}
*/

type Props = {
  showApp?: () => void,
};

let data = poems[1]
type Poem = typeof data

let Record = createRecord<
  Partial<Poem> & Pick<Poem, 'title' | 'author' | 'content'>
>()(
  {
    title: PlainText,
    author: PlainText,
    content: PlainText
  })(
  ({ title: Title, author: Author, content: Content }) => (
    <View style={{ backgroundColor: theme.colors.background.default, padding: 15, borderRadius: 15, flex: 1 }}>
      <Title primary size="massive" />
      <Author secondary size="big" />
      <Content multiline style={{ paddingLeft: 10, paddingBottom: 10 }} muted />
    </View>
  )
)

export default class FullExample extends React.Component<Props, { data: typeof data, pressed: boolean }> {
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

  showApp(event: Event) {
    event.preventDefault();
    if (this.props.showApp) {
      this.props.showApp();
    }
  }

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
            <OrderedList data={['foo', 'bar']} renderItem={({item}) => <Text>{item}</Text>}/>
            <View style={{ backgroundColor: theme.colors.background.default, padding: 15, borderRadius: 15, flex: 1 }}>
              <PlainText primary size="massive" {...this.cursor('title')} />
              <PlainText secondary size="big" {...this.cursor('published')} />
              <PlainText multiline style={{ paddingLeft: 10, paddingBottom: 10 }} muted {...this.cursor('content')} />
            </View>
            <View style={{ flexDirection: 'column', paddingLeft: 10 }}>
              <Button.Icon
                color="info"
                background="background"
                name="pencil"
                onPress={toggle}
                disabled={pressed} />
              <Sprout show={pressed}>
                <Button.Icon
                  color="background"
                  background="success"
                  name="check"
                  disabled={!pressed} />
              </Sprout>
              <Sprout show={pressed}>
                <Button.Icon
                  color="background"
                  background="danger" 
                  name="ban"
                  disabled={!pressed}
                  onPress={toggle} />
              </Sprout>
            </View>
          </View>
        </ThemeProvider>
        {/*<Rating/>*/}
      </View >
    );
  }
}
