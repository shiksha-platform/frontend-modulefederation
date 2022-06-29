import {
  capture,
  IconByName,
  Loading,
  telemetryFactory,
  useWindowSize,
  attendanceRegistryService,
  BodyMedium,
  BodyLarge,
  H2,
  H1,
  overrideColorTheme,
} from "@shiksha/common-lib";
import {
  Actionsheet,
  Box,
  Button,
  HStack,
  Image,
  Modal,
  Pressable,
  Stack,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Camera from "./Camera";
import moment from "moment";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);
const newMarkList = [
  {
    icon: "CheckboxCircleLineIcon",
    name: "MARK_PRESENT",
    attendance: "Present",
    color: "present",
  },
  {
    icon: "AwardLineIcon",
    name: "MARK_SPECIAL_DUTY",
    attendance: "Present",
    rightIcon: "ArrowRightSLineIcon",
    color: "special_duty",
  },
  {
    icon: "CloseCircleLineIcon",
    name: "MARK_ABSENT",
    attendance: "Absent",
    color: "absent",
  },
];
const newSpecialDutyList = [
  {
    icon: "UserStarLineIcon",
    name: "ELECTION",
    color: "special_duty",
    attendance: "Present",
  },
  {
    icon: "BookMarkLineIcon",
    name: "EVALUATION",
    color: "special_duty",
    attendance: "Present",
  },
  {
    icon: "SearchEyeLineIcon",
    name: "INTERVIEW",
    color: "special_duty",
    attendance: "Present",
  },
  {
    icon: "StarLineIcon",
    name: "INVIGILITION",
    color: "special_duty",
    attendance: "Present",
  },
  {
    icon: "SpyLineIcon",
    name: "INSPECTION",
    color: "special_duty",
    attendance: "Present",
  },
  {
    icon: "StarLineIcon",
    name: "TRAINING",
    color: "special_duty",
    attendance: "Present",
  },
];

