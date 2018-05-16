import React from 'react';
import styled from 'styled-components/native'
import defaultTheme from './default-theme'
import * as Color from './color/types'
import * as Size from './size/types'

import Lens from '../lib/lens/optional'
import { withDefaultProps } from '../lib/wrapper-components'

type Theme = Color.Theme & Size.Theme

type Themed<Props> = Props & { theme: Theme } & Color.Props & Size.Props

export { defaultTheme }
const defaultThemeProps = { theme: defaultTheme }

const defaultProps = <DP extends object>(dp: DP): Themed<DP> =>
  Object.assign({}, defaultThemeProps, dp)

type withTheme<Props> = Themed<Props>
const withTheme = <P extends object>(Cmp: React.ComponentType<P>) =>
  withDefaultProps<Themed<P>>(
    defaultThemeProps as Partial<Themed<P>>,
    Cmp as React.ComponentType<Themed<P>>
  )

export const lens = Lens<Themed<{}>>()
export const by = lens.theme

export { Themed as Props, defaultProps, by as with }

export default withTheme
