import {
  BodyMedium,
  H2,
  Layout,
  overrideColorTheme,
  SearchLayout,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, VStack } from "native-base";
import RecommendedVisitsCard from "../components/RecommendedVisitsCard";
import MySchoolsCard from "../components/MySchoolsCard";
import { useNavigate } from "react-router-dom";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function Myvisits() {
  const { t } = useTranslation();
  const [recommendedVisits, setRecommendedVisits] = useState([{}, {}, {}, {}]);
  const [searchState, setSearchState] = React.useState(false);
  const [search, setSearch] = React.useState(true);
  const navigate = useNavigate();

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
                      <RecommendedVisitsCard key={`recommended${visitIndex}`} />
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
              {recommendedVisits &&
                recommendedVisits.length &&
                recommendedVisits.map((visit, visitIndex) => {
                  return (
                    <MySchoolsCard
                      isVisited={true}
                      key={`myvisit${visitIndex}`}
                    />
                  );
                })}
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
