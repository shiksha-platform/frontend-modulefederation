import { Collapsible, IconByName, Layout } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, HStack, Text, VStack, Stack, Avatar } from "native-base";
import StudentsList from "../components/ExamScores/StudentsList";

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
          headerDetails && headerDetails.subHeading
            ? headerDetails.subHeading
            : t("Fill Scores"),
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
          <Text fontSize={"lg"}>
            {headerDetails && headerDetails.student
              ? headerDetails.student.name
              : "View All Students"}
          </Text>
          {headerDetails &&
            headerDetails.student &&
            headerDetails.student.fathersName && (
              <Text fontSize={"xs"} color={"muted.600"}>
                Mr. {headerDetails.student.fathersName}
              </Text>
            )}
        </VStack>
      }
      _subHeader={{ bg: "attendanceCard.500" }}
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
