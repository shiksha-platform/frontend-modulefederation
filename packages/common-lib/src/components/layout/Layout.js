import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Box, Center, Stack } from 'native-base'
import AppBar from './AppBar'
import { useWindowSize } from '../helper'

export default function Layout({
  isDisabledAppBar,
  subHeader,
  children,
  imageUrl,
  _appBar,
  _header,
  _subHeader,
  _footer
}) {
  const [width, Height] = useWindowSize()
  return (
    <Center>
      <Box minH={Height} w={width}>
        <Stack
          width={'100%'}
          style={{
            backgroundImage: imageUrl
              ? 'url(' + imageUrl + ')'
              : 'url(' + window.location.origin + '/headerBg.png)',
            backgroundColor: 'transparent',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
          space={5}
        >
          {!isDisabledAppBar ? (
            <AppBar color={imageUrl ? 'white' : ''} {..._appBar} />
          ) : (
            <React.Fragment />
          )}
          {_header ? <Header {..._header} /> : <React.Fragment />}
        </Stack>
        {subHeader ? (
          <Box
            {...{
              p: 4,
              position: 'relative',
              bg: 'purple.400',
              roundedTop: '20',
              _text: { textTransform: 'inherit' }
            }}
            {..._subHeader}
          >
            {subHeader}
          </Box>
        ) : (
          <React.Fragment />
        )}
        {children}
        <Footer {..._footer} />
      </Box>
    </Center>
  )
}
