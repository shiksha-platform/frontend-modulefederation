import React, { useEffect, useState } from "react";
import {
  PresenceTransition,
  HStack,
  Text,
  Box,
  Pressable,
  Stack
} from "native-base";
import IconByName from "./IconByName";


const Collapsible = ({ header="", children, defaultCollapse=true, isHeaderBold=true }) => {
  const [isOpen, setIsOpen] = useState(false);
  return(

  <Box bg="white" p={4}>
  <Stack space={2}>
      <Pressable onPress={() => setIsOpen(!isOpen)}>
        <Box px={2} py={1}>
            <HStack alignItems={"center"} justifyContent={"space-between"}>
              <Text
                bold={typeof isHeaderBold === "undefined" ? true : isHeaderBold}
                fontSize={typeof isHeaderBold === "undefined" ? "md" : ""}
              >
                {header}
              </Text>
              <IconByName
                size="sm"
                isDisabled={true}
                color={!isOpen ? "coolGray.400" : "coolGray.600"}
                name={!isOpen ? "ArrowDownSLineIcon" : "ArrowUpSLineIcon"}
              />
            </HStack>
          </Box>
      </Pressable>

      <PresenceTransition visible={isOpen} initial={{
      opacity: 0
    }} animate={{
      opacity: 1,
      transition: {
        duration: 250
      }
    }}>
        {isOpen?children: <React.Fragment/>}
      </PresenceTransition>
      
    </Stack>
    </Box>
    );
};
export default Collapsible;