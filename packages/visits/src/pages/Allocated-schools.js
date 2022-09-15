import {
  BodyLarge,
  BodyMedium,
  FilterButton,
  H2,
  IconByName,
  Layout,
  overrideColorTheme,
  mentorRegisteryService,
  Loading,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import {
  Box,
  HStack,
  VStack,
  Actionsheet,
  Button,
  Stack,
  Divider,
  Pressable,
} from "native-base";
import { useNavigate } from "react-router-dom";
import MySchoolsCard from "../components/MySchoolsCard";
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
export default function Allocatedschools({ footerLinks }) {
  const { t } = useTranslation();
  const [allocatedVisits, setAllocatedVisits] = useState(null);
  const [totalSchools, setTotalSchools] = useState();
  const [totalPendingSchools, setTotalPendingSchools] = useState();
  const [sortModal, setSortModal] = useState(false);
  const [input, setInput] = useState(defaultInputs);

  const [filterObject, setFilterObject] = React.useState([]);
  const navigate = useNavigate();
  const callBackFilterObject = (object) => setFilterObject(object);

  useEffect(async () => {
    const districts = new Set();
    const data = await mentorRegisteryService.getAllAllocatedSchools({
      mentorId: localStorage.getItem("id"),
    });

    const groupBySchools = data.reduce((group, school) => {
      districts.add(school?.schoolData?.district);
      let filterKeys = Object.keys(filterObject);
      if (filterKeys?.length > 0) {
        let boolean = filterKeys.map((item) => {
          return filterObject[item]?.includes(school?.schoolData?.[item]);
        });

        if (group && boolean && !boolean.includes(false)) {
          const { schoolId } = school;
          return {
            ...(group ? group : {}),
            [schoolId]: [...(group[schoolId] ? group[schoolId] : []), school],
          };
        } else {
          return group;
        }
      } else {
        const { schoolId } = school;
        return {
          ...(group ? group : {}),
          [schoolId]: [...(group[schoolId] ? group[schoolId] : []), school],
        };
      }
    }, {});

    const blocks = new Set();

    // Getting the last Visited date of mentor for schools and setting the status to pending even if one teacher is not visited
    {
      groupBySchools &&
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

          if (value[0]?.schoolData?.block !== "")
            blocks.add(value[0]?.schoolData?.block);
        });
    }

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

    // Settings the list of allocated schools
    setAllocatedVisits(groupBySchools);
    setTotalSchools(Object.keys(groupBySchools).length);

    let count = 0;
    Object.entries(groupBySchools).map(([key, value]) => {
      if (value[0]?.schoolStatus == "pending") count++;
    });
    setTotalPendingSchools(count);
  }, [filterObject]);

  return (
    <Layout
      _header={{
        title: t("ALLOCATED_VISITS"),
        isEnableSearchBtn: true,
      }}
      subHeader={<H2 textTransform="inherit">{t("ALL_ALLOCATED_VISITS")}</H2>}
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
                      {t("TOTAL")} {totalSchools} ● {t("NOT_VISITED")}{" "}
                      {totalPendingSchools}
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
              {allocatedVisits ? (
                Object.keys(allocatedVisits)?.length > 0 ? (
                  Object.entries(allocatedVisits).map(
                    ([key, visit], visitIndex) => (
                      <Pressable
                        onPress={() => navigate(`/schools/${key}`)}
                        key={key}
                      >
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
                    {t("NO_ALLOCATED_VISITS")}
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
            <BodyMedium fontSize={12} color={"visits.gray"}>
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
