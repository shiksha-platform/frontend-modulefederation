import React from "react";
import { HStack, Text, Stack, Box, VStack } from "native-base";
import Icon from "./IconByName";

export default function Header({
  iconComponent,
  headingComponent,
  subHeadingComponent,
  icon,
  heading,
  subHeading,
  _box,
  _heading,
  _subHeading,
  _icon,
}) {
  return (
    <Stack space={1}>
      <Box p="2" bg="black" {..._box}>
        <HStack justifyContent="space-between" alignItems="center">
          <HStack space="4" alignItems="center">
            {iconComponent ? (
              iconComponent
            ) : (
              <Icon
                p="0"
                name={icon}
                color="white"
                {..._icon}
                _icon={{
                  style: { fontSize: "45px" },
                }}
              />
            )}
            <VStack>
              {headingComponent ? (
                headingComponent
              ) : (
                <Text color="coolGray.100" bold fontSize="md" {..._heading}>
                  {heading}
                </Text>
              )}
              {subHeadingComponent ? (
                subHeadingComponent
              ) : (
                <Text color="coolGray.50" fontSize="xs" {..._subHeading}>
                  {subHeading}
                </Text>
              )}
            </VStack>
          </HStack>
        </HStack>
      </Box>
    </Stack>
  );
}
