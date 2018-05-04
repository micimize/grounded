import React from 'react';
import { storiesOf } from '@storybook/react';

import Welcome from './welcome';
import TimeRange from './time-range';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome />);
storiesOf('TimeRange', module).add('example', () => <TimeRange />);
