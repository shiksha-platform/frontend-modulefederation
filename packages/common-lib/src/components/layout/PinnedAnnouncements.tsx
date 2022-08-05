import React from 'react'
import { HStack, Text, Box, VStack, Avatar } from 'native-base'
import IconByName from '../IconByName'
import { BodyMedium } from './HeaderTags'

export default function PinnedAnnouncements({ _pinnedAnnouncementsData }: any) {
  const [pinnedAnnouncementsList, setPinnedAnnouncementsList] = React.useState(
    _pinnedAnnouncementsData
  )
  const pinnedData = React.useMemo(
    () => pinnedAnnouncementsList,
    [pinnedAnnouncementsList]
  )
  return (
    <Box>
      <VStack space='2'>
        {pinnedData?.map((val: any, index: number) => (
          <HStack
            bg='green.100'
            space='4'
            px='5'
            py={val?.pinnedAnnouncementProperties?.isDismissable ? '3.5' : '5'}
            key={index}
            alignItems='center'
            justifyContent='flex-start'
            flexWrap='nowrap'
          >
            <HStack
              flexGrow='1'
              space='1'
              alignItems={'center'}
              justifyContent='flex-start'
              maxW='100%'
            >
              <IconByName
                _icon={{ size: '20' }}
                name='PushpinLineIcon'
                isDisabled
              />
              <BodyMedium>{val.data}</BodyMedium>
            </HStack>

            {val?.pinnedAnnouncementProperties?.isDismissable ? (
              <IconByName
                _icon={{ size: '20' }}
                name='CloseLineIcon'
                onPress={(e: any) => {
                  const d = [...pinnedAnnouncementsList]
                  d.splice(index, 1)
                  setPinnedAnnouncementsList(d)
                }}
              />
            ) : null}
          </HStack>
        ))}
      </VStack>
    </Box>
  )
}
