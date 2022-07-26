import React, { useEffect, useState } from 'react'
import {
  PresenceTransition,
  HStack,
  Text,
  Box,
  Pressable,
  Stack
} from 'native-base'
import IconByName from './IconByName'

const Collapsible = ({
  header = '',
  children,
  defaultCollapse = true,
  isHeaderBold = true,
  onPressFuction,
  isDisableCollapse,
  collapsButton,
  _icon,
  _header
}) => {
  const [isOpen, setIsOpen] = useState(defaultCollapse)
  return (
    <Box bg='white' p={4}>
      <Pressable
        onPress={() => {
          if (!isDisableCollapse) setIsOpen(!isOpen)
          if (onPressFuction) onPressFuction()
        }}
      >
        <HStack
          alignItems={'center'}
          justifyContent={'space-between'}
          {..._header}
        >
          <Text
            bold={typeof isHeaderBold === 'undefined' ? true : isHeaderBold}
            fontSize={typeof isHeaderBold === 'undefined' ? 'sm' : ''}
          >
            {header}
          </Text>
          <IconByName
            size='sm'
            isDisabled={true}
            color={!isOpen || collapsButton ? 'coolGray.400' : 'coolGray.600'}
            name={
              !isOpen || collapsButton
                ? 'ArrowDownSLineIcon'
                : 'ArrowUpSLineIcon'
            }
            {..._icon}
          />
        </HStack>
      </Pressable>

      <PresenceTransition
        visible={isOpen}
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 250
          }
        }}
      >
        <Stack space={2}>
          {isOpen ? children : <React.Fragment />}
        </Stack>
      </PresenceTransition>
    </Box>
  )
}
export default Collapsible
