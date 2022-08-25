import {
  BodyMedium,
  H2,
  Layout,
  overrideColorTheme,
  SearchLayout,
  mentorRegisteryService,
  SchoolCard,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { Box, Button, Pressable, VStack } from "native-base";
import RecommendedVisitsCard from "../components/RecommendedVisitsCard";
import MySchoolsCard from "../components/MySchoolsCard";
import { useNavigate } from "react-router-dom";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function Myvisits({ footerLinks }) {
  const { t } = useTranslation();
  const [recommendedVisits, setRecommendedVisits] = useState([{}, {}, {}, {}]);
  const [allocatedVisits, setAllocatedVisits] = useState([]);
  const [searchState, setSearchState] = React.useState(false);
  const [search, setSearch] = React.useState(true);
  const navigate = useNavigate();

  useEffect(async () => {
    const data = await mentorRegisteryService.getAllAllocatedSchools({
      mentorId: localStorage.getItem("id"),
    });
    setAllocatedVisits(data);
    console.log(data);
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
            {recommendedVisits &&
              recommendedVisits.length &&
              recommendedVisits.map((visit, visitIndex) => {
                return (
                  <RecommendedVisitsCard key={`recommended${visitIndex}`} />
                );
              })}
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
        languages: ["en"],
        isEnableSearchBtn: true,
        setSearch,
        setSearchState,
      }}
      _subHeader={{ bg: colors.lightPurple }}
      _footer={footerLinks}
    >
      <Box p={6} bg={colors.white}>
        <VStack space={6}>
          <Box>
            <VStack space={6}>
              <Box>
                <H2>Recommended Visits</H2>
                <BodyMedium>Schools not visited in last 2 months</BodyMedium>
              </Box>
              {recommendedVisits &&
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
                })}
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
            </VStack>
          </Box>

          <Box>
            <VStack space={6}>
              <Box>
                <H2>My Schools</H2>
              </Box>
              {allocatedVisits &&
                allocatedVisits.length &&
                allocatedVisits.map((visit, visitIndex) => {
                  return (
                    <MySchoolsCard
                      isVisited={visit?.status == "visited" ? true : false}
                      key={`myvisit${visitIndex}`}
                      schoolData={visit?.schoolData}
                      lastVisited={visit?.lastVisited}
                    />
                  );
                })}

              {/* {allocatedVisits &&
                allocatedVisits.length &&
                allocatedVisits.map((visit, visitIndex) => {
                  return (
                    <SchoolCard
                      key={visitIndex}
                      _bgColor={"green"}
                      name={"ABC SCHOOL"}
                      attributeData={[
                        {
                          icon: "MapPinLineIcon",
                          label: "District",
                          data: visit?.schoolData?.district,
                        },
                        {
                          icon: "GovernmentLineIcon",
                          label: "Block",
                          data: visit?.schoolData?.block,
                        },
                        {
                          icon: "CalendarEventLineIcon",
                          label: "Last Visited",
                          data: visit?.lastVisited,
                        },
                      ]}
                    />
                  );
                })} */}
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
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Layout>
  );
}
