import React from "react";
import { Text, Box, HStack, VStack, Pressable } from "native-base";
import "./../../../assets/css/fullCalendar.css";
import { IconByName } from "@shiksha/common-lib";

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
            <Text
              fontSize="14px"
              fontWeight="600"
              {...inlineEllipsisStyle}
              {...{
                ...item._text,
                color: item._text?.color,
              }}
            >
              {item.title}
            </Text>
            <Text
              fontSize="14px"
              fontWeight="600"
              {...inlineEllipsisStyle}
              {...{
                ...item._text,
                color: item._text?.color,
              }}
            >
              {item.subTitle}
            </Text>
          </HStack>
          <Text
            fontSize="12px"
            fontWeight="500"
            {...inlineEllipsisStyle}
            {...{
              ...item._text,
              color: item._text?.color,
            }}
          >
            {item?.timeText}
          </Text>
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
