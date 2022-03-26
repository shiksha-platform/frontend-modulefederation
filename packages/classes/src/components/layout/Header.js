import React from "react";
import {
  HStack,
  Text,
  Box,
  VStack,
  Avatar,
  Pressable,
  Image,
} from "native-base";
import IconByName from "../IconByName";

export default function Header({
  iconComponent,
  headingComponent,
  subHeadingComponent,
  setShowModal,
  avatar,
  heading,
  subHeading,
  _box,
  _heading,
  _subHeading,
  title,
  isDisabledHeader,
  fullRightComponent,
}) {
  const myRef = React.useRef(null);
  let newAvatar = localStorage.getItem("firstName");
  let selfAttendance = localStorage.getItem("selfAttendance");
  let cameraUrl = localStorage.getItem("cameraUrl");
  let avatarUrlObject = cameraUrl
    ? {
      source: {
        uri: cameraUrl,
      },
    }
    : {};
  return !isDisabledHeader ? (
    !fullRightComponent ? (
      <Box {..._box} py={7} px={5}>
        <HStack justifyContent="space-between" alignItems="center">
          <VStack>
            {subHeadingComponent ? (
              subHeadingComponent
            ) : (
                <Text fontSize="12px" {..._subHeading}>
                  {subHeading}
                </Text>
              )}
            {headingComponent ? (
              headingComponent
            ) : (
                <Text bold fontSize="24px" {..._heading}>
                  {title ? title : heading}
                </Text>
              )}
          </VStack>
          {iconComponent ? (
            iconComponent
          ) : avatar ? (
            <>
              <Pressable onPress={(e) => setShowModal(true)}>
                {cameraUrl && selfAttendance ? (
                  <Image
                    ref={myRef}
                    {...avatarUrlObject}
                    rounded="lg"
                    alt="Profile"
                    size="50px"
                  />
                ) : (
                    <Avatar bg="amber.500" rounded="lg">
                      {newAvatar?.toUpperCase().substr(0, 2)}
                    </Avatar>
                  )}
                {selfAttendance ? (
                  <IconByName
                    name="CheckboxCircleFillIcon"
                    isDisabled
                    color="present.500"
                    position="absolute"
                    bottom="-5px"
                    right="-5px"
                    bg="white"
                    rounded="full"
                  />
                ) : (
                    ""
                  )}
              </Pressable>
            </>
          ) : (
                <></>
              )}
        </HStack>
      </Box>
    ) : (
        fullRightComponent
      )
  ) : (
      <></>
    );
}
