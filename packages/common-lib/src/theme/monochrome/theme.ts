const maxWidth = '1080'
const fontFamily = localStorage.getItem('lang') === 'hi' ? "'Baloo 2'" : 'Inter'
const fontSize = localStorage.getItem('lang') === 'hi' ? '20px' : ''
import colorTheme from '../modules/colorTheme'
import colourConstant from '../modules/constants'
import attendance from '../modules/attendanceColorTheme'

const { dark, normal, light } = colourConstant()

const theme = {
  colors: {
    ...colorTheme,
    attendance: { ...attendance, cardBg: normal },
    student: colorTheme,
    class: colorTheme,
    worksheet: colorTheme,
    notification: { ...colorTheme, notificationBg: light },
    widgetColor: {
      400: '#7F9DAC',
      500: '#DDD8F3',
      600: '#FFE2CC',
      700: '#CCE7FF',
      800: '#C4F2C5',
      900: '#CDDAFD',
      1000: '#FFC6FF'
    },
    iconColor: {
      500: '#aba0db',
      600: '#c3916c',
      700: '#83b0d7',
      800: '#5eb05f',
      900: '#7c8dbc',
      1000: '#ea5fff'
    },
    button: {
      50: '#ecebf9',
      100: '#c5c3ee',
      200: '#9e9ce3',
      300: '#7774d7',
      400: '#504ccc',
      500: '#6461D2',
      600: '#2a288b',
      700: '#1e1c63',
      800: '#12113c',
      900: '#060614'
    }
  },
  fonts: {
    heading: fontFamily,
    body: fontFamily,
    mono: fontFamily
  },
  components: {
    Layout: {
      _scollView: { bg: '#f8f8f9' },
      _subHeader: { bg: normal, _text: { color: dark } }
    },
    Text: {
      baseStyle: {
        textTransform: 'capitalize',
        fontFamily: fontFamily,
        fontSize: fontSize
      }
    },
    Actionsheet: {
      baseStyle: {
        maxW: maxWidth,
        alignSelf: 'center'
      }
    },
    Button: {
      baseStyle: {
        rounded: 'lg'
      },
      defaultProps: {
        colorScheme: 'button',
        _text: {
          textTransform: 'uppercase',
          fontSize: '12px',
          fontWeight: '600'
        }
      },
      variants: {
        outlineRounded: () => {
          return {
            borderWidth: 1,
            borderColor: dark,
            _text: { color: dark },
            bg: `${light}`,
            rounded: 'full',
            style: {
              paddingTop: '4px',
              paddingBottom: '4px',
              paddingRight: '20px',
              paddingLeft: '20px'
            }
          }
        },
        primaryRounded: () => {
          return {
            _text: { color: 'white' },
            bg: `${dark}`,
            rounded: 'full',
            style: {
              paddingTop: '4px',
              paddingBottom: '4px',
              paddingRight: '20px',
              paddingLeft: '20px'
            }
          }
        }
      }
    }
  }
}

export default theme
