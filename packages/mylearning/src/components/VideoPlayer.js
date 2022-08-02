import { H2, IconByName, overrideColorTheme } from "@shiksha/common-lib";
import { Box, HStack, Slider } from "native-base";
import React from "react";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function VideoPlayer({ url }) {
  const videoElement = React.useRef();
  const [showControls, setShowControls] = React.useState(true);
  const [showVolume, setShowVolume] = React.useState(false);
  const [playerState, setPlayerState] = React.useState({
    isPlaying: false,
    progress: 0,
    speed: 1,
    isMuted: false,
    currentTime: "",
    duration: "",
    volume: 100,
  });
  var newdat = "";

  const toggleControls = (delay = 5) => {
    setShowControls(true);
    clearTimeout(newdat);
    newdat = setTimeout((e) => {
      setShowControls(false);
    }, delay * 1000);
  };

  const toggleShowVolume = (delay = 5) => {
    setShowVolume(true);
    clearTimeout(newdat);
    newdat = setTimeout((e) => {
      setShowVolume(false);
    }, delay * 1000);
  };

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
    });
    toggleControls();
  };

  React.useEffect(() => {
    playerState.isPlaying
      ? videoElement.current.play()
      : videoElement.current.pause();
  }, [playerState.isPlaying, videoElement]);

  const handleOnTimeUpdate = () => {
    setPlayerState({
      ...playerState,
      progress: getProgressBar(),
      currentTime: gettimeFormate(videoElement?.current?.currentTime),
    });
  };
  const onloadedData = () => {
    setPlayerState({
      ...playerState,
      duration: gettimeFormate(videoElement?.current?.duration),
    });
  };

  const handleVideoProgress = (event) => {
    const manualChange = Number(
      event?.target?.value ? event?.target?.value : event
    );
    videoElement.current.currentTime =
      (videoElement.current.duration / 100) * manualChange;
    setPlayerState({
      ...playerState,
      progress: manualChange,
    });
  };

  const handleVolume = (event) => {
    const manualChange = Number(
      event?.target?.value ? event?.target?.value : event
    );

    if (videoElement?.current?.volume) {
      videoElement.current.volume = manualChange / 100;
      setPlayerState({
        ...playerState,
        volume: manualChange,
      });
    }
  };

  const handleVideoSpeed = (event) => {
    const speed = Number(event?.target?.value ? event?.target?.value : event);
    videoElement.current.playbackRate = speed;
    setPlayerState({
      ...playerState,
      speed,
    });
  };

  const toggleMute = () => {
    setPlayerState({
      ...playerState,
      isMuted: !playerState.isMuted,
    });
  };

  function openFullscreen() {
    const elem = videoElement?.current;
    if (elem?.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem?.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem?.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  }
  const getProgressBar = () => {
    return (
      (videoElement.current.currentTime / videoElement.current.duration) * 100
    );
  };

  const gettimeFormate = (time) => {
    if (time) {
      const s = String(parseInt(time % 60)).padStart(2, "0");
      const m = String(parseInt((time / 60) % 60)).padStart(2, "0");
      return `${m}:${s}`;
    } else {
      return "00:00";
    }
  };

  React.useEffect(() => {
    playerState.isMuted
      ? (videoElement.current.muted = true)
      : (videoElement.current.muted = false);
  }, [playerState.isMuted, videoElement]);

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <video
        src={url}
        ref={videoElement}
        onTimeUpdate={handleOnTimeUpdate}
        onLoadedData={onloadedData}
        onClick={(e) => toggleControls()}
        width="100%"
        height="100%"
      />
      {showControls ? (
        <>
          <Box bg={"rgba(0, 0, 0, 0.6)"} position="absolute" rounded={"full"}>
            <IconByName
              onPress={togglePlay}
              name={!playerState.isPlaying ? "PlayFillIcon" : "PauseFillIcon"}
              color={colors.white}
            />
          </Box>
          <Box
            bg={"rgba(0, 0, 0, 0.4)"}
            width="100%"
            position="absolute"
            bottom={0}
          >
            <HStack
              justifyContent="space-between"
              width="100%"
              flex={1}
              space="2"
              px="4"
            >
              <HStack justifyContent="space-between" flex={1 / 2} space="2">
                <IconByName
                  onPress={(e) =>
                    showVolume ? toggleMute() : toggleShowVolume()
                  }
                  name={
                    playerState.isMuted
                      ? "VolumeMuteLineIcon"
                      : playerState.volume > 50
                      ? "VolumeUpLineIcon"
                      : "VolumeDownLineIcon"
                  }
                  color={colors.white}
                />
                {showVolume ? (
                  <Slider
                    flex={1}
                    w="auto"
                    value={playerState.isMuted ? 0 : playerState.volume}
                    onChange={(e) => handleVolume(e)}
                    onChangeEnd={(v) => {
                      v && handleVolume(Math.floor(v));
                    }}
                    step="1"
                  >
                    <Slider.Track bg={colors.gray} size="3px">
                      <Slider.FilledTrack bg={colors.white} />
                    </Slider.Track>
                    <Slider.Thumb bg={colors.white} size="14px" />
                  </Slider>
                ) : (
                  <React.Fragment />
                )}
              </HStack>

              <IconByName
                onPress={openFullscreen}
                name={"FullscreenLineIcon"}
                color={colors.white}
              />
            </HStack>
            <HStack
              justifyContent="space-between"
              width="100%"
              flex={1}
              space="2"
              px="4"
            >
              <H2 color={colors.white}>
                {playerState?.currentTime ? playerState?.currentTime : "00:00"}
              </H2>
              <Slider
                step="1"
                flex={1}
                w="auto"
                value={playerState.progress}
                onChange={(e) => handleVideoProgress(e)}
                onChangeEnd={(v) => {
                  v && handleVideoProgress(Math.floor(v));
                }}
              >
                <Slider.Track bg={colors.white} size="3px">
                  <Slider.FilledTrack bg={colors.primary} />
                </Slider.Track>
                <Slider.Thumb bg={colors.primary} size="14px" />
              </Slider>
              <H2 color={colors.white}>
                {playerState?.duration ? playerState?.duration : "00:00"}
              </H2>
            </HStack>
          </Box>
        </>
      ) : (
        <React.Fragment />
      )}
    </Box>
  );
}
