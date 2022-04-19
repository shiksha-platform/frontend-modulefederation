import React, { useState } from "react";
import {
  Text,
  Box,
  HStack,
  Pressable,
  PresenceTransition,
} from "native-base";
import { IconByName } from "@shiksha/common-lib";


const Collapsible = ({
    header,
    body,
    defaultCollapse,
    isHeaderBold,
    isDisableCollapse,
    onPressFuction,
    collapsButton,
    _icon,
  }) => {
    const [collaps, setCollaps] = useState(defaultCollapse);
  
    return (
      <>
        <Pressable
          onPress={() => {
            if (onPressFuction) {
              onPressFuction();
            }
            if (!isDisableCollapse) {
              setCollaps(!collaps);
            }
          }}
        >
          <Box>
            <HStack alignItems={"center"} justifyContent={"space-between"}>
              <Text
                fontSize={typeof isHeaderBold === "undefined" ? "14px" : ""}
                color="coolGray.400"
                fontWeight="500"
              >
                {header}
              </Text>
              <IconByName
                size="sm"
                isDisabled={true}
                color={
                  !collaps || collapsButton ? "coolGray.400" : "coolGray.600"
                }
                name={
                  !collaps || collapsButton
                    ? "ArrowDownSLineIcon"
                    : "ArrowUpSLineIcon"
                }
                {..._icon}
              />
            </HStack>
          </Box>
        </Pressable>
        <PresenceTransition visible={collaps}>{body}</PresenceTransition>
      </>
    );
  };

  export default Collapsible;