export default function SelfAttedanceSheet({
  showModal,
  setShowModal,
  setAttendance,
  appName,
}) {
  const { t } = useTranslation();
  const [specialDutyModal, setSpecialDutyModal] = React.useState(false);
  const [markList, setMarkList] = React.useState([]);
  const [specialDutyList, setSpecialDutyList] = React.useState([]);
  const [cameraModal, setCameraModal] = React.useState(false);
  const [locationModal, setLocationModal] = React.useState(false);
  const [cameraUrl, setCameraUrl] = React.useState();
  const [done, setDone] = React.useState();
  const [width, height] = useWindowSize();
  const myRef = React.useRef(null);
  const [loding, setLoding] = React.useState(false);
  const [selfAttendance, setSelfAttendance] = React.useState({});
  const navigate = useNavigate();
  const handleTelemetry = () => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Self-Attendance-End-Mark",
      startEventId: "2fd27a3a-27d6-481e-9ea5-24c5a976b0e9",
      end: "Filnal",
      duration: 10,
    });
    capture("END", telemetryData);
    setDone(true);
  };

  const handleResetToUnmarkTelemetry = () => {
    const newAttedance = {
      ...selfAttendance,
      attendance: "Unmarked",
      remark: "",
    };
    setSelfAttendance(newAttedance);
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Self-Attendance-Reset-To-Unmarked",
    });
    capture("INTERACT", telemetryData);
    handleMarkAttendance(newAttedance);
  };

  const markSelfAttendance = (image) => {
    setLoding(true);
    setCameraUrl(image);
    let newAttedance = {
      ...selfAttendance,
      date: moment().format("YYYY-MM-DD"),
      studentId: localStorage.getItem("id"),
      image: image,
    };
    handleMarkAttendance(newAttedance);
  };

  const handleMarkAttendance = (newAttedance) => {
    if (newAttedance.id) {
      attendanceRegistryService
        .update(
          {
            ...newAttedance,
            id: newAttedance.id,
            attendance: newAttedance.attendance,
            remark: newAttedance.remark,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            onlyParameter: [
              "schoolId",
              "studentId",
              "topicId",
              "attendance",
              "date",
              "classId",
              "teacherId",
              "admissionNo",
              "currentClassID",
              "email",
              "remark",
              "latitude",
              "longitude",
              "image",
            ],
          }
        )
        .then((e) => {
          setLoding(false);
          handleTelemetry();
          setAttendance(newAttedance);
        });
    } else {
      attendanceRegistryService
        .create(newAttedance, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((e) => {
          setLoding(false);
          handleTelemetry();
          setAttendance(newAttedance);
        });
    }
  };

  React.useEffect(() => {
    let ignore = false;
    async function getData() {
      setMarkList(newMarkList);
      setSpecialDutyList(newSpecialDutyList);
      const todayAttendanceResult = await attendanceRegistryService.getAll({
        fromDate: moment().format("YYYY-MM-DD"),
        toDate: moment().format("YYYY-MM-DD"),
        userId: localStorage.getItem("id"),
      });
      const todayAttendance = todayAttendanceResult.find((e) =>
        ["Present", "Absent", "Unmarked"].includes(e.attendance)
      );
      if (todayAttendance?.attendance) {
        let newAttedance = {
          ...todayAttendance,
          name:
            todayAttendance.attendance === "Present" && todayAttendance.remark
              ? todayAttendance.remark
              : todayAttendance.attendance === "Present"
              ? t("MARK_PRESENT")
              : todayAttendance.attendance === "Absent"
              ? t("MARK_ABSENT")
              : "",
        };
        setSelfAttendance(newAttedance);
        setAttendance(newAttedance);

        if (todayAttendance?.attendance !== "Unmarked") {
          setMarkList([
            ...newMarkList,
            {
              icon: "RefreshLineIcon",
              name: "RESET_TO_UNMARK",
              attendance: "Unmarked",
              color: colors.gray,
            },
          ]);
          setSpecialDutyList([
            ...newSpecialDutyList,
            {
              icon: "RefreshLineIcon",
              name: "RESET_TO_UNMARK",
              attendance: "Unmarked",
              color: colors.gray,
            },
          ]);
        }
      }
    }
    getData();
    return () => {
      ignore = true;
    };
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((e) => {
        setSelfAttendance({
          ...selfAttendance,
          latitude: e.coords.latitude,
          longitude: e.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  if (loding) {
    return (
      <Box
        position="fixed"
        zIndex={100}
        {...{ width, height }}
        bg={colors.white}
        justifyContent="center"
        p="5"
      >
        <Loading />
      </Box>
    );
  }
  if (done) {
    return (
      <Box
        position="fixed"
        zIndex={100}
        {...{ width, height }}
        bg={colors.white}
        justifyContent="center"
        p="5"
      >
        <VStack space="55px" alignItems="center">
          <Image
            ref={myRef}
            source={{
              uri: cameraUrl,
            }}
            rounded="full"
            alt="Profile"
            size="250px"
          />
          <VStack space="3" alignItems="center">
            <IconByName
              name="CheckboxCircleLineIcon"
              color={colors.present}
              _icon={{
                size: "47px",
              }}
            />
            <H1 color={colors.present}>{t("ATTENDANCE_MARKED")}</H1>
            <BodyMedium textAlign="center">
              {t("YOU_SUCCESS_UPLOAD_IMAGE_ATTENDANCE")}
            </BodyMedium>
          </VStack>
          <Button
            _text={{ color: colors.white }}
            onPress={(e) => navigate("/")}
          >
            {t("BACK_TO_HOME")}
          </Button>
        </VStack>
      </Box>
    );
  }

  return (
    <>
      <Camera
        {...{
          cameraModal,
          setCameraModal,
          cameraUrl,
          setCameraUrl: markSelfAttendance,
        }}
      />
      <Modal isOpen={locationModal} onClose={() => setLocationModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.Body>
            <VStack space="6" textAlign="center" py="20px" px="30px">
              <IconByName
                alignSelf="center"
                name="MapPinLineIcon"
                isDisabled
                color={colors.primary}
                _icon={{
                  size: "60px",
                }}
              />
              <H2>Turn on device location.</H2>
              <BodyLarge>
                Attendance marking requires to log in your device location.
                Without location, the app can't mark your attendance.
              </BodyLarge>
              <Button.Group space={2}>
                <Button
                  flex={1}
                  variant="outline"
                  onPress={() => {
                    setLocationModal(false);
                    setShowModal(true);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  flex={1}
                  _text={{ color: colors.white }}
                  onPress={() => {
                    getLocation();
                    setLocationModal(false);
                    setCameraModal(true);
                  }}
                >
                  Turn On
                </Button>
              </Button.Group>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Actionsheet isOpen={showModal} onClose={() => setShowModal(false)}>
        <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="10px">
              <H2>{t("ATTENDANCE")}</H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              onPress={(e) => setShowModal(false)}
              color={colors.cardCloseIcon}
            />
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" justifyContent="center" bg={colors.white}>
          {markList.map((item, index) => {
            let isActive =
              selfAttendance?.name === t(item.name) ||
              (specialDutyList.some(
                (e) => t(e.name) === selfAttendance?.name
              ) &&
                item.color === "special_duty");
            return (
              <Pressable
                key={index}
                p={3}
                bg={selfAttendance?.name === t(item.name) ? "gray.100" : ""}
                onPress={(e) => {
                  if (item.name === "RESET_TO_UNMARK") {
                    handleResetToUnmarkTelemetry();
                  } else if (item.name === "MARK_SPECIAL_DUTY") {
                    setSpecialDutyModal(true);
                  } else {
                    setSelfAttendance({
                      ...selfAttendance,
                      attendance: item.attendance,
                      name: t(item.name),
                    });
                  }
                }}
              >
                <HStack
                  alignItems="center"
                  space={2}
                  width="100%"
                  justifyContent={"space-between"}
                >
                  <HStack alignItems="center" space={2}>
                    <IconByName
                      name={item.icon}
                      isDisabled
                      mt="1"
                      p="5px"
                      rounded="full"
                      bg={isActive ? item.color + ".500" : colors.white}
                      colorScheme={isActive ? item.color : colors.gray}
                      color={isActive ? colors.white : colors.isActive}
                      _icon={{ size: "18" }}
                    />
                    <BodyLarge>{t(item.name)}</BodyLarge>
                  </HStack>

                  {item.rightIcon ? (
                    <IconByName
                      name={item.rightIcon}
                      _icon={{ size: 18 }}
                      isDisabled
                    />
                  ) : (
                    ""
                  )}
                </HStack>
              </Pressable>
            );
          })}

          <Button.Group m="5">
            <Button
              flex="1"
              mr="5px"
              colorScheme="button"
              variant={"outline"}
              onPress={(e) => navigate("/profile")}
              _text={{ textTransform: "uppercase" }}
            >
              {t("GO_TO_PROFILE")}
            </Button>
            <Button
              flex="1"
              ml="5px"
              colorScheme={
                selfAttendance?.attendance ? "button" : colors.primaryColorgray
              }
              isDisabled={selfAttendance?.attendance ? false : true}
              _text={{
                textTransform: "uppercase",
                color: selfAttendance?.attendance ? colors.white : "",
              }}
              onPress={(e) => {
                setLocationModal(true);
                setShowModal(false);
              }}
            >
              {t("MARK")}
            </Button>
          </Button.Group>
        </Box>
      </Actionsheet>
      <Actionsheet
        isOpen={specialDutyModal}
        onClose={() => setSpecialDutyModal(false)}
      >
        <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
          <HStack justifyContent={"space-between"}>
            <HStack pt={2} pb="5px" alignItems="center">
              <IconByName
                name="ArrowLeftSLineIcon"
                onPress={(e) => setSpecialDutyModal(false)}
                color={colors.cardCloseIcon}
              />
              <H2>{t("SELECT_DUTY_TYPE")}</H2>
            </HStack>
            <IconByName
              name="CloseCircleLineIcon"
              onPress={(e) => setSpecialDutyModal(false)}
              color={colors.cardCloseIcon}
            />
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" justifyContent="center" bg="white">
          {specialDutyList.map((item, index) => (
            <Pressable
              key={index}
              bg={selfAttendance?.name === t(item.name) ? "gray.100" : ""}
              p={3}
              onPress={(e) => {
                if (item.name === "RESET_TO_UNMARK") {
                  setSelfAttendance({});
                } else {
                  setSelfAttendance({
                    ...selfAttendance,
                    attendance: "Present",
                    remark: t(item.name),
                    name: t(item.name),
                  });
                }
              }}
            >
              <HStack
                alignItems="center"
                space={2}
                width="100%"
                justifyContent={"space-between"}
              >
                <HStack alignItems="center" space={2}>
                  <IconByName
                    name={item.icon}
                    isDisabled
                    mt="1"
                    p="5px"
                    rounded="full"
                    bg={
                      selfAttendance?.name === t(item.name)
                        ? item.color + ".500"
                        : "gray.100"
                    }
                    colorScheme={
                      selfAttendance?.name === t(item.name)
                        ? item.color
                        : "gray"
                    }
                    color={
                      selfAttendance?.name === t(item.name)
                        ? colors.white
                        : "gray.500"
                    }
                    _icon={{ size: "18" }}
                  />
                  <BodyLarge>{t(item.name)}</BodyLarge>
                </HStack>

                {item.rightIcon ? (
                  <IconByName name={item.rightIcon} isDisabled />
                ) : (
                  ""
                )}
              </HStack>
            </Pressable>
          ))}

          <Button.Group m="5">
            <Button
              flex="1"
              mr="5px"
              colorScheme="button"
              variant={"outline"}
              onPress={(e) => navigate("/profile")}
            >
              {t("GO_TO_PROFILE")}
            </Button>
            <Button
              flex="1"
              ml="5px"
              colorScheme="button"
              _text={{ color: colors.white }}
              onPress={(e) => setSpecialDutyModal(false)}
            >
              {t("MARK")}
            </Button>
          </Button.Group>
        </Box>
      </Actionsheet>
    </>
  );
}
