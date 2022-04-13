import React from "react";
import { Text, Box, HStack, VStack } from "native-base";
import { IconByName } from "@shiksha/common-lib";
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
          <Text
            fontSize="16px"
            fontWeight="600"
            {...{
              ...item._text,
              color: item._text?.color,
            }}
          >
            {item.title}
          </Text>
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
        <Text
          fontSize="12px"
          fontWeight="500"
          {...{
            ...item._text,
            color: item._text?.color,
          }}
        >
          {item?.subTitle}
        </Text>
      </VStack>
    </Box>
  );
};

export default renderEventContent;
