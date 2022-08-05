const maxWidth = '1080'
const fontFamily = localStorage.getItem('lang') === 'hi' ? "'Baloo 2'" : 'Inter'
const fontSize = localStorage.getItem('lang') === 'hi' ? '20px' : ''
import attendance from '../modules/attendanceColorTheme'
import colorTheme from '../modules/colorTheme'

const dark = '#F87558'
const normal = '#F87558'
const light = '#FEEFEB'

const theme = {
  colors: {
    ...colorTheme,
    primary: '#F87558',
    attendance: {
      ...attendance,
      primary: '#F87558',
      cardText: '#383739',
      cardBg: '#C9AFF4'
    },
    student: {
      ...colorTheme,
      primary: '#F87558'
    },
    class: {
      ...colorTheme,
      primary: '#F87558'
    },
    worksheet: {
      ...colorTheme,
      primary: '#F87558',
      primaryLight: '#FFF8F7',
      primaryDark: '#C79AB2',
      cardBg: '#F9CCE4',
      cardBgLight: '#FEF1F9',
      secondary: '#feefeb'
    },
    notification: {
      cardBg: '#D9F0FC',
      notificationBg: '#FDDFD8'
    },
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
      50: '#fcf1ee',
      100: '#fae2dd',
      200: '#f5c8bc',
      300: '#f2ab99',
      400: '#ee8e78',
      500: '#F87558',
      600: '#d9654c'
    }
  },
  fonts: {
    heading: fontFamily,
    body: fontFamily,
    mono: fontFamily
  },
  components: {
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
