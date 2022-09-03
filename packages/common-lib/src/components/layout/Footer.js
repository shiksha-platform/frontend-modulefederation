import React, { useEffect } from 'react'
import { Box, Text, HStack, Center, Stack, Pressable } from 'native-base'
import IconByName from '../IconByName'
import { useTranslation } from 'react-i18next'
import { generatePath, useNavigate } from 'react-router-dom'
import { useWindowSize } from '../helper'

export default function Footer({ menues, routeDynamics, ...props }) {
  const [selected, setSelected] = React.useState(0)
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [width, Height] = useWindowSize()
  const footerMenus = menues

  useEffect(() => {
    let path = window?.location?.pathname.toString()
    if (
      path.startsWith('/attendance') ||
      path.startsWith('/class') ||
      path.startsWith('/assessment')
    ) {
      setSelected('classes')
    } else if (path.startsWith('/worksheet')) {
      setSelected('worksheet')
    } else if (path.startsWith('/mylearning')) {
      setSelected('mylearning')
    } else if (path.startsWith('/visits') || path.startsWith('/schools')) {
      setSelected('visits')
    } else {
      setSelected('app')
    }
  }, [])

  const PressableNew = ({ item, children, ...prop }) => {
    return item?.route ? (
      <Pressable
        {...prop}
        onPress={() => {
          navigate(
            routeDynamics
              ? generatePath(item.route, { ...{ id: item.id } })
              : item.route
          )
        }}
      >
        {children}
      </Pressable>
    ) : (
      <Box {...prop}>{children}</Box>
    )
  }

  return (
    <Stack>
      <Box width={width} flex={1} safeAreaTop position='fixed' bottom='0'>
        <Center flex={1}></Center>
        <HStack bg='white' alignItems='center' safeAreaBottom shadow={6}>
          {footerMenus?.map((item, index) => (
            <PressableNew
              item={item}
              key={index}
              cursor='pointer'
              opacity={selected === item.moduleName ? 1 : 0.5}
              py='3'
              flex={1}
              onPress={() => setSelected(item.moduleName)}
            >
              <Text
                color={
                  selected === item.moduleName ? 'button.500' : 'coolGray.400'
                }
              >
                <Center>
                  <IconByName name={item.icon} isDisabled p='2' />
                  <Text fontSize='12'>{t(item.title)}</Text>
                </Center>
              </Text>
            </PressableNew>
          ))}
        </HStack>
      </Box>
    </Stack>
  )
}
