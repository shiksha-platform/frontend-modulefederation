import { initializeApp } from 'firebase/app'
//import 'firebase/messaging'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { useToast, Pressable, VStack, HStack, Box } from 'native-base'
import Subtitle from '../layout/HeaderTags/Subtitle'
import H1 from '../layout/HeaderTags/H1'
import H4 from '../layout/HeaderTags/H4'
import React from 'react'

const firebaseConfig = {
  apiKey: 'AIzaSyCnIWbUvAk2dhkxDGZiaTnU95JXYQX-G7g',
  authDomain: 'shiksha-d8cb0.firebaseapp.com',
  projectId: 'shiksha-d8cb0',
  storageBucket: 'shiksha-d8cb0.appspot.com',
  messagingSenderId: '941486633409',
  appId: '1:941486633409:web:c5183689f3e0ab2e90bf40',
  measurementId: 'G-S69RMSE553'
}

initializeApp(firebaseConfig)

const firebaseApp = initializeApp(firebaseConfig)
const messaging = getMessaging(firebaseApp)

const publicKey =
  'BFls0-nyyXAB7s9cuDx42ROIIoLD-N_pby0lh3clKxHgpsRdZtLpNRFD_n5Y5crh8o_6yiGPXgG60stW1xel2Hg'

export const getUserToken = async (basePath = '') => {
  try {
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
  } catch (e) {
    console.log(e, 'Error')
    return ''
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
