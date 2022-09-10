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
export default function Allocatedschools({ footerLinks }) {
  const { t } = useTranslation();
  const [allocatedVisits, setAllocatedVisits] = useState([]);
  const [totalSchools, setTotalSchools] = useState();
  const [totalPendingSchools, setTotalPendingSchools] = useState();
  const [sortModal, setSortModal] = useState(false);

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
    setTotalSchools(Object.keys(groupBySchools).length);

    let count = 0;
    Object.entries(groupBySchools).map(([key, value]) => {
      if (value[0]?.schoolStatus == "pending") count++;
    });
    setTotalPendingSchools(count);
  }, []);

  return (
    <Layout
      _header={{
        title: "Allocated Schools",
        isEnableSearchBtn: true,
      }}
      subHeader={
        <H2 textTransform="inherit">
          See all your allocated schools for visits here
        </H2>
      }
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
                    <H2>Schools</H2>
                    <BodyMedium>
                      Total {totalSchools} ● Not visited {totalPendingSchools}
                    </BodyMedium>
                  </Box>
                  <Button
                    variant="outline"
                    bg={"visits.white"}
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
                  _actionSheet={{ bg: "visits.lightGray" }}
                  _filterButton={{
                    rightIcon: "",
                    bg: "visits.white",
                  }}
                  resetButtonText={t("COLLAPSE")}
                  filters={defaultInputs}
                />
              </Box>
              {allocatedVisits && Object.keys(allocatedVisits)?.length > 0 ? (
                Object.entries(allocatedVisits).map(
                  ([key, visit], visitIndex) => (
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
              <H2>{t("Sort")}</H2>
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
              By last visited
            </BodyMedium>
            <Actionsheet.Item>
              <HStack alignItems="center" p={0}>
                <IconByName
                  size="sm"
                  name="ArrowRightUpLineIcon"
                  color={"visits.bodyText"}
                />
                <BodyLarge>Latest to Oldest</BodyLarge>
              </HStack>
            </Actionsheet.Item>
            <Actionsheet.Item>
              <HStack alignItems="center" p={0}>
                <IconByName
                  size="sm"
                  name="ArrowRightDownLineIcon"
                  color={"visits.bodyText"}
                />
                <BodyLarge>Oldest to Latest</BodyLarge>
              </HStack>
            </Actionsheet.Item>
          </Box>

          <Divider my={4}></Divider>

          <Box pt="0">
            <BodyMedium color={"visits.gray"}>By Completed</BodyMedium>
            <Actionsheet.Item>
              <HStack alignItems="center" p={0}>
                <IconByName
                  size="sm"
                  name="ArrowRightUpLineIcon"
                  color={"visits.bodyText"}
                />
                <BodyLarge>Visited</BodyLarge>
              </HStack>
            </Actionsheet.Item>
            <Actionsheet.Item>
              <HStack alignItems="center" p={0}>
                <IconByName
                  size="sm"
                  name="ArrowRightDownLineIcon"
                  color={"visits.bodyText"}
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
