let palette = {
  // CYAN CORNFLOWER BLUE
  cyanCornflowerBlue: 'rgba(17, 138, 178, 1)',
  // EERIE BLACK
  eerieBlack: '#161925',

  // PRUNE
  prune: '#721817',
  // WARM BLACK
  warmBlack: 'rgba(7, 59, 76, 1)',

  // PLUMP PURPLE
  plumpPurple: '#5F4BB6',
  // RAISIN BLACK
  raisinBlack: '#1E1E24',

  // INFRA RED
  infraRed: 'rgba(239, 71, 111, 1)',
  // CARIBBEAN GREEN
  caribbeanGreen: 'rgba(6, 214, 160, 1)',
  // ORANGE-YELLOW
  orangeYellow: 'rgba(255, 209, 102, 1)',

  // unused
  // NEON CARROT
  neaonCarrot: '#FA9F42',
}

const theme = {
  colors: {
    primary: {
      foreground: palette.cyanCornflowerBlue,
      background: palette.eerieBlack
    },
    secondary: {
      foreground: palette.plumpPurple,
      background: palette.raisinBlack
    },
    accent: {
      foreground: palette.prune,
      background: palette.warmBlack
    },
    feedback: {
      success: palette.caribbeanGreen,
      danger: palette.infraRed,
      warning: palette.orangeYellow
      // info: palette.yellow
    }
  }
}

export default theme