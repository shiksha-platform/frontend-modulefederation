import React, { useState } from "react";
import Draggable from "react-draggable";
import "react-resizable/css/styles.css";
import { Box, HStack } from "native-base";
import { IconByName } from "@shiksha/common-lib";
import VideoPlayer from "./VideoPlayer";

const FloatingVideoPlayer = (url, show) => {
  const [showVideo, setShowVideo] = useState(true);

  const handleOnClose = () => {
    setShowVideo(false);
  };

  return (
    <Box>
      {showVideo && (
        <Draggable>
          <Box position="sticky" bottom="85" maxH="200px" maxW="300px">
            <HStack>
              <Box>
                <IconByName
                  size="sm"
                  name="CloseCircleLineIcon"
                  //color={color ? color : ''}
                  onPress={(e) => handleOnClose()}
                />
              </Box>
            </HStack>
            <VideoPlayer
              url={"http://techslides.com/demos/sample-videos/small.mp4"}
            />
          </Box>
        </Draggable>
      )}
    </Box>
  );
};

export default FloatingVideoPlayer;
