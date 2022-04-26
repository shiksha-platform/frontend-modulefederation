import { Center, VStack, Text, Spinner, Heading } from 'native-base'
import React from 'react'
import { useWindowSize } from './helper'

export default function Loding({ message = 'Loding' }) {
  const [width, height] = useWindowSize()
  return (
    <Center flex={1} px='3'>
      <Center
        _text={{
          color: 'white',
          fontWeight: 'bold'
        }}
        height={height}
        width={width}
      >
        <VStack space={2} alignItems={'center'}>
          <VStack space={10} alignItems='center'>
            <Spinner
              color={'button.500'}
              accessibilityLabel='Loading posts'
              size='lg'
            />
            <VStack alignItems='center' space={2}>
              <Heading color='button.500' fontSize='22px'>
                {message}
              </Heading>
            </VStack>
          </VStack>
        </VStack>
      </Center>
    </Center>
  )
}
