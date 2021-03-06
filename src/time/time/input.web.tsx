import React from 'react'
import * as R from 'ramda'
import Input from './masked-input'
import { LocalTime, nativeJs, DateTimeFormatter } from 'js-joda'


import Moment from 'moment'

function parse(str: string) {
  if (!str) {
    return undefined;
  }
  let m = Moment(str, 'hh:mm')
  if (m.isValid()) {
    return LocalTime.from(nativeJs(m))
  }
  return undefined;
}

namespace TimeInput {
  export type Props = themed<
    Omit<Input.Props, 'mask' | 'config' | 'onChange' | 'value' | 'defaultValue' | 'size'> & {
      onEdit: (time?: LocalTime) => any
      value?: LocalTime,
      defaultValue?: LocalTime,
    }
  >
  export type Component = React.ComponentType<Props>
}
type Props = TimeInput.Props


const hours: string = '24' // Ho 

const dayStartHour = 9

function dynamicallyAdapt12HourValue(value){
  let [H = '0', h = '0', c = ':', M = '0', m = '0', meridian = 'a', tail = 'm'] = value.split('')
  let hour = parseInt(H + h)
  meridian = (hour > dayStartHour && hour != 12) ? 'a' : 'p'
  return [H, h, c, M, m, meridian, tail].join('')
}

type Config = {
  placeholder: '12:59pm' | '23:59',
  mask: string,
}
class MaskedTimeInput extends React.Component<Props, { config: Config }> {
  constructor(props) {
    super(props);
    this.state = {
      config: (hours === 'Ho') ? {
        mask: `${hours}:Miam`,
        placeholder: '12:59pm'
      } : {
        mask: `${hours}:Mi`,
        placeholder: '23:59'
      }
    }
  }

  onChange = ({ target: { name, value } }) => {
    if(value){
      value = dynamicallyAdapt12HourValue(value)
      this.setState({
        config: Object.assign(this.state.config, { placeholder: value.replace(/_/g, '0')
      })})
    }
    this.props.onEdit(parse(value))
  }

  //onFull = () => this.props.update({ action: 'CONTINUE_FLOW' })
  ////*onFull={this.onFull} reference={ref => this.props.reference && this.props.reference(ref)}*/}

  render() {
    let defaultValue = this.props.value ? this.props.value.toString() :
      this.props.defaultValue ? this.props.defaultValue.toString() : undefined
    return (
      <Input 
        defaultValue={defaultValue}
        config={this.state.config} 
        onChange={this.onChange}
        {...R.omit(['onEdit', 'value', 'defaultValue', 'size'], this.props)} />
    )
  }
}

import styled from 'styled-components/native'
import themed from '../../theme/themed'
import * as select from '../../theme/style-props'

const TimeInput = themed<TimeInput.Props>(styled(MaskedTimeInput)`
  color: ${select.text.color};
  background: ${select.text.background};
  font-size: ${select.text.size()};
` as any)

export default TimeInput