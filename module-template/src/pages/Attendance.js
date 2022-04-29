import { IconByName, Layout } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, HStack, Text, VStack } from "native-base";

export default function Attendance() {
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

  return (
    <Layout
      _header={{
        title: classObject?.title ? classObject?.title : "",
        isEnableSearchBtn: true,
        setSearch: setSearch,
        subHeading: t("ATTENDANCE_REGISTER"),
        iconComponent: (
          <Link
            to="/classes/attendance/report"
            style={{ color: "rgb(63, 63, 70)", textDecoration: "none" }}
          >
            <Box
              rounded="full"
              borderColor="button.500"
              borderWidth="1"
              _text={{ color: "button.500" }}
              px={6}
              py={2}
            >
              {t("REPORT")}
            </Box>
          </Link>
        ),
      }}
      _appBar={{ languages: ["en"] }}
      subHeader={
        <Link
          to={"/students/class/" + classId}
          style={{ color: "rgb(63, 63, 70)", textDecoration: "none" }}
        >
          <HStack space="4" justifyContent="space-between">
            <VStack>
              <Text fontSize={"lg"}>
                {classObject?.title ? classObject?.title : ""}
              </Text>
              <Text fontSize={"sm"}>
                {t("TOTAL") + " " + students.length + " " + t("STUDENTS")}
              </Text>
            </VStack>
            <IconByName size="sm" name="ArrowRightSLineIcon" />
          </HStack>
        </Link>
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
      <div>Take Attendance</div>
    </Layout>
  );
}
