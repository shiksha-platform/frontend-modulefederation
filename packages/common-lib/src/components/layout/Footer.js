import React, { useEffect } from 'react'
import { Box, Text, HStack, Center, Stack } from 'native-base'
import IconByName from '../IconByName'
import { useTranslation } from 'react-i18next'
import { Link, generatePath } from 'react-router-dom'

export default function Footer({ menues, routeDynamics, ...props }) {
  const [selected, setSelected] = React.useState(0)
  const { t } = useTranslation()

  const footerMenus = menues //TODO: manifest.menus.footer;

  useEffect(() => {
    if (['/'].includes(window?.location?.pathname)) {
      setSelected(0)
    } else if (
      [
        '/worksheet',
        '/teaching/:id',
        '/questionBank',
        '/:id',
        '/worksheet/create'
      ].includes(window?.location?.pathname)
    ) {
      setSelected(3)
    } else {
      setSelected(1)
    }
  }, [])

  const PressableNew = ({ item, children, ...prop }) => {
    return item?.route ? (
      <Box {...prop}>
        <Link
          style={{ textDecoration: 'none' }}
          to={
            routeDynamics
              ? generatePath(item.route, { ...{ id: item.id } })
              : item.route
          }
        >
          {children}
        </Link>
      </Box>
    ) : (
      <Box {...prop}>{children}</Box>
    )
  }

  return (
    <Stack>
      <Box width='100%' flex={1} safeAreaTop position='fixed' bottom='0'>
        <Center flex={1}></Center>
        <HStack bg='white' alignItems='center' safeAreaBottom shadow={6}>
          {footerMenus?.map((item, index) => (
            <PressableNew
              item={item}
              key={index}
              cursor='pointer'
              opacity={selected === index ? 1 : 0.5}
              py='3'
              flex={1}
              onPress={() => setSelected(0)}
            >
              <Text color={selected === index ? 'button.500' : 'coolGray.400'}>
                <Center>
                  <IconByName name={item.icon} />
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
