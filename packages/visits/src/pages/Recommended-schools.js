import {
  H2,
  IconByName,
  Layout,
  FilterButton,
  DEFAULT_THEME,
  overrideColorTheme,
  BodyMedium,
  BodyLarge,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  HStack,
  Text,
  VStack,
  Button,
  Actionsheet,
  Stack,
  Divider,
} from "native-base";
import RecommendedVisitsCard from "../components/RecommendedVisitsCard";
import MySchoolsCard from "../components/MySchoolsCard";
import colorTheme from "../colorTheme";
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

export default function Recommendedschools() {
  const { t } = useTranslation();
  const [recommendedVisits, setRecommendedVisits] = useState([{}, {}, {}, {}]);
  const [sortModal, setSortModal] = useState(false);

  const [filterObject, setFilterObject] = React.useState({});

  const callBackFilterObject = React.useCallback((e) => {
    setFilterObject();
  }, []);

  return (
    <Layout
      _header={{
        title: "Recommended Schools",
        _heading: { color: colors.white },
        isEnableSearchBtn: true,
        subHeading: t("See all your recommended schools for visits here"),
        _subHeading: { color: colors.white, textTransform: "none" },
      }}
      _appBar={{ languages: ["en"] }}
      _subHeader={{ bg: colors.lightPurple }}
      _footer={{
        menues: [
          {
            title: "HOME",
            icon: "Home4LineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
            textTransform: "capitelaize",
          },
          {
            title: "VISITS",
            icon: "GovernmentLineIcon",
            module: "Registry",
            route: "/visits",
            routeparameters: {},
            textTransform: "capitalize",
          },
          {
            title: "LEARNING",
            icon: "LightbulbFlashLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
            textTransform: "capitalize",
          },
          {
            title: "MATERIALS",
            icon: "BookOpenLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
            textTransform: "capitalize",
          },
          {
            title: "PROFILE",
            icon: "UserLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
            textTransform: "capitalize",
          },
        ],
      }}
    >
      <Box p={6}>
        <VStack space={6}>
          <Box>
            <VStack space={6}>
              <Box>
                <HStack alignItems="center" justifyContent="space-between">
                  <Box>
                    <H2>Schools</H2>
                    <BodyMedium>
                      05 Schools not visited in last 2 months
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
                    {/* <IconByName
                      name="ArrowDownSLineIcon"
                      color={colors.primary}
                    /> */}
                  </Button>
                </HStack>
              </Box>

              <Box>
                <FilterButton
                  getObject={callBackFilterObject}
                  object={filterObject}
                  _actionSheet={{ bg: colors.lightGray }}
                  _box={{ pt: 5 }}
                  _button={{ bg: colors.primary, px: "15px", py: "2", mr: "4" }}
                  _filterButton={{
                    rightIcon: "",
                    bg: colors.white,
                  }}
                  resetButtonText={t("COLLAPSE")}
                  filters={defaultInputs}
                />
              </Box>
              {recommendedVisits &&
                recommendedVisits.length &&
                recommendedVisits.map(() => {
                  return <RecommendedVisitsCard isVisited={false} />;
                })}
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
          {/*<Actionsheet.Item>Mathematics</Actionsheet.Item>*/}
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
