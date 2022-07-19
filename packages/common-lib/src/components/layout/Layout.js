import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Box, Center, Stack } from 'native-base'
import AppBar from './AppBar'
import { useWindowSize } from '../helper'
import HeightWidth from '../HeightWidth'

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
  const [refFoot, serRefFoot] = React.useState({})

  return (
    <Center>
      <HeightWidth>
        <Stack
          width={'100%'}
          style={{
            backgroundImage: imageUrl
              ? 'url(' + imageUrl + ')'
              : 'url(' + window.location.origin + '/header.png)',
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
              py: '6',
              px: '5',
              position: 'relative',
              bg: 'white',
              roundedTop: '20'
            }}
            {..._subHeader}
          >
            {subHeader}
          </Box>
        ) : (
          <React.Fragment />
        )}
        {children}
        <Box minH={refFoot?.clientHeight ? refFoot?.clientHeight : 85}></Box>
      </HeightWidth>
      <Box w={width} ref={(e) => serRefFoot(e)}>
        <Footer {..._footer} />
      </Box>
    </Center>
  )
}
