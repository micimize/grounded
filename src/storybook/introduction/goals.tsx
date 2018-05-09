import React from 'react';
import { View, Text } from 'react-native';

/*
interface Props {
  showApp?: () => void,
}
*/

type Props = {
  showApp?: () => void,
};

export default class Welcome extends React.Component<Props> {
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
        <Text style={this.styles.header}>Grounded, a domain driven component library</Text>
        <Text style={this.styles.content}>
          <Text style={this.styles.subheader}>Grounded aims </Text>
          to put the "cross cutting concerns" above functional concerns.
          It does this by organizing components primarily by type, rather than functionality.
        </Text>
      </View>
    );
  }
}
