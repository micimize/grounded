import React from 'react';
import { TouchableOpacity } from 'react-native'
import Time from './time'
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class DateTimePickerTester extends React.Component<any> {
  state = {
    isDateTimePickerVisible: false,
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
  };

  render () {
    return (
      <TouchableOpacity onPress={this._showDateTimePicker}>
        <Time {...this.props} />
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </TouchableOpacity>
    );
  }

}