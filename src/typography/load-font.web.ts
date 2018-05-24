
type FontObject = Record<string, string>
type StyleElement = HTMLStyleElement & ({} | {
  styleSheet: { cssText?: string }
})

function font(family: string, url: string) {
  return `@font-face {
    src: url(${url});
    font-family: ${family};
  }`
}

function fonts(fontObj: FontObject) {
  return Object.entries(fontObj)
    .reduce((faces, [family, url]) => `${faces}\n${font(family, url)}`, '')
}

function injectFonts(fontObj: FontObject) {
  const iconFontStyles = fonts(fontObj)
  // Create stylesheet
  const style = document.createElement('style') as StyleElement
  style.type = 'text/css';
  if ('styleSheet' in style) {
    style.styleSheet.cssText = iconFontStyles;
  } else {
    style.appendChild(document.createTextNode(iconFontStyles))
  }

  // Inject stylesheet
  document.head.appendChild(style)
}

const FontAwesome = require('react-native-vector-icons/Fonts/FontAwesome.ttf')

const injectFontAwesome = () => injectFonts({ FontAwesome })
export { injectFontAwesome as FontAwesome }

export default injectFonts
