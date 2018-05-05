import React from 'react';
import styled from 'styled-components/native'
import defaultTheme from './default-theme'

import withDefaultProps from './with-default-props'

type Theme = typeof defaultTheme

type Stylers = 'primary' | 'secondary' | 'accent' | 'error' | 'warning' | 'info'

type Opts = Partial<Record<Stylers, true>>

let t: Opts = { primary: true }

type Themed<Props> = Props & { theme: Theme } & Opts

const themeProps = { theme: defaultTheme }

const withTheme = <P extends object>(Cmp: React.ComponentType<Themed<P>>) =>
  withDefaultProps<Themed<P>>(themeProps as Partial<Themed<P>>, Cmp)

export default withTheme