const maxWidth = '1080'
const fontFamily = localStorage.getItem('lang') === 'hi' ? "'Baloo 2'" : 'Inter'
const fontSize = localStorage.getItem('lang') === 'hi' ? '20px' : ''
import colorTheme from './colorTheme'

const theme = {
  colors: {
    ...colorTheme,
    attendance: {
      ...colorTheme,
      primary: '#F87558'
    },
    student: {
      ...colorTheme,
      studentAvtarBg: '#f59e0b',
      studentName: '#1f2937',
      starIconBg: '#FFC326',
      starIconColor: '#E78D12'
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
    classes: {
      ...colorTheme,
      girls: '#0ea5e9',
      boys: '#a855f7'
    },
    calendar: {
      ...colorTheme,
      timeTableFlashIcon: '#BDB3E7',
      timeTablemiddle: '#A1D6B6',
      timeTablecellborder: '#FFDFD6',
      specialDuty: '#06D6A0',
      activeClass: '#10b981'
    },
    notification: {
      ...colorTheme,
      cardBg: '#D9F0FC',
      notificationBg: '#FDDFD8'
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
    schools: {
      ...colorTheme,
      cardBg: '#CDECF6',
      primaryLight: '#FFF8F7'
    },
    assessment: {
      ...colorTheme,
      primaryLight: '#FFF8F7',
      reportDetailsSubheaderBg: '#FFCAAC',
      QuationsBoxBg: '#FEF1EE',
      achiverBoxBg: '#FFF9F9'
    },
    visits: {
      ...colorTheme,
      cardBg: '#CDECF6',
      visitedCard: '#ECF7EB'
    },
    mylearning: {
      ...colorTheme,
      primaryLight: '#FFF8F7',
      primaryDark: '#C79AB2',
      cardBg: '#F9CCE4'
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
