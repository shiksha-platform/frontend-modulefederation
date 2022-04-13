import { Center, VStack, Text, HStack, Spinner, Heading } from 'native-base'
import React from 'react'

export default function Loding() {
  return (
    <Center flex={1} px='3'>
      <Center
        _text={{
          color: 'white',
          fontWeight: 'bold'
        }}
        height={200}
        width={{
          base: 200,
          lg: 400
        }}
      >
        <VStack space={2} alignItems={'center'}>
          <HStack space={2} alignItems='center'>
            <Spinner accessibilityLabel='Loading posts' />
            <Heading color='primary.500' fontSize='md'>
              Loading
            </Heading>
          </HStack>
        </VStack>
      </Center>
    </Center>
  )
}
