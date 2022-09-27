import Reacttra, { useEffect, useState } from "react";
import {
  Layout,
  H2,
  IconByName,
  Caption,
  overrideColorTheme,
  H1,
  BodyLarge,
  hpAssessmentRegistryService,
  Loading,
  useWindowSize,
} from "@shiksha/common-lib";
import { Link } from "react-router-dom";
import { Box, HStack, Text, VStack, Button } from "native-base";
import SchoolCard from "../components/SchoolCard";
import colorTheme from "../colorTheme";
import { useTranslation } from "react-i18next";
import React from "react";
// const colors = overrideColorTheme(colorTheme);

export default function AllocatedSchools() {
  const { t } = useTranslation();
  const [width, height] = useWindowSize();
  const [loading, setLoading] = useState(true);
  const [trackingList, setTrackingList] = useState([]);
  const [pendingSchools, setPendingSchools] = useState(0);
  const teacherId =
    localStorage.getItem("id") || "1bae8f4e-506b-40ca-aa18-07f7c0e64488";

  function calculateTrackingData(list) {
    const groupedList = formatData(list, "schoolId");
    let pendingCount = 0;
    let schoolStatus = "";
    for (let key in groupedList) {
      let isPending = groupedList[key].status.every((item) => {
        return item === "pending";
      });
      if (isPending) {
        pendingCount++;
      }

      groupedList[key].status.forEach((item) => {
        if (item === "pending") {
          if (schoolStatus === "") {
            schoolStatus = "pending";
          }
          if (schoolStatus === "pending") {
            schoolStatus = "pending";
          }
          if (schoolStatus === "visited") {
            schoolStatus = "visited";
          }
          if (schoolStatus === "nipun_ready") {
            schoolStatus = "visited";
          }
          if (schoolStatus === "nipun") {
            schoolStatus = "visited";
          }
        } else if (item === "nipun_ready") {
          if (schoolStatus === "") {
            schoolStatus = "nipun_ready";
          }
          if (schoolStatus === "pending") {
            schoolStatus = "visited";
          }
          if (schoolStatus === "visited") {
            schoolStatus = "visited";
          }
          if (schoolStatus === "nipun_ready") {
            schoolStatus = "nipun_ready";
          }
          if (schoolStatus === "nipun") {
            schoolStatus = "nipun_ready";
          }
        } else if (item === "nipun") {
          if (schoolStatus === "") {
            schoolStatus = "nipun";
          }
          if (schoolStatus === "pending") {
            schoolStatus = "visited";
          }
          if (schoolStatus === "visited") {
            schoolStatus = "visited";
          }
          if (schoolStatus === "nipun_ready") {
            schoolStatus = "nipun_ready";
          }
          if (schoolStatus === "nipun") {
            schoolStatus = "nipun";
          }
        } else {
          schoolStatus = "visited";
        }
      });

      groupedList[key]["schoolStatus"] = schoolStatus;
    }
    setTrackingList(groupedList);
    setPendingSchools(pendingCount);
    setLoading(false);
  }

  function formatData(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = {
          schoolId: "",
          status: [],
          groupIds: [],
          scheduleVisitDate: '',
          monitorId: ''
        };
      }
      acc[key].schoolId = obj.schoolId;
      acc[key].scheduleVisitDate = obj.scheduleVisitDate;
      acc[key].monitorId = obj.monitorId;
      acc[key].status.push(obj.status);
      acc[key].groupIds.push(obj.groupId);
      return acc;
    }, {});
  }

  const getMonitorTrackingData = async () => {
    const list = await hpAssessmentRegistryService.getAllAllocatedSchools({
      monitorId: teacherId,
    });
    calculateTrackingData(list);
  };

  useEffect(() => {
    getMonitorTrackingData();
  }, []);

  if (loading) {
    return <Loading height={height - height / 2} />;
  }

  return (
    <Layout
      _header={{
        // title: "My Schools",
        // subHeading: "View your schools for Nipun Vidalaya Evaluation",
        title: (
          <VStack>
            <H1>My Schools</H1>
            <BodyLarge>
              {t("View your schools for Nipun Vidalaya Evaluation")}
            </BodyLarge>
          </VStack>
        ),
        isEnableSearchBtn: true,
      }}
      subHeader={
        <HStack space="4" justifyContent="space-between">
          <VStack>
            <H2 textTransform="none" color="hpAssessment.white">
              {t("Allocated Schools")}
            </H2>
            <HStack alignItems={"center"}>
              <Caption color="hpAssessment.white">
                {t("Total Schools for Evaluation ") +
                  Object.keys(trackingList).length}
              </Caption>{" "}
              <Caption fontSize={2} color="hpAssessment.white">
                {" "}
                •
              </Caption>{" "}
              <Caption color="hpAssessment.white">
                {" "}
                {t("Pending ") + pendingSchools}
              </Caption>
            </HStack>
          </VStack>
        </HStack>
      }
      _subHeader={{
        bg: "hpAssessment.cardBg1",
      }}
      _footer={{
        menues: [
          {
            title: "HOME",
            icon: "Home4LineIcon",
            route: "/",
          },
          {
            title: "CLASSES",
            icon: "TeamLineIcon",
            route: "/classes",
          },
          {
            title: "SCHOOL",
            icon: "GovernmentLineIcon",
            route: "/",
          },
          {
            title: "MATERIALS",
            icon: "BookOpenLineIcon",
            route: "/",
          },
          {
            title: "CAREER",
            icon: "UserLineIcon",
            route: "/",
          },
        ],
      }}
    >
      <Box p={4}>
        <VStack space={4}>
          {Object.keys(trackingList).map((key) => {
            // const schoolDetail = getSchoolDetail(item?.monitorTrackingId);
            return (
              <SchoolCard
                status={trackingList[key].schoolStatus}
                monitorId={trackingList[key].monitorId}
                scheduleVisitDate={trackingList[key].scheduleVisitDate}
                schoolId={key}
                groupIds={trackingList[key].groupIds}
                key={key + Math.random()}
              />
            );
          })}
        </VStack>
      </Box>
    </Layout>
  );
}
