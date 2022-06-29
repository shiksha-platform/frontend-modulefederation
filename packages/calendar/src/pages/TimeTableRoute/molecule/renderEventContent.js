import React from "react";
import { Text, Box, HStack, VStack, Pressable } from "native-base";
import { IconByName, H2, H4, H3 } from "@shiksha/common-lib";
import "./../../../assets/css/fullCalendar.css";

const renderEventContent = ({
  showModal,
  setShowModal,
  setShowModalClash,
  isCompare,
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
    <Box p="10px" {...inlineEllipsisStyle}>
      <Pressable onPress={(e) => setShowModal()}>
        <VStack space={"8px"}>
          <HStack
            justifyContent={"space-between"}
            space="2"
            alignItems={"center"}
          >
            <Text
              fontWeight="600"
              {...inlineEllipsisStyle}
              {...{
                ...item._text,
                color: item._text?.color,
              }}
              color={item._text?.color}
            >
              {item.title}
            </Text>
            <Text
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
            fontWeight="400"
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
      {!isCompare ? (
        <IconByName
          size="sm"
          name="FlashlightLineIcon"
          colorScheme={item.activeMenu ? "emerald" : "timeTableFlashIcon"}
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
      ) : (
        <></>
      )}
    </Box>
  );
};

export default renderEventContent;
