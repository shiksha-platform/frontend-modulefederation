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
  SearchLayout,
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

const newDefaultInputs = defaultInputs.map((e) => {
  return {
    ...e,
    ["attributeName"]: ["gradeLevel"].includes(e.attributeName)
      ? "grade"
      : e.attributeName,
    ["type"]: "sting",
  };
});

const colors = overrideColorTheme(colorTheme);

export default function Worksheet({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [filterObject, setFilterObject] = React.useState({});
  const [worksheets, setWorksheets] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState(true);
  const [searchState, setSearchState] = React.useState(false);
  const [showModalSort, setShowModalSort] = React.useState(false);
  const { state } = useParams();

  React.useEffect(async () => {
    let params = state
      ? {
          state: { eq: state },
        }
      : {};

    const arr = Object.keys(filterObject);
    arr.forEach((attr) => {
      params =
        filterObject[attr] && filterObject[attr] !== ""
          ? { ...params, [attr]: { eq: filterObject[attr] } }
          : params;
    });

    const data = await worksheetRegistryService.getAll(params);
    let filterData = [];
    if (search && search.length >= 3 && searchState) {
      filterData = data.filter((e) =>
        e.name.toLowerCase().startsWith(search.toLowerCase())
      );
    } else {
      filterData = data.filter((e) => e.name);
    }
    setWorksheets(filterData);
    setLoading(false);
  }, [filterObject, search.length >= 3, searchState]);

  if (loading) {
    return <Loading />;
  }

  if (searchState) {
    return (
      <SearchLayout
        {...{
          search,
          setSearch,
          minStringLenght: 3,
          notFoundMessage: t("TYPE_TO_START_SEARCHING_WORKSHEETS"),
          onCloseSearch: setSearchState,
        }}
      >
        <ChildrenWorksheet
          {...{ worksheets, isHideCreateButton: true, setFilterObject }}
        />
      </SearchLayout>
    );
  }

  return (
    <Layout
      _header={{
        title: t("All Worksheets"),
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
            <BodyLarge textTransform="capitalize" color={colors.primary}>
              {t("SORT")}
            </BodyLarge>
          </Button>
        ),
      }}
      _appBar={{
        languages: manifest.languages,
        isEnableSearchBtn: true,
        setSearch,
        setSearchState,
      }}
      subHeader={<H2>{t("View all your worksheets")}</H2>}
      _subHeader={{ bg: colors.cardBg }}
      _footer={footerLinks}
    >
      <ChildrenWorksheet
        {...{
          worksheets,
          setFilterObject,
          showModalSort,
          setShowModalSort,
          appName,
        }}
      />
    </Layout>
  );
}

const ChildrenWorksheet = ({
  worksheets,
  isHideCreateButton,
  setFilterObject,
  showModalSort,
  setShowModalSort,
  appName,
}) => {
  const { t } = useTranslation();

  const [sortData, setSortData] = React.useState();
  const navigate = useNavigate();
  const { state } = useParams();

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

  const handleFilter = (obejct) => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Worksheet-Filter",
      filterObject: obejct,
    });
    capture("INTERACT", telemetryData);
    setFilterObject(obejct);
  };

  return (
    <Stack>
      <FilterButton
        getObject={handleFilter}
        _box={{ pt: 5, px: 5 }}
        _actionSheet={{ bg: colors.cardBg }}
        _button={{ bg: colors.primaryLight, px: "15px", py: "2" }}
        _filterButton={{
          rightIcon: "",
          bg: colors.white,
          color: colors.primary,
        }}
        resetButtonText={t("COLLAPSE")}
        color={colors.primary}
        filters={newDefaultInputs}
      />
      <VStack>
        <Box bg={colors.white} p="5" mb="4" roundedBottom={"xl"} shadow={2}>
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
                  bg={colors.viewNotificationDark}
                >
                  {t("WORKSHEET_NOT_FOUND")}
                </Box>
              )}
            </VStack>
          </Stack>
        </Box>
      </VStack>
      {!isHideCreateButton ? (
        <Box bg={colors.white} p="5" position="sticky" bottom="84" shadow={2}>
          <Button
            _text={{ color: colors.white }}
            p="3"
            onPress={(e) => navigate("/worksheet/create")}
          >
            {t("CREATE_NEW_WORKSHEET")}
          </Button>
          <Actionsheet
            isOpen={showModalSort}
            onClose={() => setShowModalSort(false)}
          >
            <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
              <HStack justifyContent={"space-between"}>
                <Stack p={5} pt={2} pb="15px">
                  <H2>{t("SORT")}</H2>
                </Stack>
                <IconByName
                  name="CloseCircleLineIcon"
                  color={colors.cardCloseIcon}
                  onPress={(e) => setShowModalSort(false)}
                />
              </HStack>
            </Actionsheet.Content>
            <VStack bg={colors.white} width={"100%"} space="1">
              {sortArray.map((value, index) => (
                <Box key={index}>
                  <Box px="5" py="4">
                    <H3 color={colors.grayLight}>{value?.title}</H3>
                  </Box>
                  {value?.data &&
                    value.data.map((item, subIndex) => {
                      const isSelected =
                        sortData?.[item.attribute] &&
                        sortData[item.attribute] === item.value;
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
                  _text={{ color: colors.white }}
                  onPress={(e) => setShowModalSort(false)}
                >
                  {t("CONTINUE")}
                </Button>
              </Box>
            </VStack>
          </Actionsheet>
        </Box>
      ) : (
        <React.Fragment />
      )}
    </Stack>
  );
};

const LessonPlans = () => {
  return <h4>LessonPlans</h4>;
};
