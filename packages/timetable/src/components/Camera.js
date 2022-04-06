import { Box, Button, HStack, Image, Text, VStack } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Webcam from "react-webcam";
import { useWindowSize } from "../components/helper";
import IconByName from "./IconByName";

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
  const [done, setDone] = React.useState();
  const myRef = React.useRef(null);

  const capture = React.useCallback(() => {
    setCameraUrl(webcamRef.current.getScreenshot());
  }, [webcamRef]);

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

  if (done) {
    return (
      <Box
        position="fixed"
        zIndex={100}
        {...{ width, height }}
        bg="white"
        justifyContent="center"
        p="5"
      >
        <VStack space="55px" alignItems="center">
          <Image
            ref={myRef}
            source={{
              uri: cameraUrl,
            }}
            rounded="full"
            alt="Profile"
            size="250px"
          />
          <VStack space="3" alignItems="center">
            <IconByName
              name="CheckboxCircleLineIcon"
              color="present.500"
              _icon={{
                size: "47px",
              }}
            />
            <Text fontSize="24" fontWeight="600" color="present.500">
              {t("ATTENDANCE_MARKED")}
            </Text>
            <Text fontSize="14" fontWeight="400" textAlign="center">
              {t("YOU_SUCCESS_UPLOAD_IMAGE_ATTENDANCE")}
            </Text>
          </VStack>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button _text={{ color: "white" }}>{t("BACK_TO_HOME")}</Button>
          </Link>
        </VStack>
      </Box>
    );
  }

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
                onPress={(e) => {
                  if (cameraUrl) {
                    setDone(true);
                    localStorage.setItem("cameraUrl", cameraUrl);
                  } else {
                    capture();
                  }
                }}
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
