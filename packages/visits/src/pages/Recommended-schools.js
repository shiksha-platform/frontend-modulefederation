import {
  H2,
  IconByName,
  Layout,
  FilterButton,
  overrideColorTheme,
  BodyMedium,
  BodyLarge,
  mentorRegisteryService,
  Loading,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import {
  Box,
  HStack,
  VStack,
  Button,
  Actionsheet,
  Stack,
  Divider,
  Pressable,
} from "native-base";
import MySchoolsCard from "components/MySchoolsCard";
import colorTheme from "../colorTheme";
import manifest from "manifest.json";
const colors = overrideColorTheme(colorTheme);
const defaultInputs = [
  {
    name: "District",
    attributeName: "year",
    data: ["District1", "District2", "District3", "District4", "District5"],
  },
  {
    name: "Block",
    attributeName: "block",
    data: [
      "Block 1",
      "Block 2",
      "Block 3",
      "Block 4",
      "Block 5",
      "Block 6",
      "Block 7",
      "Block 8",
      "Block 9",
      "Block 10",
    ],
  },
];

export default function Recommendedschools({ footerLinks }) {
  const { t } = useTranslation();
  const [recommendedVisits, setRecommendedVisits] = useState();
  const [sortModal, setSortModal] = useState(false);

  const [filterObject, setFilterObject] = React.useState({});

  const callBackFilterObject = React.useCallback((e) => {
    setFilterObject();
  }, []);

  useEffect(async () => {
    const data = await mentorRegisteryService.getAllAllocatedSchools({
      mentorId: localStorage.getItem("id"),
    });

    const groupBySchools = data.reduce((group, school) => {
      const { schoolId } = school;
      group[schoolId] = group[schoolId] ?? [];
      group[schoolId].push(school);
      return group;
    }, {});

    // Getting the last Visited date of mentor for schools and setting the status to pending even if one teacher is not visited
    Object.entries(groupBySchools).forEach(([key, value]) => {
      let lastVisitedMilliSeconds = new Date(0).getTime(),
        schoolLastVisited;
      value?.forEach((school) => {
        if (new Date(school?.lastVisited).getTime() > lastVisitedMilliSeconds) {
          lastVisitedMilliSeconds = new Date(school?.lastVisited).getTime();
          schoolLastVisited = school?.lastVisited;
        }
      });
      value[0].schoolLastVisited = schoolLastVisited;
    });

    // Getting the date of 2 months ago
    const today = new Date();
    today.setMonth(today.getMonth() - 2);

    // Setting the list of recommended visits when last visit is of 2 months ago
    Object.entries(groupBySchools).forEach(([key, value]) => {
      if (new Date(value[0]?.schoolLastVisited).getTime() > today.getTime())
        delete groupBySchools[key];
    });

    // Settings the list of recommended schools
    setRecommendedVisits(groupBySchools);
  }, []);

  return (
    <Layout
      _header={{
        title: "Recommended Schools",
        isEnableSearchBtn: true,
      }}
      subHeader={
        <H2 textTransform="inherit">
          See all your recommended schools for visits here
        </H2>
      }
      _appBar={{ languages: manifest.languages }}
      _subHeader={{ bg: colors.lightPurple }}
      _footer={footerLinks}
    >
      <Box p={6} bg={colors.white}>
        <VStack space={6}>
          <Box>
            <VStack space={6}>
              <Box>
                <HStack alignItems="center" justifyContent="space-between">
                  <Box>
                    <H2>Schools</H2>
                    <BodyMedium>
                      {recommendedVisits &&
                        Object.keys(recommendedVisits)?.length > 0 &&
                        Object.keys(recommendedVisits)?.length}{" "}
                      Schools not visited in last 2 months
                    </BodyMedium>
                  </Box>
                  <Button
                    variant="outline"
                    bg={colors.white}
                    onPress={() => {
                      setSortModal(true);
                    }}
                  >
                    Sort
                  </Button>
                </HStack>
              </Box>

              <Box>
                <FilterButton
                  getObject={callBackFilterObject}
                  object={filterObject}
                  _actionSheet={{ bg: colors.lightGray }}
                  _filterButton={{
                    rightIcon: "",
                    bg: colors.white,
                  }}
                  resetButtonText={t("COLLAPSE")}
                  filters={defaultInputs}
                />
              </Box>
              {recommendedVisits ? (
                Object.keys(recommendedVisits)?.length > 0 ? (
                  Object.entries(recommendedVisits).map(
                    ([key, visit], visitIndex) => (
                      <Pressable onPress={() => navigate(`/schools/${key}`)}>
                        <MySchoolsCard
                          key={`myvisit${visitIndex}`}
                          schoolData={visit[0]?.schoolData}
                          lastVisited={visit[0]?.schoolLastVisited}
                        />
                      </Pressable>
                    )
                  )
                ) : (
                  <Box bg={"schools.dangerAlert"} p={"4"} rounded={10}>
                    All schools are visited in a recent 2 months.
                  </Box>
                )
              ) : (
                <Loading height={"200px"} />
              )}
            </VStack>
          </Box>
        </VStack>
      </Box>

      <Actionsheet isOpen={sortModal} onClose={() => setSortModal(false)}>
        <Actionsheet.Content alignItems={"left"} bg={colors.lightGray}>
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="15px">
              <H2>{t("Sort")}</H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={colors.primary}
              onPress={() => setSortModal(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" p={4} justifyContent="center" bg={colors.white}>
          <Box pt="0">
            <BodyMedium color={colors.subtitle}>By last visited</BodyMedium>
            <Actionsheet.Item>
              <HStack alignItems="center" p={0}>
                <IconByName
                  size="sm"
                  name="ArrowRightUpLineIcon"
                  color={colors.bodyText}
                />
                <BodyLarge>Latest to Oldest</BodyLarge>
              </HStack>
            </Actionsheet.Item>
            <Actionsheet.Item>
              <HStack alignItems="center" p={0}>
                <IconByName
                  size="sm"
                  name="ArrowRightDownLineIcon"
                  color={colors.bodyText}
                />
                <BodyLarge>Oldest to Latest</BodyLarge>
              </HStack>
            </Actionsheet.Item>
          </Box>

          <Divider my={4}></Divider>

          <Box pt="0">
            <BodyMedium color={colors.subtitle}>By Completed</BodyMedium>
            <Actionsheet.Item>
              <HStack alignItems="center" p={0}>
                <IconByName
                  size="sm"
                  name="ArrowRightUpLineIcon"
                  color={colors.bodyText}
                />
                <BodyLarge>Visited</BodyLarge>
              </HStack>
            </Actionsheet.Item>
            <Actionsheet.Item>
              <HStack alignItems="center" p={0}>
                <IconByName
                  size="sm"
                  name="ArrowRightDownLineIcon"
                  color={colors.bodyText}
                />
                <BodyLarge>Not Visited</BodyLarge>
              </HStack>
            </Actionsheet.Item>
          </Box>
        </Box>
      </Actionsheet>
    </Layout>
  );
}
