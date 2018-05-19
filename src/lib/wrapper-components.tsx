import React from 'react';

// todo this should actually be the component type
type withDefaultProps<P extends object, DP extends Partial<P> = Partial<P>> = 
  Omit<P, keyof DP> & Partial<DP>
const withDefaultProps = <P extends object, DP extends Partial<P> = Partial<P>>( defaultProps: DP,
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

namespace withShadowedProps {
  export type Keys<P extends object, Keys extends keyof P> = 
    React.ComponentType<Omit<P, Keys>>
}
type withShadowedProps<P extends object, DP extends Partial<P> = Partial<P>> = 
  React.ComponentType<Omit<P, keyof DP>>

const withShadowedProps = <P extends object, DP extends Partial<P> = Partial<P>>(
  shadowedProps: DP,
  Cmp: React.ComponentType<P>
) => {
  type RemainingProps = Omit<P, keyof DP>
  // we override return type definition by turning type checker off
  // for original props  and setting the correct return type
  return (props: RemainingProps) => <Cmp {...props} {...shadowedProps}/>
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
  export type ControllerProps = {
    editing: false | 'blurred' | 'focused',
    children: React.ReactChild,
  } & Partial<Record<'focus' | 'blur' | 'commitEdit', () => any>>

  export type State<T> = { editorState: 'blurred' | 'focused', value: T | undefined }

  export type Props<T> = DisplayProps<T> & EditorProps<T>
}
function createEditable<
  T,
  DisplayProps extends Editable.DisplayProps<T>,
  EditorProps extends Editable.EditorProps<T> & DisplayProps,
  ControllerProps extends Editable.ControllerProps
>(args: {
  display: React.ComponentType<DisplayProps>,
  editor: React.ComponentType<EditorProps>,
  controller: React.ComponentType<ControllerProps>,
  controlledEdit?: (change: T, old?: T) => T
}) {
  const { display: Display, editor: Editor, controller: Controller, controlledEdit } = args
  return class Editable extends React.Component<EditorProps, Editable.State<T>> {
    state: Editable.State<T> = { editorState: 'blurred', value: undefined }
    editorProps = () => {
      let { onEdit, onFocus, onBlur, value } = this.props
      let setter = (editorState: 'focused' | 'blurred', cb) => {
        let set = () => (this.setState({ editorState }))
        return cb ? () => (set(), cb()) : set
      }
      return {
        value: controlledEdit ?
          (this.state.value === undefined ? value : this.state.value) :
          value,
        onEdit: controlledEdit ?
          this.state.editorState === 'focused' ?
            (value: T) => this.setState({ value: controlledEdit(value, this.state.value) }) :
            undefined :
          onEdit,
        onFocus: setter('focused', onFocus),
        onBlur: setter('blurred', onBlur),
      }
    }
    render() {
      let { onEdit, onFocus, onBlur, value, style, ...props } = this.props as any
      let inputProps = this.editorProps()
      let ifEditing = fn => onEdit ? fn : undefined
      return (
        <Controller
          commitEdit={controlledEdit ? () => onEdit(this.state.value) : undefined}
          focus={ifEditing(inputProps.onFocus)}
          blur={ifEditing(inputProps.onBlur)}
          editing={onEdit === undefined ? false : this.state.editorState}
          {...props}>
          { onEdit && ((!controlledEdit) || this.state.editorState) ?
            <Editor style={style} {...this.editorProps()} {...props} /> :
            <Display style={style} value={value} {...props}/> }
        </Controller>
      )
    }
  }
}
type Editable<
  T,
  DisplayProps extends Editable.DisplayProps<T>
    = Editable.DisplayProps<T>,
  EditorProps extends Editable.EditorProps<T> & DisplayProps
    = Editable.EditorProps<T> & DisplayProps,
  ControllerProps extends Editable.ControllerProps
    = Editable.ControllerProps,
> = React.ComponentType<EditorProps>

export { withDefaultProps, withShadowedProps, Editable, createEditable }
