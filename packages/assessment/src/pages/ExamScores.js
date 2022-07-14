import {
  BodyLarge,
  BodyMedium,
  Caption,
  Collapsible,
  H3,
  IconByName,
  Layout,
  overrideColorTheme,
  Subtitle,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, HStack, Text, VStack, Stack, Avatar } from "native-base";
import StudentsList from "../components/ExamScores/StudentsList";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function ExamScores() {
  const { t } = useTranslation();
  const [weekPage, setWeekPage] = useState(0);
  const [allAttendanceStatus, setAllAttendanceStatus] = useState({});
  const [students, setStudents] = useState([]);
  const [searchStudents, setSearchStudents] = useState([]);
  const [classObject, setClassObject] = useState({});
  const { classId } = useParams();
  const [loading, setLoading] = useState(false);
  const teacherId = sessionStorage.getItem("id");
  const [attendance, setAttendance] = useState([]);
  const [search, setSearch] = useState();
  const [pageName, setPageName] = useState();
  const [headerDetails, setHeaderDetails] = useState();

  return (
    <Layout
      _header={{
        title:
          headerDetails && headerDetails.title
            ? headerDetails.title
            : "Class VI A",
        isEnableSearchBtn: true,
        // setSearch: setSearch,
        subHeading:
          headerDetails && headerDetails.subHeading ? (
            headerDetails.subHeading
          ) : (
            <BodyLarge>{t("Summative Assessment 1")}</BodyLarge>
          ),
        iconComponent: (
          <Avatar
            size="48px"
            borderRadius="md"
            source={{
              uri: "https://via.placeholder.com/50x50.png",
            }}
          />
        ),
      }}
      _appBar={{ languages: ["en"] }}
      subHeader={
        <VStack>
          <H3>
            {headerDetails && headerDetails.student
              ? headerDetails.student.name
              : "View All Students"}
          </H3>
          {headerDetails &&
            headerDetails.student &&
            headerDetails.student.fathersName && (
              <Caption color={colors.gray}>
                Mr. {headerDetails.student.fathersName}
              </Caption>
            )}
        </VStack>
      }
      _subHeader={{ bg: colors.cardBg, py: "6" }}
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
            title: "CLASSES",
            icon: "TeamLineIcon",
            module: "Registry",
            route: "/classes",
            routeparameters: {},
          },
          {
            title: "SCHOOL",
            icon: "GovernmentLineIcon",
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
            title: "CAREER",
            icon: "UserLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
        ],
      }}
    >
      <Stack space={1} mb="2" shadow={2}>
        <StudentsList setHeaderDetails={setHeaderDetails} />
      </Stack>
    </Layout>
  );
}
