import React from 'react';
import { storiesOf } from '@storybook/react';

import Welcome from './welcome';
import TimeInterval from '../time/interval/story'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome />);
storiesOf('TimeInterval', module).add('example', () => <TimeInterval />);
