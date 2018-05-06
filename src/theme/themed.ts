import React from 'react';
import styled from 'styled-components/native'
import defaultTheme from './default-theme'
import * as Color from './color/types'

import withDefaultProps from './with-default-props'

type Theme = typeof defaultTheme

type Themed<Props> = Props & { theme: Theme } & Color.Props

const defaultThemeProps = { theme: defaultTheme }

const defaultProps = <DP extends object>(dp: DP): Themed<DP> =>
  Object.assign({}, defaultThemeProps, dp)

const withTheme = <P extends object>(Cmp: React.ComponentType<Themed<P>>) =>
  withDefaultProps<Themed<P>>(defaultThemeProps as Partial<Themed<P>>, Cmp)

export { Themed as Props, defaultProps }

export default withTheme