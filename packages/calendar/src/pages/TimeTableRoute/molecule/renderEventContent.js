import React from "react";
import { Text, Box, HStack, VStack } from "native-base";
import { IconByName, H2, H4 } from "@shiksha/common-lib";
import "./../../../assets/css/fullCalendar.css";

const renderEventContent = (eventInfo) => {
  let item = {
    ...eventInfo?.event?._def,
    ...eventInfo?.event?._def?.extendedProps,
  };

  return (
    <Box p="4">
      <VStack space={"8px"}>
        <HStack
          justifyContent={"space-between"}
          space="2"
          alignItems={"center"}
        >
          <H2
            fontWeight="600"
            // {...{
            //   ...item._text,
            //   color: item._text?.color,
            // }}
            color={item._text?.color }
          >
            {item.title}
          </H2>
          {item?.rightIcon ? (
            <IconByName
              name={item?.rightIcon}
              isDisabled
              {...{
                ...item._text,
                color: item._text?.color ? item._text?.color : "gray.600",
              }}
            />
          ) : (
            <></>
          )}
        </HStack>
        <H4
          fontSize="12px"
          // {...{
          //   ...item._text,
          //   color: item._text?.color,
          // }}
          color={item._text?.color}
        >
          {item?.subTitle}
        </H4>
      </VStack>
    </Box>
  );
};

export default renderEventContent;
