import { IconByName, useWindowSize } from "@shiksha/common-lib";
import { Box, HStack, Image, Text, VStack } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import Webcam from "react-webcam";

export default function Camera({
  cameraModal,
  setCameraModal,
  cameraUrl,
  setCameraUrl,
}) {
  const webcamRef = React.useRef(null);
  const [width, height] = useWindowSize();
  const { t } = useTranslation();
  const topElement = React.useRef(null);
  const bottomElement = React.useRef(null);
  const [cameraHeight, setCameraHeight] = React.useState();
  const myRef = React.useRef(null);

  const capture = () => {
    setCameraUrl(webcamRef.current.getScreenshot());
  };

  React.useEffect(() => {
    let newHeight =
      height -
      ((topElement?.current?.clientHeight
        ? topElement?.current?.clientHeight
        : 0) +
        (bottomElement?.current?.clientHeight
          ? bottomElement?.current?.clientHeight
          : 0));
    setCameraHeight(newHeight);
  });

  if (cameraModal) {
    return (
      <Box position="fixed" zIndex={100} {...{ width, height }} bg="gray.900">
        <Box p="20px" ref={topElement}>
          <HStack
            space={4}
            justifyContent="space-between"
            flex={1}
            alignItems="center"
          >
            {!cameraUrl ? (
              <IconByName
                name="Settings4LineIcon"
                color="white"
                _icon={{
                  size: "30px",
                }}
              />
            ) : (
              ""
            )}
            <IconByName
              name="CloseCircleLineIcon"
              color="white"
              _icon={{
                size: "30px",
              }}
              onPress={(e) => {
                if (cameraUrl) {
                  setCameraUrl();
                } else {
                  setCameraModal(false);
                }
              }}
            />
          </HStack>
        </Box>
        {cameraUrl ? (
          <Image
            {...{ width, height: cameraHeight }}
            source={{
              uri: cameraUrl,
            }}
          />
        ) : (
          <Webcam
            mirrored="true"
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            {...{ width, height: cameraHeight }}
            videoConstraints={{
              facingMode: "user",
              ...{ width, height: cameraHeight },
            }}
          />
        )}
        <Box p="30px" ref={bottomElement}>
          <HStack
            space={4}
            justifyContent="space-around"
            flex={1}
            alignItems="center"
          >
            {!cameraUrl ? (
              <IconByName
                name="FlashlightLineIcon"
                color="white"
                _icon={{
                  size: "30px",
                }}
              />
            ) : (
              ""
            )}
            <VStack alignItems="center">
              <IconByName
                name={
                  !cameraUrl
                    ? "CheckboxBlankCircleLineIcon"
                    : "CheckboxCircleLineIcon"
                }
                color="white"
                _icon={{
                  size: "60px",
                }}
                onPress={(e) => capture()}
              />

              <Text color="white" fontSize="12" fontWeight="600">
                {t("CAPTURE")}
              </Text>
            </VStack>
            {!cameraUrl ? (
              <IconByName
                name="CameraSwitchLineIcon"
                color="white"
                _icon={{
                  size: "30px",
                }}
              />
            ) : (
              ""
            )}
          </HStack>
        </Box>
      </Box>
    );
  }

  return <></>;
}
