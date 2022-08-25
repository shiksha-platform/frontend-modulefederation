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
  const [loading, setLoading] = useState(false);
  const [trackingList, setTackingList] = useState([]);
  const [pendingSchools, setPendingSchools] = useState(0);

  const getAllAllocatedSchools = async () => {
    const list = await hpAssessmentRegistryService.getAllAllocatedSchools();
    setTackingList(list);
    const pendingSchools = list.filter((item) => {
      return item.status === "pending";
    }).length;
    setPendingSchools(pendingSchools);
    setLoading(false);
  };

  useEffect(() => {
    getAllAllocatedSchools();
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
            <H2 textTransform="none">{t("Allocated Schools")}</H2>
            <HStack alignItems={"center"}>
              <Caption>
                {t("Total Schools for Evaluation ") + trackingList.length}
              </Caption>{" "}
              <Caption fontSize={2}> •</Caption>{" "}
              <Caption> {t("Pending ") + pendingSchools}</Caption>
            </HStack>
          </VStack>
        </HStack>
      }
      _subHeader={{ bg: "hpAssessment.cardBg" }}
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
          {trackingList &&
            trackingList.length > 0 &&
            trackingList.map((item) => {
              // const schoolDetail = getSchoolDetail(item?.monitorTrackingId);
              return (
                <SchoolCard
                  schoolId={item?.schoolId}
                  key={item?.schoolId + Math.random()}
                />
              );
            })}
          {/*<SchoolCard status={'pending'} />
          <SchoolCard status={'ongoing'} />
          <SchoolCard status={'complete'} />
          <SchoolCard status={'completeWithNipun'} />*/}
        </VStack>
      </Box>
    </Layout>
  );
}
