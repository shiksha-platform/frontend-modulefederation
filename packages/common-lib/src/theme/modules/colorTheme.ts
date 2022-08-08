// #6461D2, #eeedff, #E0DFF6

import colourConstant from './constants'

const { dark, normal, light } = colourConstant()
const colorTheme = {
  primary: dark,
  primaryLight: light,
  primaryDark: dark,
  secondary: normal,
  text: '#383739',
  cardText: '#383739', //this is for subheader and action sheets
  cardBg: normal,
  cardBgLight: light,
  cardCloseIcon: '#7F9DAC',
  eventPoorPerformance: '#E04242',
  success: '#0D921B',
  warning: '#FFC369',
  danger: '#F57B7B',
  error: '#D91414',
  // attendance specific
  present: '#2BB639',
  absent: '#F57B7B',
  unmarked: '#B5B5C8',
  unmarkedLight: '#F0F0F4',
  green: '#0d911c',
  darkGreen: '#5B7E5F',
  bodyText: '#373839',
  darkGray: '#18181b',
  darkGrayFaint: '#3f3f46',
  darkGrayLight: '#52525b',
  lightGray: '#9E9E9E',
  coolGrayDark: '#374151',
  coolGray: '#4b5563',
  gray: '#6b7280',
  coolGrayLight: '#d1d5db',
  coolGrayFaint: '#e5e7eb',
  coolGrayThin: '#f0f0f0',
  lightGrayFaint: '#f3f4f6',
  lightGrayThin: '#f4f4f5',
  white: '#FFFFFF',
  successAlert: '#B9FBC0',
  warningAlert: '#FFE5B3'
}

export default colorTheme
