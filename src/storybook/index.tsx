import React from 'react';
import { storiesOf } from '@storybook/react';

import Goals from './introduction/goals';
import FullExample from './introduction/full-example';

import TimeInterval from '../time/interval/story'
import Time from '../time/time/story'
import Button from '../button/story'
import Rating from '../rating/story'
import Text from '../text/story'
import OrderedList from '../structures/story'

storiesOf('Introduction', module)
  .add('Goals', () => <Goals />)
  .add('Full Example', () => <FullExample />)
  .add('Ordered List', () => <OrderedList />);

storiesOf('Primitives', module)
  .add('Text', () => <Text />);
storiesOf('Time', module)
  .add('Time', () => <Time/>)
  .add('TimeInterval', () => <TimeInterval/>);
storiesOf('Button', module)
  .add('Push', () => <Button/>);
storiesOf('Rating', module).add('example', () => <Rating/>);
