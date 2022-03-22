import { Box, HStack, Pressable, Stack, Text, VStack } from 'native-base'
import React from 'react'
import { Link } from 'react-router-dom'
import IconByName from './IconByName'

const chunk = (array, chunk) => {
  return [].concat.apply(
    [],
    array.map(function (elem, i) {
      return i % chunk ? [] : [array.slice(i, i + chunk)]
    })
  )
}

const PressableNew = ({ route, children, ...prop }) => {
  return route ? (
    <Pressable {...prop}>
      <Link
        style={{ color: 'rgb(63, 63, 70)', textDecoration: 'none' }}
        to={route}
      >
        {children}
      </Link>
    </Pressable>
  ) : (
    <Box {...prop}>{children}</Box>
  )
}

function Widget({ data, title }) {
  const newData = chunk(data ? data : [], 2)
  const rotate = {
    bottom: '-20px',
    right: '-20px',
    minW: '50px',
    minH: '50px',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    style: { transform: 'rotateZ(316deg)' }
  }
  return (
    <Stack space={2}>
      <Text fontSize={'lg'}>{title}</Text>
      <VStack space={3}>
        {newData.map((subData, index) => (
          <HStack key={index} space={3} width={'100%'}>
            {subData.map((item, subIndex) => (
              <Box
                key={subIndex}
                rounded='xl'
                shadow={3}
                p={4}
                width='48%'
                overflow={'hidden'}
                {...item?._box}
              >
                <PressableNew route={item.link}>
                  <Text
                    {...{
                      fontSize: 'md',
                      fontWeight: 'medium',
                      color: 'coolGray.50'
                    }}
                    {...item?._text}
                  >
                    <VStack>
                      <Text bold>{item?.title}</Text>
                      <Text fontSize={'xs'}>{item?.subTitle}</Text>
                    </VStack>
                  </Text>
                  {item.icon ? (
                    <React.Fragment>
                      <Box
                        {...{
                          ...rotate,
                          bg: 'coolGray.700',
                          roundedTop: '20px',
                          opacity: '0.1'
                        }}
                      />
                      <IconByName
                        name={item.icon}
                        {...{
                          color: 'coolGray.700',
                          opacity: '0.5',
                          ...rotate,
                          ...item?._icon
                        }}
                      />
                    </React.Fragment>
                  ) : (
                    <React.Fragment />
                  )}
                </PressableNew>
              </Box>
            ))}
          </HStack>
        ))}
      </VStack>
    </Stack>
  )
}
export default Widget
