const palette = {
  yellow: '#b58900',
  orange: '#cb4b16',
  red: '#dc322f',
  magenta: '#d33682',
  violet: '#6c71c4',
  blue: '#268bd2',
  cyan: '#2aa198',
  green: '#859900'
}

const branding = {
  primary: palette.cyan,
  secondary: palette.magenta,
  accent: palette.yellow,
}

// bootstrap feedback colors
const feedback = {
  success: '#28a745', 
  danger: '#dc3545',  
  warning: '#ffc107', 
  info: '#17a2b8',   
}

export const dark = {
  branding,
  feedback,
  embellishments: [
    // unused palette colors can become embellishments
    palette.blue,
    palette.orange,
    palette.green,
    palette.red,
  ],
  content: {
    emphasis: '#93a1a1',  // base1
    default: '#839496',   // base0
    muted: '#586e75',  // base01,
  },
  background: {
    default: '#002b36',   // base03
    highlight: '#073642', // base02
  }
}
export const light = {
  branding,
  feedback,
  embellishments: [ palette.magenta ],
  content: {
    emphasis: '#586e75',  // base01,
    default: '#657b83',   // base00,
    muted: '#93a1a1',     // base1
  },
  background: {
    highlight: '#eee8d5', // base2
    default: '#fdf6e3',   // base3
  }
}