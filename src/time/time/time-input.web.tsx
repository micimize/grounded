import React from 'react'
import Input from './masked-input'

const hours = 'Ho' 

const dayStartHour = 9

function dynamicallyAdapt12HourValue(value){
  let [H = '0', h = '0', c = ':', M = '0', m = '0', meridian = 'a', tail = 'm'] = value.split('')
  let hour = parseInt(H + h)
  meridian = (hour > dayStartHour && hour != 12) ? 'a' : 'p'
  return [H, h, c, M, m, meridian, tail].join('')
}

type Props = {

}

type Config = {
  placeholder: '12:59pm' | '23:59',
  mask: string,
}
export default class MomentEditor extends React.Component<Props, { config: Config }> {
  constructor(props) {
    super(props);
    this.state = {
      config: (hours == 'Ho') ? {
        mask: `${hours}:Miam`,
        placeholder: '12:59pm'
      } : {
        mask: `${hours}:Mi`,
        placeholder: '23:59'
      }
    }
  }

  format = formatMoment
  parse = parseMoment

  onChange = ({ target: { name, value } }) => {
    if(value){
      value = dynamicallyAdapt12HourValue(value)
      this.setState({config: Object.assign(this.state.config, { placeholder: value.replace(/_/g, '0') })})
    }
    this.props.update({ moment: this.parse(value) })
  }

  //onFull = () => this.props.update({ action: 'CONTINUE_FLOW' })
  ////*onFull={this.onFull} reference={ref => this.props.reference && this.props.reference(ref)}*/}

  render() {
    return (
      <div  className="moment editor">
        <Input 
          onChange={this.onChange} autoFocus={this.props.autoFocus}
          config={this.state.config} defaultValue={this.format(this.props.moment) || ""}/>
      </div>
    )
  }
}
