import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'native-base'

const H2 = ({
  fontSize,
  children,
  color,
  fontWeight,
  bold,
  textAlign,
  textTransform,
  pb
}) => {
  return (
    <Text
      fontSize={fontSize}
      color={color}
      fontWeight={fontWeight}
      bold={bold}
      textAlign={textAlign}
      textTransform={textTransform}
      pb={pb}
    >
      {children}
    </Text>
  )
}

H2.defaultProps = {
  fontSize: 'md',
  children: 'unknown',
  color: '',
  fontWeight: '',
  bold: false,
  textAlign: '',
  textTransform: '',
  pb: ''
}

H2.propTypes = {
  fontSize: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  fontWeight: PropTypes.string,
  bold: PropTypes.bool,
  textAlign: PropTypes.string,
  textTransform: PropTypes.string,
  pb: PropTypes.string
}

export default H2
