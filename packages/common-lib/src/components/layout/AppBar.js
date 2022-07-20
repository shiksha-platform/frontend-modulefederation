import React, { useState } from 'react'
import {
  HStack,
  Box,
  StatusBar,
  Pressable,
  Input,
  Menu,
  Stack,
  InputLeftAddon,
  InputGroup,
  InputRightAddon
} from 'native-base'
import { useNavigate } from 'react-router-dom'
import IconByName from '../IconByName'

export default function AppBar({
  isEnableHamburgerMenuButton,
  isEnableLanguageMenu,
  isEnableSearchBtn,
  setSearch,
  setSearchState,
  color,
  languages,
  onPressBackButton,
  rightIcon,
  isShowNotificationButton,
  titleComponent,
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

  const handleSeachState = (boolean) => {
    if (setSearchState) setSearchState(boolean)
    setSearchInput(boolean)
  }

  return (
    <Box pt={7} px={5} {...props?._box}>
      <StatusBar bg='gray.600' barStyle='light-content' />
      <Box safeAreaTop bg='gray.600' />

      {searchInput ? (
        <Stack alignItems='center'>
          <InputGroup width='100%'>
            <InputLeftAddon
              p='0'
              bg='transparent'
              borderWidth='0'
              children={
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
              }
            />
            <Input
              variant='unstyled'
              bg='transparent'
              size={'full'}
              placeholder='search'
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputRightAddon
              p='0'
              bg='transparent'
              borderWidth='0'
              children={
                <IconByName
                  color='coolGray.500'
                  name='CloseCircleLineIcon'
                  p='0'
                  onPress={(e) => handleSeachState(false)}
                />
              }
            />
          </InputGroup>
        </Stack>
      ) : (
        <React.Fragment>
          <HStack
            bg='transparent'
            justifyContent='space-between'
            alignItems='center'
            minH='32px'
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
            </HStack>
            {titleComponent ? { titleComponent } : <React.Fragment />}
            <HStack alignItems={'center'}>
              {!searchInput && isEnableSearchBtn ? (
                <IconByName
                  color={color ? color : ''}
                  size='sm'
                  name='SearchLineIcon'
                  onPress={(e) => handleSeachState(true)}
                />
              ) : (
                <React.Fragment />
              )}
              {rightIcon ? rightIcon : <React.Fragment />}
              {isShowNotificationButton ? (
                <IconByName
                  name='Notification2LineIcon'
                  color={color ? color : ''}
                  onPress={(e) => navigate('/notification')}
                />
              ) : (
                <React.Fragment />
              )}
              <Stack px='3'>
                <Menu
                  right='100%'
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
        </React.Fragment>
      )}
    </Box>
  )
}
