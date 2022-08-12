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
  BodyLarge,
  SearchLayout,
  BodySmall,
  coursetrackingRegistryService,
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
import { defaultInputs } from "config/mylearningConfig";
import MyCoursesComponent from "components/MyCoursesComponent";

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

export default function MyLearning({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [filterObject, setFilterObject] = React.useState({});
  const [courses, setCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState(true);
  const [searchState, setSearchState] = React.useState(false);
  const [showModalSort, setShowModalSort] = React.useState(false);
  const { state } = useParams();
  const userId = localStorage.getItem("id");

  React.useEffect(async () => {
    setCourses(
      await coursetrackingRegistryService.getAll({
        ...filterObject,
        limit: 10,
        userId,
        status: state,
      })
    );
    setLoading(false);
  }, [filterObject]);

  const getTitle = () => {
    if (state === ONGOING) {
      return t("ALL_ONGOING_COURSES");
    } else if (state === ASSIGNED) {
      return t("ALL_ASSIGNED_COURSES");
    } else if (state === COMPLETED) {
      return t("ALL_COMPLETED_COURSES");
    } else {
      return t("ALL_COURSES");
    }
  };

  const getSubTitle = () => {
    if (state === ONGOING) {
      return t("SEE_ALL_ONGOING_COURSES");
    } else if (state === ASSIGNED) {
      return t("SEE_ALL_ASSIGNED_COURSES");
    } else if (state === COMPLETED) {
      return t("SEE_ALL_COMPLETED_COURSES");
    } else {
      return t("SEE_ALL_COURSES");
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
            bg={"mylearning.primaryLight"}
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
            <BodyLarge textTransform="capitalize" color={"mylearning.primary"}>
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
      _subHeader={{ bg: "mylearning.cardBg" }}
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
        _actionSheet={{ bg: "mylearning.cardBg" }}
        resetButtonText={t("COLLAPSE")}
        filters={newDefaultInputs}
      />
      <VStack>
        <Box
          bg={"mylearning.white"}
          pt="0"
          p="5"
          mb="4"
          roundedBottom={"xl"}
          shadow={2}
        >
          <MyCoursesComponent
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
          <Actionsheet.Content alignItems={"left"} bg={"mylearning.cardBg"}>
            <HStack justifyContent={"space-between"}>
              <Stack p={5} pt={2} pb="15px">
                <H2>{t("SORT")}</H2>
              </Stack>
              <IconByName
                name="CloseCircleLineIcon"
                color={"mylearning.cardCloseIcon"}
                onPress={(e) => setShowModalSort(false)}
              />
            </HStack>
          </Actionsheet.Content>
          <ScrollView width={"100%"} space="1" bg={"mylearning.coolGray"}>
            <VStack bg={"mylearning.white"} width={"100%"} space="1">
              {sortArray.map((value, index) => (
                <Box key={index}>
                  <Box px="5" py="4">
                    <H3 color={"mylearning.grayLight"}>{value?.title}</H3>
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
                          bg={isSelected ? "mylearning.grayLight" : ""}
                          onPress={(e) => handleSort(item)}
                        >
                          <HStack
                            space="2"
                            colorScheme="button"
                            alignItems="center"
                          >
                            <IconByName
                              isDisabled
                              color={isSelected ? "mylearning.primary" : ""}
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
                  _text={{ color: "mylearning.white" }}
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
