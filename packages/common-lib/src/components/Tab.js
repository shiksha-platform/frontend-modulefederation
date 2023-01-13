import React from 'react'
import { Text, Box, Pressable, VStack, HStack } from 'native-base'
import { Animated } from 'react-native-web'

const styles = {
  shadow: { style: { boxShadow: 'inset 0px -1px 0px #dfdfe8' }, px: '3' }
}

export default function Tab({ routes, _box, _item }) {
  const [index, setIndex] = React.useState(0)
  return (
    <VStack>
      <HStack {..._box}>
        {routes.map((route, i) => {
          return (
            <Pressable key={i} flex={1} onPress={() => setIndex(i)} {..._item}>
              <Box alignItems='center' p='3' cursor='pointer'>
                <Animated.Text>
                  <Text
                    {...{ color: index === i ? 'button.500' : 'blueGray.400' }}
                    fontWeight='500'
                    fontSize='14px'
                  >
                    {route.title}
                  </Text>
                </Animated.Text>
              </Box>
              <Box {...styles.shadow}>
                <Box
                  bg={index === i ? 'button.500' : ''}
                  roundedTopLeft='16px'
                  roundedTopRight='16px'
                  alignItems='center'
                  h='5px'
                  cursor='pointer'
                />
              </Box>
            </Pressable>
          )
        })}
      </HStack>
      {routes[index]?.component}
    </VStack>
  )
}
