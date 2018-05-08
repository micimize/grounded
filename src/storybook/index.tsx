import React from 'react';
import { storiesOf } from '@storybook/react';

import Welcome from './welcome';
import TimeInterval from '../time/interval/story'
import Time from '../time/time/story'
import Button from '../button/story'
import Rating from '../rating/story'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome />);
storiesOf('TimeInterval', module).add('example', () => <TimeInterval />);
storiesOf('Time', module).add('example', () => <Time/>);
storiesOf('Button', module).add('example', () => <Button/>);
storiesOf('Rating', module).add('example', () => <Rating/>);
