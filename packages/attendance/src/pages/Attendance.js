import {
  capture,
  telemetryFactory,
  IconByName,
  Layout,
  calendar,
  H1,
  H3,
  classRegistryService,
  studentRegistryService,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import manifest from "../manifest.json";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, FlatList, HStack, Stack, VStack, Button } from "native-base";
import { WeekWiesBar } from "components/CalendarBar";
import AttendanceComponent, {
  GetAttendance,
  MultipalAttendance,
} from "components/AttendanceComponent";
import moment from "moment";
import Loader from "atoms/Loader";
import FourOFour from "atoms/FourOFour";
const PRESENT = "Present";
const ABSENT = "Absent";

export default function Attendance({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [weekPage, setWeekPage] = useState(0);
  const [allAttendanceStatus, setAllAttendanceStatus] = useState({});
  const [students, setStudents] = useState([]);
  const [searchStudents, setSearchStudents] = useState([]);
  const [classObject, setClassObject] = useState({});
  let { classId } = useParams();
  if (!classId) classId = "dee531ae-9db0-4989-b6a1-da60080679df";
  const [loading, setLoading] = useState(false);
  const [attendance, setAttendance] = useState([]);
  const [search, setSearch] = useState();
  const [isEditDisabled, setIsEditDisabled] = useState(true);
  const [sms, setSms] = useState([]);
  const teacherId = localStorage.getItem("id");
  const [attendanceStartTime, setAttendanceStartTime] = useState();
  const [unmarkStudents, setUnmarkStudents] = useState([]);
  const navigate = useNavigate();

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
      const studentData = await studentRegistryService.getAll({ classId });

      setStudents(studentData);
      setSearchStudents(studentData);
      if (!ignore)
        setClassObject(await classRegistryService.getOne({ id: classId }));

      setSms(
        studentData.map((e, index) => ({
          type: index % 2 === 0 ? ABSENT : PRESENT,
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
      const telemetryData = telemetryFactory.start({
        appName,
        type: "Attendance-Start",
        groupID: classId,
      });
      capture("START", telemetryData);
      setAttendanceStartTime(moment());
    } else {
      const telemetryData = telemetryFactory.end({
        appName,
        type: "Attendance-End",
        groupID: classId,
        duration: attendanceStartTime
          ? moment().diff(attendanceStartTime, "seconds")
          : 0,
        percentage:
          ((students?.length - unmarkStudents.length) / students?.length) * 100,
      });
      capture("END", telemetryData);
      setAttendanceStartTime();
    }
  };

  if (!classObject && !classObject?.name) {
    return <FourOFour />;
  }

  if (loading) {
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
          <Button
            variant="outline"
            rounded="full"
            px={5}
            py={1}
            bg="viewNotification.600"
            alignItems="center"
            rightIcon={<IconByName name="ArrowDownSLineIcon" isDisabled />}
            onPress={(e) => navigate("/attendance/report")}
          >
            {t("REPORT")}
          </Button>
        ),
      }}
      _appBar={{ languages: manifest.languages }}
      subHeader={
        <HStack p={1} space="4" justifyContent="space-between">
          <VStack>
            <H1 fontSize="16" fontWeight="600">
              {classObject?.title ? classObject?.title : ""}
            </H1>
            <H3 fontSize="12" fontWeight="400">
              {t("TOTAL") + " " + students.length + " " + t("STUDENTS")}
            </H3>
          </VStack>
          <IconByName
            size="sm"
            mt="8px"
            name="ArrowRightSLineIcon"
            onPress={(e) => navigate(`/students/class/${classId}`)}
          />
        </HStack>
      }
      _subHeader={{ bg: "attendanceCard.500" }}
      _footer={footerLinks}
    >
      <Stack space={1}>
        <Box bg="white" px="4" py="30">
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

            <Button
              variant="ghost"
              colorScheme="button"
              endIcon={
                <IconByName
                  name={isEditDisabled ? "PencilLineIcon" : "CheckLineIcon"}
                  isDisabled
                  _icon={{ width: "18", height: "18" }}
                  w="18px"
                  h="18px"
                />
              }
              _text={{
                fontSize: "14px",
                fontWeight: "500",
                textTransform: "capitalize",
              }}
              onPress={(e) => {
                newSetIsEditDisabled(!isEditDisabled);
              }}
            >
              {isEditDisabled ? t("EDIT") : t("CANCEL")}
            </Button>
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
          setLoading,
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
