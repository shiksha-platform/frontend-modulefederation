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
    worksheet: {
      primaryLight: '#E0DFF6',
      primaryDark: '#6461D2',
      primaryNormal: '#E0DFF6',
      primaryLight1: '#FFF8F7',
      cardTitle: '#383739',
      cardBg: '#F9CCE4',
      cardBgLight: '#FEF1F9',
      cardCloseIcon: '#7F9DAC',
      grayLight: '#d4d4d8',
      successAlertText: '#0D921B',
      successAlert: '#B9FBC0',
      warningAlert: '#FFE5B3',
      viewNotificationNormal: '#FDDFD8',
      viewNotificationDark: '#feefeb',
      gray: '#6b7280',
      green: '#0d911c',
      darkGreen: '#5B7E5F',
      lightGray1: '#9ca3af',
      lightGray2: '#d1d5db',
      lightGray3: '#e5e7eb',
      lightGray4: '#f3f4f6',
      lightGray5: '#f4f4f5',
      worksheetCardBg: '#F9CCE4',
      worksheetCardIcon: '#6461D2',
      worksheetBoxText: '#333333',
      alertBackground: '#B9FBC0',
      worksheetText: '#373839',
      worksheetCloseIcon: '#AA948E',
      messageInfo: '#7C7E82'
    },    
  },
  fonts: {
    heading: fontFamily,
    body: fontFamily,
    mono: fontFamily
  },
  components: {
    Layout: {
      _layout: { bg: '', style: {} },
      _scollView: { bg: '#f8f8f9' },
      _subHeader: { bg: '#E0DFF6', _text: { color: '#6461D2' } }
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
