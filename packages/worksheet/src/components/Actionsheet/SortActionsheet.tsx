// Lib
import React from "react";
import {
  Actionsheet,
  Box,
  Button,
  HStack,
  Pressable,
  Stack,
  Text,
  VStack,
} from "native-base";

import {
  H2,
  IconByName,
  overrideColorTheme,
  BodyLarge,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";

// Utils
import sortSheet from "utils/functions/SortSheet";
import colorTheme from "../../colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function SortActionsheet({ appName, sortArray, setSortData }) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = React.useState(false);
  const [sortObject, setSortObject] = React.useState({});

  const handleClose = () => {
    setSortData(sortObject);
    setShowModal(false);
  };
  const handleSort = (object) => {
    setSortObject(sortSheet(object, appName));
  };
  return (
    <Box>
      <Button
        rounded="full"
        colorScheme="button"
        variant="outline"
        bg={"worksheet.primaryLight"}
        px={5}
        py={1}
        rightIcon={
          <IconByName _icon={{}} name="ArrowDownSLineIcon" isDisabled />
        }
        // @ts-ignore
        onPress={(e) => setShowModal(true)}
      >
        <BodyLarge textTransform="capitalize">{t("SORT")}</BodyLarge>
      </Button>
      <Actionsheet isOpen={showModal} onClose={() => setShowModal(false)}>
        <Actionsheet.Content alignItems={"left"} bg={"worksheet.cardBg"}>
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="25px">
              <H2>{t("SORT")}</H2>
            </Stack>
            <IconByName
              _icon={{}}
              name="CloseCircleLineIcon"
              color={"worksheet.primaryDark"}
              onPress={(e) => setShowModal(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <VStack bg="white" width={"100%"} space="1">
          {sortArray &&
            sortArray.map((item, index) => {
              const isSelected = sortObject?.["name"] === item;
              return (
                <Pressable
                  key={index}
                  p="5"
                  bg={isSelected ? "worksheet.lightGray2" : ""}
                  // @ts-ignore
                  onPress={(e) => handleSort(item)}
                >
                  {/*@ts-ignore */}
                  <HStack space="2" colorScheme="button" alignItems="center">
                    <IconByName
                      _icon={{}}
                      isDisabled
                      color={isSelected ? "worksheet.primary" : ""}
                      name={
                        item === "low-to-high"
                          ? "ArrowRightUpLineIcon"
                          : "ArrowRightDownLineIcon"
                      }
                    />
                    <Text>{item}</Text>
                  </HStack>
                </Pressable>
              );
            })}
          <Box p="5">
            <Button
              colorScheme="button"
              _text={{ color: "white" }}
              // @ts-ignore
              onPress={handleClose}
            >
              {t("CONTINUE")}
            </Button>
          </Box>
        </VStack>
      </Actionsheet>
    </Box>
  );
}
