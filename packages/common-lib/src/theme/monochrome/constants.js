let dark = '#6461D2',
  normal = '#E0DFF6',
  light = '#eeedff'

const getColourTheme = (colour = 'purple') => {
  switch (colour) {
    case 'purple':
      dark = '#6461D2'
      normal = '#E0DFF6'
      light = '#eeedff'
      break
    default:
      dark = '#6461D2'
      normal = '#E0DFF6'
      light = '#eeedff'
      break
  }
  return { dark, normal, light }
}

export default getColourTheme
