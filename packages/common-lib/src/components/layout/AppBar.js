import React, { useState } from 'react'
import {
  HStack,
  Box,
  StatusBar,
  Pressable,
  Input,
  Menu,
  Stack
} from 'native-base'
import { useNavigate } from 'react-router-dom'
import IconByName from '../IconByName'

export default function AppBar({
  isEnableHamburgerMenuButton,
  isEnableLanguageMenu,
  isEnableSearchBtn,
  setSearch,
  color,
  languages,
  onPressBackButton,
  ...props
}) {
  const [searchInput, setSearchInput] = useState(false)

  const navigate = useNavigate()
  const setLang = (e) => {
    if (e === 'logout') {
      localStorage.setItem('token', '')
    } else {
      localStorage.setItem('lang', e)
    }
    window.location.reload()
  }

  return (
    <Box pt={7} px={5} {...props?._box}>
      <StatusBar bg='gray.600' barStyle='light-content' />
      <Box safeAreaTop bg='gray.600' />
      <HStack
        bg='transparent'
        justifyContent='space-between'
        alignItems='center'
      >
        <HStack space='4' alignItems='center'>
          {isEnableHamburgerMenuButton ? (
            <IconByName size='sm' name='bars' color={color ? color : ''} />
          ) : (
            <IconByName
              size='sm'
              name='ArrowLeftLineIcon'
              color={color ? color : ''}
              onPress={() => {
                if (onPressBackButton) {
                  onPressBackButton()
                } else {
                  navigate(-1)
                }
              }}
            />
          )}
          {searchInput ? (
            <Input
              bg={'coolGray.100'}
              size={'full'}
              InputRightElement={
                <IconByName
                  size='sm'
                  color='coolGray.500'
                  w='1/8'
                  name='times'
                  pl='0'
                  onPress={(e) => setSearchInput(false)}
                />
              }
              placeholder='search'
              onChange={(e) => setSearch(e.target.value)}
            />
          ) : (
            <React.Fragment />
          )}
        </HStack>
        <HStack alignItems={'center'}>
          {!searchInput && isEnableSearchBtn ? (
            <IconByName
              color={color ? color : ''}
              size='sm'
              name='search'
              onPress={(e) => setSearchInput(true)}
            />
          ) : (
            <React.Fragment />
          )}
          <IconByName
            name='Notification2LineIcon'
            color={color ? color : ''}
            onPress={(e) => navigate('/notification')}
          />
          <Stack px='3'>
            <Menu
              w='190'
              placement='bottom right'
              trigger={(triggerProps) => {
                return (
                  <Pressable
                    accessibilityLabel='More options menu'
                    {...triggerProps}
                  >
                    <IconByName
                      size='sm'
                      name='More2LineIcon'
                      isDisabled={true}
                      color={color ? color : ''}
                    />
                  </Pressable>
                )
              }}
            >
              {languages?.map((e, index) => (
                <Menu.Item
                  key={index}
                  label={e.title}
                  textValue={e.code}
                  onPress={(item) => setLang(e.code)}
                >
                  {e.title}
                </Menu.Item>
              ))}
              <Menu.Item onPress={(item) => setLang('logout')}>
                Logout
              </Menu.Item>
            </Menu>
          </Stack>
        </HStack>
      </HStack>
    </Box>
  )
}
