import {
  BodyMedium,
  H2,
  IconByName,
  Layout,
  overrideColorTheme,
  SearchLayout,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, HStack, Text, VStack } from "native-base";
import RecommendedVisitsCard from "../components/RecommendedVisitsCard";
import MySchoolsCard from "../components/MySchoolsCard";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function Myvisits() {
  const { t } = useTranslation();
  const [recommendedVisits, setRecommendedVisits] = useState([{}, {}, {}, {}]);
  const [searchState, setSearchState] = React.useState(false);
  const [search, setSearch] = React.useState(true);

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
        _heading: { color: colors.white },
        subHeading: t("View recommended and allocated schools for your visits"),
        _subHeading: {
          color: colors.white,
          textTransform: "none",
          maxWidth: "330px",
        },
      }}
      _appBar={{
        languages: ["en"],
        isEnableSearchBtn: true,
        setSearch,
        setSearchState,
      }}
      _subHeader={{ bg: colors.lightPurple }}
      _footer={{
        menues: [
          {
            title: "HOME",
            icon: "Home4LineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
          {
            title: "VISITS",
            icon: "GovernmentLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
          {
            title: "LEARNING",
            icon: "LightbulbFlashLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
          {
            title: "MATERIALS",
            icon: "BookOpenLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
          {
            title: "PROFILE",
            icon: "UserLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
        ],
      }}
    >
      <Box p={6}>
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
              <Box textAlign="center">
                <Link
                  to="/visits/recommended-schools"
                  style={{ color: colors.primary, textDecoration: "none" }}
                >
                  Show More
                </Link>
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
              <Box textAlign="center">
                <Link
                  to="/visits/allocated-schools"
                  style={{ color: colors.primary, textDecoration: "none" }}
                >
                  Show More
                </Link>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Layout>
  );
}
