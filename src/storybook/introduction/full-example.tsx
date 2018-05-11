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
  let unit = show ? 1 : 0
  let transition = typeof _transition === 'string' ?
    [ _transition, 'opacity', 'scale' ] :
    [ ..._transition, 'opacity', 'scale' ] as any
  let style = [
    _style || {},
    { opacity: unit, transform: [{ scale: unit }] }
  ]
  return (
    <Animatable.View {...{ style, easing, duration, transition }} {...props}/>
  )
}

export default class FullExample extends React.Component<Props, any> {
  state = { pressed: false }
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

  render() {
    let pressed = this.state.pressed
    return (
      <View style={this.styles.wrapper}>
        <PlainText primary size="massive">Some title</PlainText>
        <PlainText secondary size="big">Some title</PlainText>
        <Sprout show={pressed}>
          <Text style={{ textAlign: 'center' }}>
            Up and down you go
          </Text>
        </Sprout>

        <Button background="success" color="background" theme={theme}
          onPress={() => this.setState({ pressed: !this.state.pressed })}>Wow</Button>
        <Text>icon</Text>
        <Sprout show={pressed} style={{ alignSelf: 'flex-start' }}>
          <Button color="emphasis" background={!pressed ? 'muted' : 'primary'} width={35} height={35}
            disabled={!pressed}
            styles={{ button: { borderRadius: 50 } }}
            theme={theme}>
            <Icon name="edit" selectable={false} size={20} style={{ left: 2, top: 1, position: 'relative' }} />
          </Button>
        </Sprout>

        <Input muted value={`Some longer block of content text\nthat is editable`}/>
        {/*<Rating/>*/}
      </View>
    );
  }
}
