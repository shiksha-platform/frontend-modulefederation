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
    hpAssessment: {
      ...colorTheme,
      absent: '#DF5B5B',
      ongoing: '#ffebd0',
      completed: '#ECF7EB',
      completeSeparator: '#C5DCC3',
      pendingSeparator: '#EEEEEE',
      successBackground: '#B9FBC0',
      scoreCardBg1: '#FFE5B3',
      cardBg1: '#303765'
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
      cardBg: '#CDECF6'
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
    },
    hpButton: {
      50: '#fcf1ee',
      100: '#303765',
      200: '#303765',
      300: '#303765',
      400: '#303765',
      500: '#303765',
      600: '#303765e6'
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
      }
    }
  }
}

export default theme
