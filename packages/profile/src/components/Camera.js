import {
  IconByName,
  Subtitle,
  useWindowSize,
  overrideColorTheme,
} from "@shiksha/common-lib";
import { Box, HStack, Image, VStack } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import Webcam from "react-webcam";
import colorTheme from "../colorTheme";

const colors = overrideColorTheme(colorTheme);

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
  const [cameraWidth, setCameraWidth] = React.useState();

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
    setCameraWidth(topElement?.current?.clientWidth);
    setCameraHeight(newHeight);
  });

  if (cameraModal) {
    return (
      <Box alignItems={"center"}>
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
                  color={colors.white}
                  _icon={{
                    size: "30px",
                  }}
                />
              ) : (
                ""
              )}
              <IconByName
                name="CloseCircleLineIcon"
                color={colors.white}
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
              {...{
                height: cameraHeight,
                width: cameraWidth,
              }}
              videoConstraints={{
                facingMode: "user",
                ...{
                  height: cameraHeight,
                  width: cameraWidth,
                },
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
                  color={colors.white}
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
                  color={colors.white}
                  _icon={{
                    size: "60px",
                  }}
                  onPress={(e) => capture()}
                />

                <Subtitle color={colors.white}>{t("CAPTURE")}</Subtitle>
              </VStack>
              {!cameraUrl ? (
                <IconByName
                  name="CameraSwitchLineIcon"
                  color={colors.white}
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
      </Box>
    );
  }

  return <></>;
}
