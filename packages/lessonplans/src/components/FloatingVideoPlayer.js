import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { stopVideoPlayer } from "actions/layout";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { Box } from "native-base";
import { IconByName } from "@shiksha/common-lib";
import VideoPlayer from "./VideoPlayer";

const FloatingVideoPlayer = (url, show) => {
    const [showVideo, setShowVideo] = useState(false)

    return (
        <Box>
            {showVideo && (<Draggable handle=".handle">
                <Box className="custom-youtube-player">
                    <ResizableBox width={450} height={300}>
                        <VideoPlayer url={"http://techslides.com/demos/sample-videos/small.mp4"} />
                        <Box>
                            <IconByName
                                size='sm'
                                name='CloseCircleLineIcon'
                                color={color ? color : ''}
                                onPress={(e) => console.log(e)}
                            />
                        </Box>
                        <Box>
                            <IconByName
                                size='sm'
                                name='DragMove2LineIcon'
                                color={color ? color : ''}
                                onPress={(e) => console.log(e)}
                            />
                        </Box>
                    </ResizableBox>
                </Box>
            </Draggable>)}
        </Box>
    );
};

export default FloatingVideoPlayer;