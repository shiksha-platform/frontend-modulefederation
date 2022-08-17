// #6461D2, #eeedff, #E0DFF6

import colourConstant from './constants'

const { dark, normal, light } = colourConstant()
const colorTheme = {
  primary: dark,
  primaryLight: light,
  primaryDark: dark,
  secondary: normal,
  text: '#383739',
  cardBg: normal,
  cardBgLight: light,
  cardCloseIcon: '#7F9DAC',
  eventPoorPerformance: '#E04242',
  success: '#0D921B',
  warning: '#FFC369',
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
  darkGreen: '#5B7E5F',
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
  white: '#FFFFFF',
  successAlert: '#B9FBC0',
  warningAlert: '#FFE5B3',
  dangerAlert: '#F9DEDE',
  girls: '#0ea5e9',
  boys: '#a855f7'
}

export default colorTheme
