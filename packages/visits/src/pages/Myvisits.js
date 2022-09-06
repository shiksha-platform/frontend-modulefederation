import {
  BodyMedium,
  H2,
  Layout,
  overrideColorTheme,
  SearchLayout,
  mentorRegisteryService,
  Loading,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { Box, Button, Pressable, VStack } from "native-base";
import MySchoolsCard from "components/MySchoolsCard";
import { useNavigate } from "react-router-dom";
import colorTheme from "colorTheme";
import manifest from "manifest.json";
const colors = overrideColorTheme(colorTheme);

export default function Myvisits({ footerLinks }) {
  const { t } = useTranslation();
  const [recommendedVisits, setRecommendedVisits] = useState([{}, {}]);
  const [allocatedVisits, setAllocatedVisits] = useState([]);
  const [searchState, setSearchState] = React.useState(false);
  const [search, setSearch] = React.useState(true);
  const navigate = useNavigate();

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
      let lastVisitedMiliSeconds = new Date(0).getMilliseconds(),
        schoolStatus = "visited",
        schoolLastVisited;
      value?.forEach((school) => {
        if (school?.status === "pending") schoolStatus = "pending";
        if (
          new Date(school?.lastVisited).getMilliseconds() >
          lastVisitedMiliSeconds
        )
          lastVisitedMiliSeconds = new Date(school?.lastVisited);
        schoolLastVisited = school?.lastVisited;
      });
      value[0].schoolLastVisited = schoolLastVisited;
      value[0].schoolStatus = schoolStatus;
    });

    // Settings the list of allocated schools
    setAllocatedVisits(groupBySchools);

    // Creating a copy of group by schools
    const groupOfRecommendedVisits = Object.assign({}, groupBySchools);

    // Getting the date of 2 months ago
    const today = new Date();
    today.setMonth(today.getMonth() - 2);

    // Setting the list of recommended visits when last visit is of 2 months ago
    Object.entries(groupOfRecommendedVisits).forEach(([key, value]) => {
      if (
        new Date(value[0]?.schoolLastVisited).getMilliseconds() >
        today.getMilliseconds()
      )
        delete groupOfRecommendedVisits[key];
    });

    // Settings the list of recommended schools
    setRecommendedVisits(groupOfRecommendedVisits);
  }, []);

  if (searchState) {
    return (
      <SearchLayout
        {...{
          search,
          setSearch,
          minStringLength: 3,
          notFoundMessage: t("TYPE_TO_START_SEARCHING_WORKSHEETS"),
          onCloseSearch: setSearchState,
        }}
      >
        <Box p={6}>
          <VStack space={6}>
            {recommendedVisits && Object.keys(recommendedVisits)?.length > 0 ? (
              Object.entries(recommendedVisits).map(
                ([key, visit], visitIndex) =>
                  visitIndex < 2 && (
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
            )}
          </VStack>
        </Box>
      </SearchLayout>
    );
  }

  return (
    <Layout
      _header={{
        title: "My Visits",
      }}
      subHeader={
        <H2 textTransform="inherit">
          View recommended and allocated schools for your visits
        </H2>
      }
      _appBar={{
        languages: manifest.languages,
        isEnableSearchBtn: true,
        setSearch,
        setSearchState,
      }}
      _subHeader={{ bg: colors.lightPurple }}
      _footer={footerLinks}
    >
      {recommendedVisits && allocatedVisits ? (
        <Box p={6} bg={colors.white}>
          <VStack space={6}>
            <Box>
              <VStack space={6}>
                <Box>
                  <H2>Recommended Visits</H2>
                  <BodyMedium>Schools not visited in last 2 months</BodyMedium>
                </Box>
                {recommendedVisits &&
                Object.keys(recommendedVisits)?.length > 0 ? (
                  Object.entries(recommendedVisits).map(
                    ([key, visit], visitIndex) =>
                      visitIndex < 2 && (
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
                )}
                {/* {recommendedVisits &&
                recommendedVisits.length &&
                recommendedVisits.map((visit, visitIndex) => {
                  return (
                    <Box textDecoration="none">
                      <Pressable onPress={() => navigate("/schools/1")}>
                        <RecommendedVisitsCard
                          key={`recommended${visitIndex}`}
                        />
                      </Pressable>
                    </Box>
                  );
                })} */}

                {recommendedVisits &&
                  Object.keys(recommendedVisits)?.length > 0 && (
                    <Box>
                      <Button
                        flex="1"
                        colorScheme="button"
                        variant="outline"
                        px="5"
                        onPress={() => navigate(`/visits/recommended-schools`)}
                      >
                        Show More
                      </Button>
                    </Box>
                  )}
              </VStack>
            </Box>

            {/* List of Allocated Schools */}
            <Box>
              <VStack space={6}>
                <Box>
                  <H2>Allocated Schools</H2>
                </Box>
                {/* {socialCategoryCount &&
                Object.entries(socialCategoryCount).map(([key, value]) => (
                  <VStack space={4}>
                    <HStack alignItems="center">
                      <H4>{key} : </H4>
                      <BodyLarge>{value?.length}</BodyLarge>
                    </HStack>
                  </VStack>
                ))} */}

                {allocatedVisits && Object.keys(allocatedVisits)?.length > 0 ? (
                  Object.entries(allocatedVisits).map(
                    ([key, visit], visitIndex) =>
                      visitIndex < 2 && (
                        <Pressable onPress={() => navigate(`/schools/${key}`)}>
                          <MySchoolsCard
                            isVisited={
                              visit[0]?.schoolStatus == "visited" ? true : false
                            }
                            key={`myvisit${visitIndex}`}
                            schoolData={visit[0]?.schoolData}
                            lastVisited={visit[0]?.schoolLastVisited}
                          />
                        </Pressable>
                      )
                  )
                ) : (
                  <Box bg={"schools.dangerAlert"} p={"4"} rounded={10}>
                    No allocated school is available.
                  </Box>
                )}
                {/* {allocatedVisits && allocatedVisits?.length > 0 ? (
                allocatedVisits.map((visit, visitIndex) => {
                  return (
                    visitIndex < 3 && (
                      <Pressable
                        onPress={() => navigate(`/schools/${visit?.schoolId}`)}
                      >
                        <MySchoolsCard
                          isVisited={visit?.status == "visited" ? true : false}
                          key={`myvisit${visitIndex}`}
                          schoolData={visit?.schoolData}
                          lastVisited={visit?.lastVisited}
                        />
                      </Pressable>
                    )
                  );
                })
              ) : (
                <Box bg={"schools.dangerAlert"} p={"4"} rounded={10}>
                  No allocated school is available.
                </Box>
              )} */}

                {/* Show more allocated schools button  */}
                {allocatedVisits && Object.keys(allocatedVisits)?.length > 0 && (
                  <Box>
                    <Button
                      flex="1"
                      colorScheme="button"
                      variant="outline"
                      px="5"
                      onPress={() => navigate(`/visits/allocated-schools`)}
                    >
                      Show More
                    </Button>
                  </Box>
                )}
              </VStack>
            </Box>
          </VStack>
        </Box>
      ) : (
        <Loading height="200px" />
      )}
    </Layout>
  );
}
