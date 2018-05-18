import React from 'react';
import { ScrollView, View, ViewStyle, StyleProp } from 'react-native'

type Component = React.ComponentType<any> | React.ReactElement<any>

type Props<T> = {
  ItemSeparatorComponent?: Component,
  ListFooterComponent?: Component
  ListHeaderComponent?: Component
  ListEmptyComponent?: Component
  contentContainerStyle?: StyleProp<ViewStyle>,
  data?: Array<T>,
  horizontal?: boolean,
  keyExtractor?: (item: T) => string,
  renderItem: (obj: { index: number, item: T }) => React.ReactElement<any>
  style?: StyleProp<ViewStyle>
}

class FlatList<T> extends React.Component<Props<T>> {
  renderComponent = (Component?: Component) => {
    if (!Component) {
      return null
    }
    if (React.isValidElement<any>(Component)) {
      return Component
    } else {
      return <Component />
    }

  }

  render() {
    const {
      ItemSeparatorComponent,
      ListFooterComponent,
      ListHeaderComponent,
      ListEmptyComponent,
      contentContainerStyle,
      data = [],
      horizontal = false,
      keyExtractor,
      renderItem,
      style
    } = this.props;

    return (
      <ScrollView
        contentContainerStyle={contentContainerStyle}
        horizontal={horizontal}
        style={style}
      >
        {this.renderComponent(ListHeaderComponent)}

        { data.length === 0 ?

          this.renderComponent(ListEmptyComponent) :

          data.map((item: T, index: number): React.ReactNode => (
            <View key={keyExtractor ? keyExtractor(item) : index}>
              {renderItem({ index, item })}
              {index < data.length - 1 && this.renderComponent(ItemSeparatorComponent)}
            </View>
          ))
        }

        {this.renderComponent(ListFooterComponent)}

      </ScrollView>
    );
  }
}

export default FlatList