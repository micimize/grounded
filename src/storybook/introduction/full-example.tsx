import React from 'react';
import Button from '../../button/button'
import Rating from '../../rating/rating'
import Time from '../../time/time/time'
import PlainText, { Input } from '../../text/plain-text'
import { View, Text } from 'react-native';
import theme from '../../theme/default-theme'

/*
interface Props {
  showApp?: () => void,
}
*/

type Props = {
  showApp?: () => void,
};

export default class FullExample extends React.Component<Props> {
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
    return (
      <View style={this.styles.wrapper}>
        <PlainText primary size="massive">Some title</PlainText>
        <PlainText secondary size="big">Some title</PlainText>
        <Button background="success" color="background" theme={theme}>Wow</Button>
        <Input muted value={`Some longer block of content text\nthat is editable`}/>
        {/*<Rating/>*/}
      </View>
    );
  }
}
