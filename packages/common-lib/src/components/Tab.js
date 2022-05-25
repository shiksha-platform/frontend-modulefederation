import React from 'react'
import { Text, Box, Pressable, VStack } from 'native-base'
import { Animated } from 'react-native-web'

export default function Tab({ routes, _box }) {
  const [index, setIndex] = React.useState(0)
  return (
    <VStack>
      <Box flexDirection='row' {..._box}>
        {routes.map((route, i) => {
          return (
            <Pressable key={i} flex={1} onPress={() => setIndex(i)}>
              <Box
                borderBottomWidth='3'
                borderColor={index === i ? 'button.500' : 'coolGray.200'}
                alignItems='center'
                p='3'
                cursor='pointer'
              >
                <Animated.Text>
                  <Text {...{ color: index === i ? 'button.500' : '#a1a1aa' }}>
                    {route.title}
                  </Text>
                </Animated.Text>
              </Box>
            </Pressable>
          )
        })}
      </Box>
      {routes[index]?.component}
    </VStack>
  )
}
