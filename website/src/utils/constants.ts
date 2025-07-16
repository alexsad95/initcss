import type { Props } from 'tippy.js';

export const defaultTippyOptions: Partial<Props> = {
  delay: [500, 100],
  theme: 'custom',
};

export const themes = [
  {
    name: 'paper-light',
    colors: {
      background: '#eeeeee',
      main: '#b2b2b2',
      text: '#444444',
      sub: '#b2b2b2',
      subAlt: '#dddddd',
    },
  },
  {
    name: '9009-light',
    colors: {
      background: '#eeeeee',
      main: '#b2b2b2',
      text: '#444444',
      sub: '#777777',
      subAlt: '#dddddd',
    },
  },
  {
    name: 'iceberg-light',
    colors: {
      background: '#e8e9ec',
      main: '#2d539e',
      text: '#33374b',
      sub: '#adb1c3',
      subAlt: '#cbceda',
    },
  },
  {
    name: 'blueberry-light',
    colors: {
      background: '#dae0f5',
      main: '#91b1d5',
      text: '#506377',
      sub: '#91a3be',
      subAlt: '#c1c7df',
    },
  },
  {
    name: 'camping-light',
    colors: {
      background: '#f9f1e3',
      main: '#608c55',
      text: '#3c403a',
      sub: '#c2b7aa',
      subAlt: '#e7dbcb',
    },
  },
  {
    name: 'retro-light',
    colors: {
      background: '#dad3c1',
      main: '#918b7c',
      text: '#1d1b17',
      sub: '#918b7c',
      subAlt: '#c8c3b3',
    },
  },
  {
    name: 'gruvbox-dark',
    colors: {
      background: '#282828',
      main: '#665c54',
      text: '#ebdbb2',
      sub: '#a89984',
      subAlt: '#504945',
    },
  },
  {
    name: 'carbon-dark',
    colors: {
      background: '#313131',
      main: '#f56e0d',
      text: '#f4e5c8',
      sub: '#616161',
      subAlt: '#2b2b2b',
    },
  },
  {
    name: 'repose-dark',
    colors: {
      background: '#2f3338',
      main: '#8f8e84',
      text: '#d5d2bc',
      sub: '#8f8e84',
      subAlt: '#393c3d',
    },
  },
  {
    name: 'material-dark',
    colors: {
      background: '#263238',
      main: '#80cbc4',
      text: '#eceff1',
      sub: '#90a4ae',
      subAlt: '#37474f',
    },
  },
  {
    name: 'nord-dark',
    colors: {
      background: '#2e3440',
      main: '#434c5e',
      text: '#d8dee9',
      sub: '#4c566a',
      subAlt: '#3b4252',
    },
  },
  {
    name: 'dracula-dark',
    colors: {
      background: '#282a36',
      main: '#bc93f9',
      text: '#f8f8f2',
      sub: '#6272a4',
      subAlt: '#44475a',
    },
  },
];
