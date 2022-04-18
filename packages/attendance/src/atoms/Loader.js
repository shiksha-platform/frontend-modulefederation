import React from 'react'
import {
  Center,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
} from "native-base";


const Loader = ({success, fail}) => {
  return (
    <Center flex={1} px="3">
    <Center
      _text={{
        color: "white",
        fontWeight: "bold",
      }}
      height={200}
      width={{
        base: 200,
        lg: 400,
      }}
    >
      <VStack space={2} alignItems={"center"}>
        <Text>
          {success ? success : ""}
        </Text>
        <Text>
          {fail ? fail : ""}
        </Text>
        <HStack space={2} alignItems="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            Loading
          </Heading>
        </HStack>
      </VStack>
    </Center>
  </Center>
  )
}

export default Loader