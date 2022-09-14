import React, { useState } from 'react'
import Draggable from 'react-draggable'
import 'react-resizable/css/styles.css'
import { Box, HStack } from 'native-base'
import IconByName from '../IconByName'
import VideoPlayer from './VideoPlayer'

const FloatingVideoPlayer = ({ link = '', show = true }) => {
  const [showVideo, setShowVideo] = useState(show)
  const [url, setUrl] = useState(link)

  const handleOnClose = () => {
    setShowVideo(false)
    setUrl('')
  }

  return (
    <Box>
      {showVideo && (
        <Draggable>
          <Box position='sticky' bottom='85' maxH='200px' maxW='300px'>
            <HStack>
              <Box>
                <IconByName
                  size='sm'
                  name='CloseCircleLineIcon'
                  //color={color ? color : ''}
                  onPress={(e) => handleOnClose()}
                />
              </Box>
            </HStack>
            <VideoPlayer
              url={'http://techslides.com/demos/sample-videos/small.mp4'}
            />
          </Box>
        </Draggable>
      )}
    </Box>
  )
}

export default FloatingVideoPlayer
