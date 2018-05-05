import { setOptions } from '@storybook/addon-options';
import centered from './decorator-centered';
import { configure, addDecorator } from '@storybook/react';

addDecorator(centered);

setOptions({
  name: 'React Native Grounded',
  url: 'https://grounded.grounded@ground.ground',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: false,
  showSearchBox: false,
  downPanelInRight: false
});

function loadStories() {
  // put welcome screen at the top of the list so it's the first one displayed
  require('../src/storybook')

  // automatically import all story js files that end with *.stories.js
  // const req = require.context('../stories', true, /\.stories\.tsx?$/);
  // req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
