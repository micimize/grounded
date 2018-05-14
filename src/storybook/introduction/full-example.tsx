import React, { ReactChildren } from 'react';
import { Easing } from 'react-native';
import Button from '../../button/button'
import Rating from '../../rating/rating'
import Time from '../../time/time/time'
import PlainText from '../../text/editable'
import { View, Text } from 'react-native';
import theme from '../../theme/default-theme'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as Animatable from 'react-native-animatable'

import { ThemeProvider } from 'styled-components/native'

import { Sprout } from '../../styled/animations'
import { stripIndents } from 'common-tags'

/*
interface Props {
  showApp?: () => void,
}
*/

type Props = {
  showApp?: () => void,
};

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
        <ThemeProvider theme={theme}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <View style={{ backgroundColor: theme.colors.background.default, padding: 15, borderRadius: 15, flex: 1 }}>
              <PlainText primary size="massive" {...this.cursor('title')} />
              <PlainText secondary size="big" {...this.cursor('subtitle')} />
              <PlainText style={{ paddingLeft: 10, paddingBottom: 10 }} muted {...this.cursor('content')} />
            </View>
            <View style={{ flexDirection: 'column', paddingLeft: 10 }}>
              <Button color="emphasis" background="background" width={25} height={25}
                onPress={() => this.setState({ pressed: !this.state.pressed })}
                disabled={pressed}
                styles={{ button: { borderRadius: 50 } }}
                theme={theme}>
                <Icon name="pencil" selectable={false} size={15}
                  color={theme.colors.feedback.info}
                  style={{ position: 'relative' }} />
              </Button>
              <Sprout show={pressed}>
                <Button color="emphasis" background="success" width={25} height={25}
                  disabled={!pressed}
                  styles={{ button: { borderRadius: 50 } }}
                  theme={theme}>
                  <Icon name="check" selectable={false} size={15}
                    color={theme.colors.background.default}
                    style={{ position: 'relative' }} />
                </Button>
              </Sprout>
              <Sprout show={pressed}>
                <Button color="emphasis" background="danger" width={25} height={25}
                  onPress={() => this.setState({ pressed: !this.state.pressed })}
                  styles={{ button: { borderRadius: 50 } }}
                  theme={theme}>
                  <Icon name="close" selectable={false} size={15}
                    color={theme.colors.background.default}
                    style={{ position: 'relative' }} />
                </Button>
              </Sprout>
            </View>
          </View>
        </ThemeProvider>
        {/*<Rating/>*/}
      </View >
    );
  }
}
