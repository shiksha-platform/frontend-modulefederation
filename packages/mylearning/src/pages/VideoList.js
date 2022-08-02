import React from "react";
import {
  capture,
  FilterButton,
  H3,
  IconByName,
  Layout,
  Loading,
  telemetryFactory,
  H2,
  overrideColorTheme,
  BodyLarge,
  SearchLayout,
  BodySmall,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import {
  Actionsheet,
  Box,
  Button,
  HStack,
  Pressable,
  ScrollView,
  Stack,
  Text,
  VStack,
} from "native-base";
import { useParams } from "react-router-dom";
import manifest from "../manifest.json";
import colorTheme from "../colorTheme";
import VideoComponent from "../components/VideoComponent";
import { defaultInputs } from "config/mylearningConfig";
import { courses as coursesData } from "../config/mylearning";

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
  {
    title: "By Due Date",
    data: [
      {
        attribute: "dueDate",
        value: "low_high",
        name: "Low to High",
        icon: "ArrowRightUpLineIcon",
      },
      {
        attribute: "dueDate",
        value: "high_low",
        name: "High To Low",
        icon: "ArrowRightDownLineIcon",
      },
    ],
  },
];

const newDefaultInputs = defaultInputs.map((e) => {
  return {
    ...e,
    ["attributeName"]: ["gradeLevel"].includes(e.attributeName)
      ? "grade"
      : e.attributeName,
    ["type"]: "sting",
  };
});

const ONGOING = "Ongoing";
const ASSIGNED = "Assigned";
const COMPLETED = "Completed";

const colors = overrideColorTheme(colorTheme);

export default function VideoList({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [filterObject, setFilterObject] = React.useState({});
  const [courses, setCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState(true);
  const [searchState, setSearchState] = React.useState(false);
  const [showModalSort, setShowModalSort] = React.useState(false);
  const { state } = useParams();

  React.useEffect(async () => {
    setCourses(coursesData.filter((e) => (state ? e.state === state : true)));
    setLoading(false);
  }, []);

  const getTitle = () => {
    if (state === ONGOING) {
      return t("ALL_ONGOING_VIDEOS");
    } else if (state === ASSIGNED) {
      return t("ALL_ASSIGNED_VIDEOS");
    } else if (state === COMPLETED) {
      return t("ALL_COMPLETED_VIDEOS");
    } else {
      return t("ALL_VIDEOS");
    }
  };

  const getSubTitle = () => {
    if (state === ONGOING) {
      return t("SEE_ALL_ONGOING_VIDEOS");
    } else if (state === ASSIGNED) {
      return t("SEE_ALL_ASSIGNED_VIDEOS");
    } else if (state === COMPLETED) {
      return t("SEE_ALL_COMPLETED_VIDEOS");
    } else {
      return t("SEE_ALL_VIDEOS");
    }
  };

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
          notFoundMessage: t("TYPE_TO_START_SEARCHING_LEARNING"),
          onCloseSearch: setSearchState,
        }}
      >
        <Children
          {...{ courses, isHideCreateButton: true, setFilterObject, state }}
        />
      </SearchLayout>
    );
  }

  return (
    <Layout
      _header={{
        title: getTitle(),
        iconComponent: (
          <Button
            rounded="full"
            variant="outline"
            bg={colors.primaryLight}
            px={4}
            py={1}
            rightIcon={
              <IconByName
                name="ArrowDownSLineIcon"
                isDisabled
                _icon={{ size: 20 }}
              />
            }
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
      subHeader={<H2 textTransform="inherit">{getSubTitle()}</H2>}
      _subHeader={{ bg: colors.cardBg }}
      _footer={footerLinks}
    >
      <Children
        {...{
          courses,
          setFilterObject,
          showModalSort,
          setShowModalSort,
          appName,
          state,
        }}
      />
    </Layout>
  );
}

const Children = ({
  state,
  courses,
  setFilterObject,
  showModalSort,
  setShowModalSort,
  appName,
}) => {
  const { t } = useTranslation();
  const [sortData, setSortData] = React.useState();

  const handleSort = (obejct) => {
    const newSort = { [obejct.attribute]: obejct.value };
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "MyLearnings-Sort",
      sortType: newSort,
    });
    capture("INTERACT", telemetryData);
    setSortData(newSort);
  };

  const handleFilter = (obejct) => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "MyLearnings-Filter",
      filterObject: obejct,
    });
    capture("INTERACT", telemetryData);
    setFilterObject(obejct);
  };

  const getState = () => {
    if (state === ONGOING) {
      return t("ONGOING");
    } else if (state === ASSIGNED) {
      return t("ASSIGNED");
    } else if (state === COMPLETED) {
      return t("COMPLETED");
    }
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
        <Box
          bg={colors.white}
          pt="0"
          p="5"
          mb="4"
          roundedBottom={"xl"}
          shadow={2}
        >
          <VideoComponent
            seeButton={<React.Fragment />}
            appName={appName}
            data={courses}
            leftTitle={
              state ? (
                <VStack>
                  <H2>{getState()}</H2>
                  <BodySmall>
                    {courses.length} {t("COURSES")}
                  </BodySmall>
                </VStack>
              ) : (
                <React.Fragment />
              )
            }
          />
        </Box>
      </VStack>
      <Actionsheet
        isOpen={showModalSort}
        onClose={() => setShowModalSort(false)}
      >
        <Stack width={"100%"} maxH={"100%"}>
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
          <ScrollView width={"100%"} space="1" bg={colors.coolGray}>
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
          </ScrollView>
        </Stack>
      </Actionsheet>
    </Stack>
  );
};

const LessonPlans = () => {
  return <h4>LessonPlans</h4>;
};
