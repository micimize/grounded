import React from 'react';

const withDefaultProps = <P extends object, DP extends Partial<P> = Partial<P>>(
  defaultProps: DP,
  Cmp: React.ComponentType<P>
) => {
  // we are extracting props that need to be required
  type RemainingProps = Omit<P, keyof DP>
  // we are re-creating our props definition by creating and intersection type
  // between all original props mapped to be optional and required to be required
  type Props = Partial<DP> & RemainingProps

  // here we set our defaultProps
  Cmp.defaultProps = defaultProps

  // we override return type definition by turning type checker off
  // for original props  and setting the correct return type
  return Cmp as React.ComponentType<Props>
}

namespace Editable {
  export type DisplayProps<T> = {
    value?: T
  }
  export type EditorProps<T> = {
    onFocus?: () => any,
    onBlur?: () => any,
    onEdit?: (value: T) => any,
  }
  export type SugarProps = {
    editing: false | 'blurred' | 'focused'
  }
  export type State = { editor: 'blurred' | 'focused' }
}
function createEditable<
  T,
  DisplayProps extends Editable.DisplayProps<T>,
  EditorProps extends Editable.EditorProps<T> & DisplayProps,
  SugarProps extends Editable.SugarProps,
>({ editor: Editor, sugar: Sugar, display: Display }: {
  // sugar needs to be it's own wrapper component to handle transitions
  display: React.ComponentType<DisplayProps>,
  editor: React.ComponentType<EditorProps>,
  sugar: React.ComponentType<SugarProps>
}) {
  return class Editable extends React.Component<EditorProps, Editable.State> {
    state: Editable.State = { editor: 'blurred' }
    editorProps = () => {
      let { onEdit, onFocus, onBlur, value } = this.props
      let setter = (editor: 'focused' | 'blurred', cb = () => {/**/}) =>
        () => (this.setState({ editor }), cb())
      return {
        value,
        onEdit,
        onFocus: setter('focused', onFocus),
        onBlur: setter('blurred', onBlur),
      }
    }
    render() {
      let { onEdit, onFocus, onBlur, value, style, ...props } = this.props as any
      let inputProps = this.editorProps()
      return (
        <Sugar editing={onEdit === undefined ? false : this.state.editor} {...props}>
          {onEdit ?
            <Editor style={style} {...this.editorProps()} {...props} /> :
            <Display style={style} value={value} {...props}/>}
        </Sugar>
      )
    }
  }
}

export { withDefaultProps, createEditable }
