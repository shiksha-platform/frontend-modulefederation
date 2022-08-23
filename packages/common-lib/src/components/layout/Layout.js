import React from 'react'
import Header from './Header'
import Footer from './Footer'
import PinnedAnnouncements from './PinnedAnnouncements'
import { Box, Center, Stack, useTheme } from 'native-base'
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
  _footer,
  _pinnedAnnouncementsData
}) {
  const [width, Height] = useWindowSize()
  const [refFoot, serRefFoot] = React.useState({})
  const { components } = useTheme()
  const { Layout } = components

  return (
    <Center>
      <HeightWidth _scollView={Layout?._scollView}>
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
          {...(Layout?._layout ? Layout?._layout : {})}
          space={5}
        >
          {_pinnedAnnouncementsData ? (
            <PinnedAnnouncements {...{ _pinnedAnnouncementsData }} />
          ) : null}
          {!isDisabledAppBar ? (
            <AppBar
              color={imageUrl ? 'white' : ''}
              {...(Layout?._appBar ? Layout?._appBar : {})}
              {..._appBar}
            />
          ) : (
            <React.Fragment />
          )}
          {_header ? (
            <Header
              {...(Layout?._header ? Layout?._header : {})}
              {..._header}
            />
          ) : (
            <React.Fragment />
          )}
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
            {...(Layout?._subHeader ? Layout?._subHeader : {})}
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
        <Footer {...(Layout?._footer ? Layout?._footer : {})} {..._footer} />
      </Box>
    </Center>
  )
}
