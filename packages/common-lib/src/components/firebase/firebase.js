import { initializeApp } from 'firebase/app'
//import 'firebase/messaging'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

import { useToast, Pressable, VStack, HStack, Box } from 'native-base'
import Subtitle from '../layout/HeaderTags/Subtitle'
import H1 from '../layout/HeaderTags/H1'
import H4 from '../layout/HeaderTags/H4'
import React from 'react'

const firebaseConfig = {
  apiKey: 'AIzaSyDW2E975sqlALwHA2IwAITVCp95L8N2aS4',
  authDomain: 'demoparesh-3ac16.firebaseapp.com',
  projectId: 'demoparesh-3ac16',
  storageBucket: 'demoparesh-3ac16.appspot.com',
  messagingSenderId: '459963173731',
  appId: '1:459963173731:web:37d934b94b7c05bf912156'
}

initializeApp(firebaseConfig)

const firebaseApp = initializeApp(firebaseConfig)
const messaging = getMessaging(firebaseApp)

const publicKey =
  'BEX47b856ssFWemDHoDRcVoloLdY4fx8v9FUvVgoYabZbJjteLH3KpgrhbG5wHvLyoovUDivC6Tuebzs33wjcVo'

export const getUserToken = async (basePath = '') => {
  if (basePath && basePath !== '') {
    const path = basePath + '/firebase-messaging-sw.js'
    const serviceWorkerRegistration = await navigator.serviceWorker.register(
      path
    )
    return await getToken(messaging, {
      vapidKey: publicKey,
      serviceWorkerRegistration
    })
  } else {
    return await getToken(messaging, {
      vapidKey: publicKey
    })
  }
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload)
    })
  })

export const PushNotification = () => {
  const toast = useToast()
  onMessageListener()
    .then((payload) => {
      toast.show({
        duration: '11000',
        render: () => {
          return (
            <Box
              bg='white'
              borderWidth='1'
              borderColor='#F87558'
              my='2'
              p='5'
              rounded='10'
              flex='1'
            >
              <Pressable onPress={(e) => toast.closeAll()}>
                <VStack space='1'>
                  {/* <Subtitle alignItems='center'>
                    {payload.notification.title}
                  </Subtitle> */}
                  <HStack space='2'>
                    <H1 color='#F87558'>|</H1>
                    <H4>{payload.notification.body}</H4>
                  </HStack>
                </VStack>
              </Pressable>
            </Box>
          )
        },
        placement: 'top'
      })
    })
    .catch((err) => console.log('failed: ', err))
  return <React.Fragment />
}
