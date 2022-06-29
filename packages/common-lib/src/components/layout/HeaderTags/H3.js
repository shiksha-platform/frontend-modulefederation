import React from 'react'
import { Text } from 'native-base'

const H3 = ({ children, ...props }) => {
  return (
    <Text {...props} fontSize='16px' fontWeight='500'>
      {children}
    </Text>
  )
}
export default React.memo(H3)
