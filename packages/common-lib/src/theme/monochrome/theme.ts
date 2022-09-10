const maxWidth = '1080'
const fontFamily = localStorage.getItem('lang') === 'hi' ? "'Baloo 2'" : 'Inter'
const fontSize = localStorage.getItem('lang') === 'hi' ? '20px' : ''
import colorTheme from './colorTheme'
import colourConstant from './constants'

const { dark, normal, light } = colourConstant()

const theme = {
  colors: {
    ...colorTheme,
    attendance: colorTheme,
    student: {
      ...colorTheme,
      studentAvtarBg: '#f59e0b',
      studentName: '#1f2937',
      starIconBg: '#FFC326',
      starIconColor: '#E78D12'
    },
    calendar: {
      ...colorTheme,
      timeTableFlashIcon: '#BDB3E7',
      timeTablemiddle: '#A1D6B6',
      timeTablecellborder: '#FFDFD6',
      specialDuty: '#06D6A0',
      activeClass: '#10b981'
    },
    classes: {
      ...colorTheme,
      girls: '#0ea5e9',
      boys: '#a855f7'
    },
    profile: {
      ...colorTheme,
      primaryLight: '#FFF8F7',
      presentText: '#FA8129',
      specialDuty: '#06D6A0',
      activeClass: '#10b981',
      reportBoxBg: '#FFF8F7',
      cardBgTransparent: '#18181b66'
    },
    worksheet: { ...colorTheme },
    notification: {
      ...colorTheme,
      notificationBg: '#E0DFF6'
    },
    schools: { ...colorTheme },
    assessment: {
      ...colorTheme,
      primaryLight: '#FFF8F7',
      reportDetailsSubheaderBg: '#FFCAAC',
      QuationsBoxBg: '#FEF1EE',
      achiverBoxBg: '#FFF9F9'
    },
    visits: { ...colorTheme, visitedCard: '#ECF7EB' },
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
      7600: '#1e1c63',
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
          fontWeight: '600',
          color: 'white'
        }
      },
      variants: {
        solid: (e: any) => {
          return {
            _text: {
              color: 'white'
            }
          }
        }
      }
    },
    Avatar: {
      baseStyle: {
        rounded: 'lg'
      },
      defaultProps: {
        bg: 'primary',
        _text: {
          color: 'white'
        }
      }
    }
  }
}

export default theme
