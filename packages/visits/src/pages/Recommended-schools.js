import {
  H2,
  IconByName,
  Layout,
  FilterButton,
  BodyMedium,
  BodyLarge,
  mentorRegisteryService,
  Loading,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
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

import manifest from "manifest.json";

const defaultInputs = [
  {
    name: "District",
    attributeName: "district",
    data: [],
  },
  {
    name: "Block",
    attributeName: "block",
    data: [],
  },
];

export default function Recommendedschools({ footerLinks }) {
  const { t } = useTranslation();
  const [recommendedVisits, setRecommendedVisits] = useState(null);
  const [sortModal, setSortModal] = useState(false);
  const [input, setInput] = useState(defaultInputs);

  const [filterObject, setFilterObject] = React.useState({});
  const navigate = useNavigate();

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

    const districts = new Set(),
      blocks = new Set();
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

      if (value[0]?.schoolData?.district !== "")
        districts.add(value[0]?.schoolData?.district);
      if (value[0]?.schoolData?.block !== "")
        blocks.add(value[0]?.schoolData?.block);
    });

    setInput([
      {
        name: t("DISTRICT"),
        attributeName: "district",
        data: Array.from(districts),
      },
      {
        name: t("BLOCK"),
        attributeName: "block",
        data: Array.from(blocks),
      },
    ]);

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
        title: t("RECOMMENDED_VISITS"),
        isEnableSearchBtn: true,
      }}
      subHeader={<H2 textTransform="inherit">{t("ALL_RECOMMENDED_VISITS")}</H2>}
      _appBar={{ languages: manifest.languages }}
      _subHeader={{ bg: "visits.cardBg" }}
      _footer={footerLinks}
    >
      <Box p={6} bg={"visits.white"}>
        <VStack space={6}>
          <Box>
            <VStack space={6}>
              <Box>
                <HStack alignItems="center" justifyContent="space-between">
                  <Box>
                    <H2>{t("SCHOOLS")}</H2>
                    <BodyMedium>
                      {recommendedVisits &&
                        Object.keys(recommendedVisits)?.length > 0 &&
                        Object.keys(recommendedVisits)?.length}{" "}
                      {t("SCHOOLS_NOT_VISITED_LAST_TWO_MONTHS")}
                    </BodyMedium>
                  </Box>
                  {/* <Button
                    variant="outline"
                    bg={"visits.white"}
                    onPress={() => {
                      setSortModal(true);
                    }}
                  >
                    {t("SORT")}
                  </Button> */}
                </HStack>
              </Box>

              <Box>
                <FilterButton
                  getObject={callBackFilterObject}
                  object={filterObject}
                  _actionSheet={{ bg: "visits.cardBg" }}
                  _filterButton={{
                    rightIcon: "",
                    bg: "visits.white",
                    color: "visits.primary",
                  }}
                  resetButtonText={t("COLLAPSE")}
                  filters={input}
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
                    {t("ALL_SCHOOLS_VISITED_LAST_TWO_MONTHS")}
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
        <Actionsheet.Content alignItems={"left"} bg={"visits.cardBg"}>
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="15px">
              <H2>{t("SORT")}</H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={"visits.darkGray0"}
              onPress={() => setSortModal(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" p={4} justifyContent="center" bg={"visits.white"}>
          <Box pt="0">
            <BodyMedium color={"visits.gray"}>
              {t("BY_LAST_VISITED")}
            </BodyMedium>
            <Actionsheet.Item>
              <HStack alignItems="center" p={0}>
                <IconByName
                  size="sm"
                  name="ArrowRightUpLineIcon"
                  color={"visits.bodyText"}
                />
                <BodyLarge>{t("LATEST_TO_OLDEST")}</BodyLarge>
              </HStack>
            </Actionsheet.Item>
            <Actionsheet.Item>
              <HStack alignItems="center" p={0}>
                <IconByName
                  size="sm"
                  name="ArrowRightDownLineIcon"
                  color={"visits.bodyText"}
                />
                <BodyLarge>{t("OLDEST_TO_LATEST")}</BodyLarge>
              </HStack>
            </Actionsheet.Item>
          </Box>

          <Divider my={4}></Divider>

          <Box pt="0">
            <BodyMedium color={"visits.gray"}>{t("BY_COMPLETED")}</BodyMedium>
            <Actionsheet.Item>
              <HStack alignItems="center" p={0}>
                <IconByName
                  size="sm"
                  name="ArrowRightUpLineIcon"
                  color={"visits.bodyText"}
                />
                <BodyLarge>{t("VISITED")}</BodyLarge>
              </HStack>
            </Actionsheet.Item>
            <Actionsheet.Item>
              <HStack alignItems="center" p={0}>
                <IconByName
                  size="sm"
                  name="ArrowRightDownLineIcon"
                  color={"visits.bodyText"}
                />
                <BodyLarge>{t("NOT_VISITED")}</BodyLarge>
              </HStack>
            </Actionsheet.Item>
          </Box>
        </Box>
      </Actionsheet>
    </Layout>
  );
}
