const maxWidth = '1080'
const fontFamily = localStorage.getItem('lang') === 'hi' ? "'Baloo 2'" : 'Inter'
const fontSize = localStorage.getItem('lang') === 'hi' ? '20px' : ''

const theme = {
  colors: {
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
    },
    primary: '#6461D2',
    secondary: '#D9F0FC',
    text: '#383739',
    cardBg: '#D9F0FC',
    cardCloseIcon: '#7F9DAC',
    eventPoorPerformance: '#E04242',
    eventAbsent: '#F57B7B',
    success: '#0D921B',
    warning: '#FFC369',
    danger: '#F57B7B',
    present: '#2BB639',
    absent: '#F57B7B',
    unmarked: '#B5B5C8',
    holiDay: '#F0F0F4',
    defaultMark: '#d3d3e5',
    lateMark: '#FFEB3B',
    error: '#D91414',
    messageSent: '#B1B1BF',
    messageAlert: '#373839',
    messageInfo: '#7C7E82',
    green: '#0d911c',
    bodyText: '#373839',
    darkGary0: '#18181b',
    darkGary1: '#27272a',
    darkGary2: '#4b5563',
    darkGary3: '#374151',
    darkGary4: '#3f3f46',
    darkGary5: '#52525b',
    gray: '#6b7280',
    lightGray0: '#9E9E9E',
    lightGray1: '#9ca3af',
    lightGray2: '#d1d5db',
    lightGray3: '#e5e7eb',
    lightGray4: '#f3f4f6',
    lightGray5: '#f4f4f5',
    lightGray6: '#f0f0f0',
    white: '#FFFFFF'
  },
  fonts: {
    heading: fontFamily,
    body: fontFamily,
    mono: fontFamily
  },
  components: {
    Layout: {
      _layout: { bg: '#6461D2', style: {} },
      _scollView: { bg: '#f8f8f9' },
      _header: {
        color: 'white',
        _heading: { color: 'white' },
        _subHeading: { color: 'white' }
      },
      _subHeader: { bg: '#E0DFF6', _text: { color: 'white' }, roundedTop: 0 },
      _appBar: { color: 'white' }
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
      }
    }
  }
}

export default theme
