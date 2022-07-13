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
  capture,
  telemetryFactory,
  BodyLarge,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import colorTheme from "../../colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function SortActionsheet({ appName, sortArray, setSortData }) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = React.useState(false);
  const [sortObject, setSortObject] = React.useState({});

  const handleSort = (obejct) => {
    const newSort = { ["name"]: obejct };
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Worksheet-Sort",
      sortType: newSort,
    });
    capture("INTERACT", telemetryData);
    setSortObject(newSort);
  };

  const handalClose = () => {
    setSortData(sortObject);
    setShowModal(false);
  };

  return (
    <Box>
      <Button
        rounded="full"
        colorScheme="button"
        variant="outline"
        bg={colors.primaryLight}
        px={5}
        py={1}
        rightIcon={<IconByName name="ArrowDownSLineIcon" isDisabled />}
        onPress={(e) => setShowModal(true)}
      >
        <BodyLarge textTransform="capitalize">{t("SORT")}</BodyLarge>
      </Button>
      <Actionsheet isOpen={showModal} onClose={() => setShowModal(false)}>
        <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="25px">
              <H2>{t("SORT")}</H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={colors.primaryDark}
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
                  bg={isSelected ? colors.grayLight : ""}
                  onPress={(e) => handleSort(item)}
                >
                  <HStack space="2" colorScheme="button" alignItems="center">
                    <IconByName
                      isDisabled
                      color={isSelected ? colors.primary : ""}
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
              onPress={handalClose}
            >
              {t("CONTINUE")}
            </Button>
          </Box>
        </VStack>
      </Actionsheet>
    </Box>
  );
}
