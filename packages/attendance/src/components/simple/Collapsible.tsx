// Lib
import * as React from "react";
import { Pressable, Box, HStack, Text, PresenceTransition } from "native-base";
import { IconByName } from "@shiksha/common-lib";

// Utils
import { colorTheme } from "utils/functions/ColorTheme";

export const Collapsible = ({
  header,
  body,
  defaultCollapse,
  isHeaderBold,
  onPressFuction,
}) => {
  const [collaps, setCollaps] = React.useState(defaultCollapse);
  return (
    <>
      <Pressable
        // @ts-ignore
        onPress={() => {
          setCollaps(!collaps);
          onPressFuction();
        }}
      >
        <Box px={2} py={1}>
          <HStack alignItems={"center"} justifyContent={"space-between"}>
            <Text
              bold={typeof isHeaderBold === "undefined" ? true : isHeaderBold}
              fontSize={typeof isHeaderBold === "undefined" ? "md" : ""}
            >
              {header}
            </Text>
            <IconByName
              size="50"
              isDisabled={true}
              color={
                !collaps ? colorTheme.grayInLight : colorTheme.coolGraylight
              }
              name={!collaps ? "ArrowDownSLineIcon" : "ArrowUpSLineIcon"}
              _icon={{}}
            />
          </HStack>
        </Box>
      </Pressable>
      <PresenceTransition visible={collaps}>{body}</PresenceTransition>
    </>
  );
};
