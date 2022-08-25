import { Box, VStack, HStack, Avatar, Divider } from 'native-base'
import IconByName from './IconByName'
import { BodyMedium } from './layout/HeaderTags'
// import H3 from './layout/HeaderTags'
import React from 'react'

export default function SchoolCard({
  _bgColor,
  imageUrl,
  name,
  attributeData
}) {
  return (
    <VStack space={6}>
      <Box bg={_bgColor} borderRadius={10}>
        <Box p={4}>
          <VStack space={6}>
            <HStack alignItems='center'>
              <Avatar
                size='45px'
                mr={4}
                borderRadius='md'
                source={{
                  uri: imageUrl ? imageUrl : ''
                }}
                bg={'primary'}
                color={'white'}
              >
                {name?.substring(0, 2)}
              </Avatar>
              <VStack>
                <h3>{name}</h3>
              </VStack>
            </HStack>
          </VStack>
        </Box>
        <Divider />
        <Box p={4}>
          <HStack
            alignItems={'center'}
            justifyContent={'space-between'}
            flexWrap={'wrap'}
          >
            {console.log(attributeData)}
            {attributeData &&
              attributeData?.length &&
              attributeData?.map((attribute) => (
                <div
                  style={{
                    flex: '0 0 50%',
                    maxWidth: '50%',
                    marginBottom: '10px'
                  }}
                >
                  <VStack>
                    <HStack alignItems='center'>
                      <IconByName size='12px' mr={2} name={attribute?.icon} />
                      <BodyMedium color='#666' fontSize='12'>
                        {attribute?.label}
                      </BodyMedium>
                    </HStack>
                    <BodyMedium>{attribute?.data}</BodyMedium>
                  </VStack>
                </div>
              ))}
          </HStack>
        </Box>
      </Box>
    </VStack>
  )
}
