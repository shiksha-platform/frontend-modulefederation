import React from 'react'
import { Text } from 'native-base'

const BodySmall = ({ children, ...props }) => {
  return (
    <Text {...props} fontSize='12px' fontWeight='400'>
      {children}
    </Text>
  )
}
export default React.memo(BodySmall)
