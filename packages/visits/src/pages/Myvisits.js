import {
  BodyMedium,
  H2,
  Layout,
  SearchLayout,
  mentorRegisteryService,
  Loading,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { Box, Button, Pressable, VStack } from "native-base";
import MySchoolsCard from "components/MySchoolsCard";
import { useNavigate } from "react-router-dom";
import manifest from "manifest.json";

export default function Myvisits({ footerLinks }) {
  const { t } = useTranslation();
  const [recommendedVisits, setRecommendedVisits] = useState();
  const [allocatedVisits, setAllocatedVisits] = useState();
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
      let lastVisitedMilliSeconds = new Date(0).getTime(),
        schoolStatus = "visited",
        schoolLastVisited;
      value?.forEach((school) => {
        if (school?.status === "pending") schoolStatus = "pending";
        if (new Date(school?.lastVisited).getTime() > lastVisitedMilliSeconds) {
          lastVisitedMilliSeconds = new Date(school?.lastVisited).getTime();
          schoolLastVisited = school?.lastVisited;
        }
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
      if (new Date(value[0]?.schoolLastVisited).getTime() > today.getTime())
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
                <Box bg={"visits.dangerAlert"} p={"4"} rounded={10}>
                  All schools are visited in a recent 2 months.
                </Box>
              )
            ) : (
              <Loading height={"200px"} />
            )}
          </VStack>
        </Box>
      </SearchLayout>
    );
  }

  return (
    <Layout
      _header={{
        title: t("MY_VISITS"),
      }}
      subHeader={
        <H2 textTransform="inherit">{t("RECOMMENDED_ALLOCATED_SCHOOLS")}</H2>
      }
      _appBar={{
        languages: manifest.languages,
        isEnableSearchBtn: true,
        setSearch,
        setSearchState,
      }}
      _subHeader={{ bg: "visits.cardBg" }}
      _footer={footerLinks}
    >
      {recommendedVisits && allocatedVisits ? (
        <Box p={6} bg={"visits.white"}>
          <VStack space={6}>
            <Box>
              <VStack space={6}>
                <Box>
                  <H2>{t("RECOMMENDED_VISITS")}</H2>
                  <BodyMedium>
                    {t("SCHOOLS_NOT_VISITED_LAST_TWO_MONTHS")}
                  </BodyMedium>
                </Box>
                {recommendedVisits ? (
                  Object.keys(recommendedVisits)?.length > 0 ? (
                    Object.entries(recommendedVisits).map(
                      ([key, visit], visitIndex) =>
                        visitIndex < 2 && (
                          <Pressable
                            onPress={() => navigate(`/schools/${key}`)}
                            key={visitIndex}
                          >
                            <MySchoolsCard
                              key={`myvisit${visitIndex}`}
                              schoolData={visit[0]?.schoolData}
                              lastVisited={visit[0]?.schoolLastVisited}
                            />
                          </Pressable>
                        )
                    )
                  ) : (
                    <Box bg={"visits.dangerAlert"} p={"4"} rounded={10}>
                      {t("ALL_SCHOOLS_VISITED_LAST_TWO_MONTHS")}
                    </Box>
                  )
                ) : (
                  <Loading height={"200px"} />
                )}

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
                        {t("SHOW_MORE")}
                      </Button>
                    </Box>
                  )}
              </VStack>
            </Box>

            {/* List of Allocated Schools */}
            <Box>
              <VStack space={6}>
                <Box>
                  <H2>{t("ALLOCATED_VISITS")}</H2>
                </Box>

                {allocatedVisits ? (
                  Object.keys(allocatedVisits)?.length > 0 ? (
                    Object.entries(allocatedVisits).map(
                      ([key, visit], visitIndex) =>
                        visitIndex < 2 && (
                          <Pressable
                            onPress={() => navigate(`/schools/${key}`)}
                            key={visitIndex}
                          >
                            <MySchoolsCard
                              isVisited={
                                visit[0]?.schoolStatus == "visited"
                                  ? true
                                  : false
                              }
                              key={`myvisit${visitIndex}`}
                              schoolData={visit[0]?.schoolData}
                              lastVisited={visit[0]?.schoolLastVisited}
                            />
                          </Pressable>
                        )
                    )
                  ) : (
                    <Box bg={"visits.dangerAlert"} p={"4"} rounded={10}>
                      {t("NO_ALLOCATED_VISITS")}
                    </Box>
                  )
                ) : (
                  <Loading height={"200px"} />
                )}

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
                      {t("SHOW_MORE")}
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
