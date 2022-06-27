import React from 'react'
import { Text } from 'native-base'

const H4 = ({ children, ...props }) => {
  return (
    <Text {...props} fontSize='14px' fontWeight='700'>
      {children}
    </Text>
  )
}
export default React.memo(H4)
