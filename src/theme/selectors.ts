import defaultTheme from './default-theme'
type Theme = typeof defaultTheme

// select prop with selector[0]
// then extract it from the theme with Function
type Selector = [string, Function]

// todo use ramda and better typing
function selectProp(selectors: Selector[]) {
  return (props: { theme: Theme }) => {
    for (let selector of selectors) {
      if (selector[0] in props) {
        return selector[1](props.theme)
      }
    }
  }
}

const keys = {
  branding: [ 'primary', 'secondary', 'accent' ],
  feedback: [ 'success', 'dange', 'warning', 'info' ]
}

const selectorCreators: Record<string, (kind: string) => Selector> = {
  foreground: kind => [
    kind,
    theme => theme.colors[kind].foreground
  ],
  feedback: kind => [
    kind,
    theme => theme.colors.feedback[kind]
  ]

}

export const foreground = selectProp(
  keys.branding.map(selectorCreators.foreground)
)

export const feedback = selectProp(
  keys.feedback.map(selectorCreators.feedback)
)

export const color = selectProp([
  ...keys.branding.map(selectorCreators.foreground),
  ...keys.feedback.map(selectorCreators.feedback)
])
