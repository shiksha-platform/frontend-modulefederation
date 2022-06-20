import React from 'react'
import { Text } from 'native-base'

const Heading = ({ children, ...props }) => {
  return (
    <Text {...props} fontSize='24px' fontWeight='400'>
      {children}
    </Text>
  )
}
export default React.memo(Heading)
