import React, { ReactChildren } from 'react';
import { Easing } from 'react-native';
import Button from '../../button/button'
import Rating from '../../rating/rating'
import Time from '../../time/time/time'
import PlainText, { Input } from '../../text/plain-text'
import { View, Text } from 'react-native';
import theme from '../../theme/default-theme'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as Animatable from 'react-native-animatable'

import { ThemeProvider } from 'styled-components/native'

import { stripIndents } from 'common-tags'

/*
interface Props {
  showApp?: () => void,
}
*/

type Props = {
  showApp?: () => void,
};

type SproutProps = { show?: boolean } & Animatable.ViewProps

function Sprout ({
  show,
  style: _style,
  easing = Easing.elastic(1.25),
  duration = 300,
  transition: _transition = [],
  ...props
}: SproutProps) {
  let transition = typeof _transition === 'string' ?
    [ _transition, 'opacity', 'scale' ] :
    Array.isArray(_transition) ?
    [ ..._transition, 'opacity', 'scale' ] :
    [ 'opacity', 'scale' ] as any
  let style = [
    _style || {},
    show ?
      { opacity: 0, transform: [{ scale: 0.5 }] } :
      { opacity: 1, transform: [{ scale: 1 }] }
  ]
  return (
    <Animatable.View {...{ style, easing, duration, transition }} {...props}/>
  )
}

const data = {
  title: 'It sifts from Leaden Sieves - (311)',
  subtitle: 'Emily Dickinson, 1830 - 1886',
  content: stripIndents`
    It sifts from Leaden Sieves -
    It powders all the Wood.
    It fills with Alabaster Wool
    The Wrinkles of the Road -

    It makes an Even Face
    Of Mountain, and of Plain -
    Unbroken Forehead from the East
    Unto the East again -

    It reaches to the Fence -
    It wraps it Rail by Rail
    Till it is lost in Fleeces -
    It deals Celestial Vail

    To Stump, and Stack - and Stem -
    A Summer’s empty Room -
    Acres of Joints, where Harvests were,
    Recordless, but for them -

    It Ruffles Wrists of Posts
    As Ankles of a Queen -
    Then stills its Artisans - like Ghosts -
    Denying they have been -
  `,

}

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
    return (
      <View style={this.styles.wrapper}>
        <Sprout show={pressed}>
          <Text> Up and down you go </Text>
        </Sprout>

        <Button background="success" color="background" theme={theme}
          onPress={() => this.setState({ pressed: !this.state.pressed })}>Wow</Button>
        <Text>icon</Text>
        <Animatable.View
          duration={300}
          transition="opacity"
          easing={Easing.elastic(1.25)}
          style={{ opacity: Number(!pressed), alignSelf: 'flex-start' }}>
          <Button color="emphasis" background={pressed ? 'muted' : 'background'} width={35} height={35}
            disabled={pressed}
            styles={{ button: { borderRadius: 50 } }}
            theme={theme}>
            <Icon name="pencil" selectable={false} size={20}
              color={theme.colors.feedback.info}
              style={{ left: 1, top: 1, position: 'relative' }} />
          </Button>
        </Animatable.View>

        <ThemeProvider theme={theme}>
          <View style={{ backgroundColor: theme.colors.background.default, padding: 15, borderRadius: 15 }}>
            <Animatable.View
              duration={300}
              transition="opacity"
              easing={Easing.elastic(1.25)}
              style={{ opacity: Number(!pressed), position: 'absolute', right: -30, top: 0 }}>
              <Button color="emphasis" background={pressed ? 'muted' : 'background'} width={25} height={25}
                disabled={pressed}
                styles={{ button: { borderRadius: 50 } }}
                theme={theme}>
                <Icon name="pencil" selectable={false} size={15}
                  color={theme.colors.feedback.info}
                  style={{ left: 1, top: 1, position: 'relative' }} />
              </Button>
            </Animatable.View>
            <PlainText primary size="massive" {...this.cursor('title')} />
            <PlainText secondary size="big" {...this.cursor('subtitle')} />
            <PlainText muted {...this.cursor('content')} />
          </View>
        </ThemeProvider>
        {/*<Rating/>*/}
      </View>
    );
  }
}
