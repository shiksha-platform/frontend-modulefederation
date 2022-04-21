import { capture, generateUUID, IconByName, Layout } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import manifest from "../manifest.json";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, FlatList, HStack, Stack, Text, VStack } from "native-base";
import { WeekWiesBar } from "components/CalendarBar";
import AttendanceComponent, {
  GetAttendance,
  MultipalAttendance,
  calendar,
} from "components/AttendanceComponent";
import * as studentServiceRegistry from "../services/studentServiceRegistry";
import * as classServiceRegistry from "../services/classServiceRegistry";
import moment from "moment";
import ButtonHOC from "atoms/ButtonHOC";
import LinkHOC from "atoms/LinkHOC";
import Loader from "atoms/Loader";
import FourOFour from "atoms/FourOFour";

export default function Attendance({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [weekPage, setWeekPage] = useState(0);
  const [allAttendanceStatus, setAllAttendanceStatus] = useState({});
  const [students, setStudents] = useState([]);
  const [searchStudents, setSearchStudents] = useState([]);
  const [classObject, setClassObject] = useState({});
  let { classId } = useParams();
  if (!classId) classId = "ee6afd98-785d-47e5-aa67-90b1eba1b5af";
  const [loding, setLoding] = useState(false);
  const [attendance, setAttendance] = useState([]);
  const [search, setSearch] = useState();
  const [isEditDisabled, setIsEditDisabled] = useState(true);
  const [sms, setSms] = useState([]);
  const teacherId = localStorage.getItem("id");
  const [attendanceStartTime, setAttendanceStartTime] = useState();
  const [unmarkStudents, setUnmarkStudents] = useState([]);

  useEffect(() => {
    let studentIds = attendance
      .filter((e) => e.attendance !== "Unmarked")
      .map((e) =>
        e?.studentId?.startsWith("1-")
          ? e?.studentId?.replace("1-", "")
          : e?.studentId
      );
    setUnmarkStudents(
      students.filter(
        (e) =>
          !studentIds.includes(
            e.id.startsWith("1-") ? e.id.replace("1-", "") : e.id
          )
      )
    );
  }, [attendance, students]);

  useEffect(() => {
    const filterStudent = students.filter((e) =>
      e?.fullName?.toLowerCase().match(search?.toLowerCase())
    );
    setSearchStudents(filterStudent);
  }, [search, students]);

  useEffect(() => {
    let ignore = false;
    async function getData() {
      const studentData = await studentServiceRegistry.getAll({ classId });

      setStudents(studentData);
      setSearchStudents(studentData);
      if (!ignore)
        setClassObject(await classServiceRegistry.getOne({ id: classId }));

      setSms(
        studentData.map((e, index) => ({
          type: index % 2 === 0 ? "Absent" : "Present",
          date: moment().add(-1, "days").format("Y-MM-DD"),
          studentId: e.id,
        }))
      );
    }
    getData();
    return () => {
      ignore = true;
    };
  }, [classId]);

  useEffect(() => {
    let ignore = false;
    async function getData() {
      if (!ignore) await getAttendance();
    }
    getData();
    return () => {
      ignore = true;
    };
  }, [weekPage]);

  const getAttendance = async (e) => {
    let weekdays = calendar(weekPage, "week");
    let params = {
      fromDate: weekdays?.[0]?.format("Y-MM-DD"),
      toDate: weekdays?.[weekdays.length - 1]?.format("Y-MM-DD"),
    };
    const attendanceData = await GetAttendance(params);
    setAttendance(attendanceData);
  };

  const newSetIsEditDisabled = (isEditDisabled) => {
    setIsEditDisabled(isEditDisabled);
    if (!isEditDisabled) {
      capture("START", {
        type: "Attendance-Start",
        eid: generateUUID(),
        $set: { id: teacherId },
        actor: {
          id: teacherId,
          type: "Teacher",
        },
        context: {
          type: appName ? appName : "Standalone",
        },
        edata: {
          type: "Attendance-Start",
          groupID: classId,
        },
      });
      setAttendanceStartTime(moment());
    } else {
      capture("END", {
        type: "Attendance-End",
        eid: generateUUID(),
        $set_once: { id: teacherId },
        actor: {
          id: teacherId,
          type: "Teacher",
        },
        context: {
          type: appName ? appName : "Standalone",
        },
        edata: {
          type: "Attendance-End",
          groupID: classId,
          duration: attendanceStartTime
            ? moment().diff(attendanceStartTime, "seconds")
            : 0,
          percentage:
            ((students?.length - unmarkStudents.length) / students?.length) *
            100,
        },
      });
      setAttendanceStartTime();
    }
  };

  if (!classObject && !classObject?.name) {
    return <FourOFour />;
  }

  if (loding) {
    return (
      <Loader
        success={allAttendanceStatus.success}
        fail={allAttendanceStatus.fail}
      />
    );
  }

  return (
    <Layout
      _header={{
        title: classObject?.title ? classObject?.title : "",
        isEnableSearchBtn: true,
        setSearch: setSearch,
        subHeading: t("ATTENDANCE_REGISTER"),
        iconComponent: (
          <LinkHOC
            to="/attendance/report"
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
          </LinkHOC>
        ),
      }}
      _appBar={{ languages: manifest.languages }}
      subHeader={
        <LinkHOC
          to={`/students/class/${classId}`}
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
        </LinkHOC>
      }
      _subHeader={{ bg: "attendanceCard.500" }}
      _footer={footerLinks}
    >
      <Stack space={1}>
        <Box bg="white" px="5" py="30">
          <HStack space="4" justifyContent="space-between" alignItems="center">
            <WeekWiesBar
              setPage={setWeekPage}
              page={weekPage}
              previousDisabled={
                parseInt(
                  -manifest.attendancePastDays / manifest.weekDays?.length
                ) > parseInt(weekPage - 1)
              }
              nextDisabled={weekPage >= 0}
              leftErrorText={
                !isEditDisabled
                  ? {
                      title:
                        "Please click on save before moving to the previous page.",
                      status: "error",
                      placement: "top",
                    }
                  : false
              }
              rightErrorText={
                !isEditDisabled
                  ? {
                      title:
                        "Please click on save before moving to the next page.",
                      status: "error",
                      placement: "top",
                    }
                  : false
              }
            />

            <ButtonHOC
              variant="ghost"
              colorScheme="button"
              endIcon={
                <IconByName
                  name={isEditDisabled ? "PencilLineIcon" : "CheckLineIcon"}
                  isDisabled
                />
              }
              _text={{ fontWeight: "400" }}
              onPress={(e) => {
                newSetIsEditDisabled(!isEditDisabled);
              }}
            >
              {isEditDisabled ? t("EDIT") : t("CANCEL")}
            </ButtonHOC>
          </HStack>
        </Box>
      </Stack>
      <Box bg="white" py="10px" px="5">
        <FlatList
          data={searchStudents}
          renderItem={({ item, index }) => (
            <AttendanceComponent
              hidePopUpButton={false}
              page={weekPage}
              student={item}
              sms={sms.filter((e) => e.studentId === item.id)}
              withDate={1}
              attendanceProp={attendance}
              getAttendance={getAttendance}
              isEditDisabled={isEditDisabled}
              appName
            />
          )}
          keyExtractor={(item, index) => (item?.id ? item?.id : index)}
        />
      </Box>
      <MultipalAttendance
        isWithEditButton={false}
        {...{
          students,
          attendance,
          getAttendance,
          setLoding,
          setAllAttendanceStatus,
          allAttendanceStatus,
          classId,
          classObject,
          isEditDisabled,
          setIsEditDisabled: newSetIsEditDisabled,
          appName,
        }}
      />
    </Layout>
  );
}
