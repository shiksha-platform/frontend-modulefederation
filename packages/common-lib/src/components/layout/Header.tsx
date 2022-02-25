import React from "react";
import { HStack, Text, Box, VStack, Avatar } from "native-base";

export default function Header({
  iconComponent,
  headingComponent,
  subHeadingComponent,
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
  let newAvatar = sessionStorage.getItem("firstName");
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
            <Avatar bg="amber.500">
              {newAvatar?.toUpperCase().substr(0, 2)}
              <Avatar.Badge bg="green.500" top="0" />
            </Avatar>
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
