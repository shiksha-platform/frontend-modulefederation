import React from "react";
import {
  capture,
  FilterButton,
  H3,
  IconByName,
  Layout,
  Loading,
  telemetryFactory,
  worksheetRegistryService,
  H2,
  overrideColorTheme,
  BodyLarge,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
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
import { worksheetsList } from "./../config/worksheet";
import { useNavigate, useParams } from "react-router-dom";
import manifest from "../manifest.json";
import WorksheetBox from "components/WorksheetBox";
import { defaultInputs } from "config/worksheetConfig";

const sortArray = [
  {
    title: "By Difficulty",
    data: [
      {
        attribute: "difficulty",
        value: "low_high",
        name: "Low to High",
        icon: "ArrowRightUpLineIcon",
      },
      {
        attribute: "difficulty",
        value: "high_low",
        name: "High To Low",
        icon: "ArrowRightDownLineIcon",
      },
    ],
  },
  {
    title: "By Popularity",
    data: [
      {
        attribute: "popularity",
        value: "low_high",
        name: "Low to High",
        icon: "ArrowRightUpLineIcon",
      },
      {
        attribute: "popularity",
        value: "high_low",
        name: "High To Low",
        icon: "ArrowRightDownLineIcon",
      },
    ],
  },
];
import colorTheme from "../colorTheme";

const colors = overrideColorTheme(colorTheme);

export default function Worksheet({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [filterObject, setFilterObject] = React.useState({});
  const [worksheets, setWorksheets] = React.useState([]);
  const [showModalSort, setShowModalSort] = React.useState(false);
  const [sortData, setSortData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  const { state } = useParams();

  React.useState(async () => {
    const params = state
      ? {
          state: { eq: state },
        }
      : {};
    const data = await worksheetRegistryService.getAll(params);
    const filterData = data.filter((e) => e.name);
    setWorksheets(filterData);
    setLoading(false);
  }, []);

  const handleSort = (obejct) => {
    const newSort = { [obejct.attribute]: obejct.value };
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Worksheet-Sort",
      sortType: newSort,
    });
    capture("INTERACT", telemetryData);
    setSortData(newSort);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout
      _header={{
        title: t("List of Worksheets"),
        iconComponent: (
          <Button
            rounded="full"
            colorScheme="button"
            variant="outline"
            bg={colors.primaryLight}
            px={5}
            py={1}
            rightIcon={<IconByName name="ArrowDownSLineIcon" isDisabled />}
            onPress={(e) => setShowModalSort(true)}
          >
            <BodyLarge textTransform="capitalize">{t("SORT")}</BodyLarge>
          </Button>
        ),
      }}
      _appBar={{ languages: manifest.languages }}
      subHeader={t("See all worksheets here")}
      _subHeader={{ bg: colors.cardBg }}
      _footer={footerLinks}
    >
      <FilterButton
        getObject={setFilterObject}
        _box={{ pt: 5, px: 5 }}
        _actionSheet={{ bg: colors.cardBg }}
        _button={{ bg: colors.primaryLight, px: "15px", py: "2" }}
        _filterButton={{
          rightIcon: "",
          bg: "white",
        }}
        resetButtonText={t("COLLAPSE")}
        filters={defaultInputs}
      />
      <VStack>
        <Box bg="white" p="5" mb="4" roundedBottom={"xl"} shadow={2}>
          <Stack>
            <VStack space={3}>
              {worksheets.length > 0 ? (
                worksheets.map((item, index) => {
                  return (
                    <WorksheetBox
                      appName={appName}
                      canShare={true}
                      key={index}
                      {...{ item, url: `/worksheet/${item.id}` }}
                    />
                  );
                })
              ) : (
                <Box
                  p="10"
                  my="5"
                  alignItems={"center"}
                  rounded="lg"
                  bg="viewNotification.600"
                >
                  {t("WORKSHEET_NOT_FOUND")}
                </Box>
              )}
            </VStack>
          </Stack>
        </Box>
      </VStack>
      <Box bg="white" p="5" position="sticky" bottom="84" shadow={2}>
        <Button
          _text={{ color: "white" }}
          p="3"
          onPress={(e) => navigate("/worksheet/create")}
        >
          {t("CREATE_NEW_WORKSHEET")}
        </Button>
      </Box>
      <Actionsheet
        isOpen={showModalSort}
        onClose={() => setShowModalSort(false)}
      >
        <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="25px">
              <H2>{t("SORT")}</H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={colors.primaryDark}
              onPress={(e) => setShowModalSort(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <VStack bg="white" width={"100%"} space="1">
          {sortArray.map((value, index) => (
            <Box key={index}>
              <Box px="5" py="4">
                <H3 color={colors.grayLight}>{value?.title}</H3>
              </Box>
              {value?.data &&
                value.data.map((item, subIndex) => {
                  const isSelected = sortData[item.attribute] === item.value;
                  return (
                    <Pressable
                      key={subIndex}
                      p="5"
                      bg={isSelected ? colors.grayLight : ""}
                      onPress={(e) => handleSort(item)}
                    >
                      <HStack
                        space="2"
                        colorScheme="button"
                        alignItems="center"
                      >
                        <IconByName
                          isDisabled
                          color={isSelected ? colors.primary : ""}
                          name={item.icon}
                        />
                        <Text>{item.name}</Text>
                      </HStack>
                    </Pressable>
                  );
                })}
            </Box>
          ))}
          <Box p="5">
            <Button
              colorScheme="button"
              _text={{ color: "white" }}
              onPress={(e) => setShowModalSort(false)}
            >
              {t("CONTINUE")}
            </Button>
          </Box>
        </VStack>
      </Actionsheet>
    </Layout>
  );
}

const LessonPlans = () => {
  return <h4>LessonPlans</h4>;
};
