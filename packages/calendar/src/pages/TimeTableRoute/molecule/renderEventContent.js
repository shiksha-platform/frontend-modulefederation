import React from "react";

import { Text, Box, HStack, VStack, Pressable } from "native-base";
import { IconByName, H2, H4, H3 } from "@shiksha/common-lib";
import "./../../../assets/css/fullCalendar.css";

const renderEventContent = ({
  showModal,
  setShowModal,
  setShowModalClash,
  ...eventInfo
}) => {
  let item = {
    ...eventInfo?.event?._def,
    ...eventInfo?.event?._def?.extendedProps,
    timeText: eventInfo?.timeText,
  };

  const inlineEllipsisStyle = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  return (
    <Box p="4" {...inlineEllipsisStyle}>
      <Pressable onPress={(e) => setShowModal()}>
        <VStack space={"8px"}>
          <HStack
            justifyContent={"space-between"}
            space="2"
            alignItems={"center"}
          >
            <H2
              fontWeight="600"
              {...inlineEllipsisStyle}
              {...{
                ...item._text,
                color: item._text?.color,
              }}
              color={item._text?.color}
            >
              {item.title}
            </H2>
            <H3
              fontWeight="600"
              {...inlineEllipsisStyle}
              {...{
                ...item._text,
                color: item._text?.color,
              }}
            >
              {item.subTitle}
            </H3>
          </HStack>
          <H4
            fontWeight="500"
            {...inlineEllipsisStyle}
            {...{
              ...item._text,
              color: item._text?.color,
            }}
          >
            {item?.timeText}
          </H4>
        </VStack>
      </Pressable>
      <IconByName
        size="sm"
        name="FlashlightLineIcon"
        colorScheme="timeTableFlashIcon"
        variant="solid"
        rounded="full"
        _icon={{
          style: {
            fill: "white",
          },
        }}
        right="0"
        bottom="0"
        position="absolute"
        onPress={(e) => setShowModalClash()}
      />
    </Box>
  );
};

export default renderEventContent;
