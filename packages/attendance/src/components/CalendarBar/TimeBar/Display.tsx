// Lib
import * as React from "react";
import { Box, HStack, Text, useToast } from "native-base";
import { IconByName } from "@shiksha/common-lib";

// Misc
import { colors, colorTheme } from "utils/functions/ColorTheme";

// Display Helper
export const Display: React.FC<any> = ({
  children,
  activeColor,
  page,
  setPage,
  nextDisabled,
  previousDisabled,
  rightErrorText,
  leftErrorText,
  _box,
}) => {
  const toast = useToast();
  return (
    <Box bg="white" p="1" {..._box}>
      <HStack justifyContent="space-between" alignItems="center" space={4}>
        <HStack space="4" alignItems="center">
          {
            // @ts-ignore
            <IconByName
              size="50"
              color={
                typeof previousDisabled === "undefined" ||
                previousDisabled === false
                  ? activeColor
                    ? activeColor
                    : colors.primary
                  : // @ts-ignore
                    colors.grayInLight
              }
              name="ArrowLeftSLineIcon"
              onPress={(e) => {
                if (leftErrorText) {
                  toast.show(leftErrorText);
                } else if (
                  typeof previousDisabled === "undefined" ||
                  previousDisabled === false
                ) {
                  setPage(page - 1);
                }
              }}
            />
          }
        </HStack>
        <HStack space="4" alignItems="center">
          <Text fontSize="md" bold>
            {children}
          </Text>
        </HStack>
        <HStack space="2">
          {
            // @ts-ignore
            <IconByName
              size="50"
              color={
                typeof nextDisabled === "undefined" || nextDisabled === false
                  ? activeColor
                    ? activeColor
                    : colorTheme.gray
                  : colorTheme.grayIndark
              }
              name="ArrowRightSLineIcon"
              onPress={(e) => {
                if (rightErrorText) {
                  toast.show(rightErrorText);
                } else if (
                  typeof nextDisabled === "undefined" ||
                  nextDisabled === false
                ) {
                  setPage(page + 1);
                }
              }}
            />
          }
        </HStack>
      </HStack>
    </Box>
  );
};
