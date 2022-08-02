import {
  Actionsheet,
  Avatar,
  Box,
  Button,
  HStack,
  Pressable,
  ScrollView,
  Stack,
  Text,
  Tooltip,
  VStack,
} from "native-base";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { H2, H4, IconByName, overrideColorTheme } from "@shiksha/common-lib";
import colorTheme from "../../colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function SubjectFilterButton({
  getObject,
  _box,
  _button,
  _actionSheet,
}) {
  const { t } = useTranslation();

  const value = {
    name: "Subject",
    attributeName: "subject",
    data: ["Subject1", "Subject2", "Subject3", "Subject4", "Subject5"],
  };

  const [filterData, setFilterData] = React.useState(false);
  const [selectData, setSelectData] = React.useState([]);

  return (
    <Box roundedBottom={"xl"} {..._box}>
      <VStack space={2}>
        <H4>Subject</H4>
        <Button
          rounded="10"
          colorScheme="button"
          variant="outline"
          px="5"
          rightIcon={
            <IconByName
              color={colors.primary}
              name="ArrowDownSLineIcon"
              isDisabled
            />
          }
          onPress={(e) => {
            if (value?.data && value?.data.length > 0) {
              setFilterData(value);
            }
          }}
          {..._button}
        >
          <Text color={colors.primary}>
            {selectData && selectData.length ? selectData[0] : "Subject"}
          </Text>
        </Button>
        <Actionsheet isOpen={filterData} onClose={() => setFilterData()}>
          <Actionsheet.Content
            alignItems={"left"}
            bg={colors.lightGray}
            {..._actionSheet}
          >
            <HStack justifyContent={"space-between"}>
              <Stack p={5} pt={2} pb="15px">
                <H2>{t("Choose Subject")}</H2>
              </Stack>
              <IconByName
                name="CloseCircleLineIcon"
                onPress={(e) => setFilterData()}
                color={colors.primary}
              />
            </HStack>
          </Actionsheet.Content>
          <Box bg={colors.white} width={"100%"} pt={4}>
            <VStack space={4}>
              {filterData?.data &&
                filterData?.data.map((value, index) => (
                  <Actionsheet.Item
                    key={value}
                    onPress={(e) => {
                      setSelectData([value]);
                    }}
                  >
                    {value}
                  </Actionsheet.Item>
                ))}
            </VStack>
            <Box p="5">
              <Button
                colorScheme="button"
                _text={{ color: colors.white }}
                onPress={() => {
                  setFilterData({});
                  if (getObject) getObject(selectData);
                }}
              >
                {t("Done")}
              </Button>
            </Box>
          </Box>
        </Actionsheet>
      </VStack>
    </Box>
  );
}
