import React, { InputHTMLAttributes } from 'react'
import Input from 'react-maskedinput'

type FormattingRules = {
  defaultChar?: string | ((char: string) => void | string),
  validate: (char: string) => boolean
  validateContextually?: (char: string, index: number, value: string) => boolean
  transformContextually?: (char: string, index: number, value: string) => void | string
}

const formatCharacters: Record<string, FormattingRules> = {
  'H': {
    defaultChar: '0',
    validate: char => ['0', '1'].includes(char)
  },
  'o': {
    defaultChar(char: string) {
      return 'a' > char && char > '2' ? '2' :
        char !== '0' ? '0' : undefined
    },
    validateContextually(char, index, value) {
      let H = value[index - 1]
      return !(H !== '1' && ('a' <= char || char === '0'))
    },
    transformContextually(char: string, index: number, value: string) {
      let H = value[index - 1]
      if (H === '1' && ('a' > char && char > '2')) {
        return '2'
      }
      return undefined
    },
    validate: char => /^\d$/.test(char)
  },
  '2': {
    defaultChar: '0',
    validate: char => ['0', '1', '2'].includes(char)
  },
  '4': {
    defaultChar(char) {
      return 'a' > char && char > '4' ? '4' : '0'
    },
    transformContextually(char, index, value) {
      let H = value[index - 1]
      if (H > '1' && char > '4') {
        return '4'
      }
      return undefined
    },
    validate: char => /^\d$/.test(char)
  },
  'M': {
    defaultChar: '0',
    validate: char => ['0', '1', '2', '3', '4', '5'].includes(char)
  },
  'i': {
    defaultChar: '0',
    validate: char => /^\d$/.test(char)
  },
  'a': {
    validate: char => ['a', 'p'].includes(char)
  },
}

namespace MaskedInput {
  export type Props = Partial<InputHTMLAttributes<any>> & {
    value?: string,
    defaultValue?: string,

    mask?: string,
    formatCharacters?: object

    config?: object

    isRevealingMask?: boolean
    backspaceSkipsStatic?: boolean
    ref?: (ref: MaskedInput) => any

    onFull?: (value: string) => any
    onEmpty?: () => any
  } & ({
    mask: string,
  } | {
      config: { mask: string } & object
    })
}


function configure({ formatCharacters: additionalFormatCharacters = {}, ...config }) {
  return Object.assign({
    isRevealingMask: false,
    backspaceSkipsStatic: true,
    placeholder: "",
    formatCharacters: { ...formatCharacters, ...additionalFormatCharacters }
  }, config)
}

class MaskedInput extends React.Component<MaskedInput.Props, { value: string }> {
  input: React.ReactElement<'input'>

  constructor(props) {
    super(props);
    this.state = { value: props.defaultValue || "" }
  }

  getConfig = () => configure(this.props.config || this.props)

  maskIsFull = (value) => {
    let mask = this.props.mask || this.getConfig().mask
    if (this.getConfig().mask.length == value.length) {
      let { selectionEnd, selectionStart } = this.input as any
      return selectionStart == selectionEnd == value.length
    }
    return false
  }

  maskIsEmpty = (newValue) => {
    let value = this.props.value ||
      this.state.value ||
      this.props.defaultValue || ""
    let { selectionEnd, selectionStart } = this.input as any
    return (
      selectionStart === 0 &&
      selectionEnd === 0 &&
      newValue.length === 0
    ) && !(value !== undefined && (
      typeof value === 'number' || value.length)
    )
  }

  onChange = event => {
    // wrap onChange to handle uncontrolled components
    let { onChange = _ => null, onFull, onEmpty } = this.props
    if (onEmpty && this.maskIsEmpty(event.target.value)) {
      debugger;
      onEmpty()
    }
    if (!this.props.value) {
      let { value } = event.target
      this.setState({ value })
      onChange(event)
      if (this.maskIsFull(value) && onFull) {
        onFull(event)
      }
    } else {
      onChange(event)
    }
  }

  componentWillReceiveProps ({ value, onFull }: MaskedInput.Props) {
    // controlled components can still have onFull callbacks
    if (onFull && value !== undefined && this.maskIsFull(value)) {
      onFull(value.toString())
    }
  }

  handleRef = ref => {
    this.input = ref
    if (this.props.ref) {
      this.props.ref(ref)
    }
  }

  render() {
    let {
      config: _,
      onChange,
      onClick,
      onFull,
      defaultValue,
      className = '',
      value = this.state.value,
      ...props
    } = this.props
    return (
      <Input
        isRevealingMask={true}
        value={value}
        ref={this.handleRef}
        onChange={this.onChange}
        {...this.getConfig()}
        {...props} />
    )
  }
}

export default MaskedInput