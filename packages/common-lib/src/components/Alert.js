import { Box, HStack, useToast, VStack, Alert } from 'native-base'
import React from 'react'
import { H3, BodySmall } from './layout/HeaderTags'

export default function AlertComponent({ alert, setAlert }) {
  const toast = useToast()

  React.useEffect(() => {
    if (alert) {
      let title,
        description = null
      let toastElement = {}
      let type = 'primary'
      if (typeof alert === 'object') {
        title = alert?.title
        description = alert?.description
        type = alert?.type?.toLowerCase()
      } else {
        description = alert
      }
      toastElement = {
        render: () => {
          return (
            <Alert
              w='100%'
              variant='outline'
              borderColor={type}
              status={type}
              bg={'white'}
            >
              <VStack w='100%'>
                <HStack space={2} alignItems={'center'}>
                  <Alert.Icon color={type} />
                  {!title ? (
                    <BodySmall color={type}>{description}</BodySmall>
                  ) : (
                    <H3 color={type}>{title}</H3>
                  )}
                </HStack>
                {title ? (
                  <BodySmall color={type}>{description}</BodySmall>
                ) : (
                  <React.Fragment />
                )}
              </VStack>
            </Alert>
          )
        }
      }
      toast.show(toastElement)
      setAlert()
    }
  }, [alert])
  return <React.Fragment />
}
