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

const PRESENT = "Present";
const ABSENT = "Absent";
const UNMARKED = "Unmarked";

const colors = overrideColorTheme(colorTheme);
const newMarkList = [
  {
    icon: "CheckboxCircleLineIcon",
    name: "MARK_PRESENT",
    attendance: PRESENT,
    color: "present",
  },
  {
    icon: "AwardLineIcon",
    name: "MARK_SPECIAL_DUTY",
    attendance: PRESENT,
    rightIcon: "ArrowRightSLineIcon",
    color: "special_duty",
  },
  {
    icon: "CloseCircleLineIcon",
    name: "MARK_ABSENT",
    attendance: ABSENT,
    color: "absent",
  },
];
const newSpecialDutyList = [
  {
    icon: "UserStarLineIcon",
    name: "ELECTION",
    color: "special_duty",
    attendance: PRESENT,
  },
  {
    icon: "BookMarkLineIcon",
    name: "EVALUATION",
    color: "special_duty",
    attendance: PRESENT,
  },
  {
    icon: "SearchEyeLineIcon",
    name: "INTERVIEW",
    color: "special_duty",
    attendance: PRESENT,
  },
  {
    icon: "StarLineIcon",
    name: "INVIGILITION",
    color: "special_duty",
    attendance: PRESENT,
  },
  {
    icon: "SpyLineIcon",
    name: "INSPECTION",
    color: "special_duty",
    attendance: PRESENT,
  },
  {
    icon: "StarLineIcon",
    name: "TRAINING",
    color: "special_duty",
    attendance: PRESENT,
  },
];

export default function SelfAttedanceSheet({
  children,
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

  const handleTelemetry = (newAttedance) => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Self-Attendance-End-Mark",
      startEventId: "2fd27a3a-27d6-481e-9ea5-24c5a976b0e9",
      end: "Filnal",
      duration: 10,
    });
    capture("END", telemetryData);
    if (newAttedance.attendance == UNMARKED) {
      setDone(false);
      setShowModal(false);
    } else {
      setDone(true);
    }
  };

  const handleResetToUnmarkTelemetry = (item) => {
    const newAttedance = {
      ...selfAttendance,
      attendance: UNMARKED,
      remark: "",
      name: t(item.name),
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
    if (image) {
      setLoding(true);
      setCameraUrl(image);
      let newAttedance = {
        ...selfAttendance,
        date: moment().format("YYYY-MM-DD"),
        studentId: localStorage.getItem("id"),
        image: image,
      };
      handleMarkAttendance(newAttedance);
    } else {
      setCameraUrl();
    }
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
          handleTelemetry(newAttedance);
          if (setAttendance) setAttendance(newAttedance);
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
          handleTelemetry(newAttedance);
          if (setAttendance) setAttendance(newAttedance);
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
        [PRESENT, ABSENT, UNMARKED].includes(e.attendance)
      );
      if (todayAttendance?.attendance) {
        let newAttedance = {
          ...todayAttendance,
          name:
            todayAttendance.attendance === PRESENT && todayAttendance.remark
              ? todayAttendance.remark
              : todayAttendance.attendance === PRESENT
              ? t("MARK_PRESENT")
              : todayAttendance.attendance === ABSENT
              ? t("MARK_ABSENT")
              : "",
        };
        setSelfAttendance(newAttedance);
        if (setAttendance) setAttendance(newAttedance);

        // if (todayAttendance?.attendance == (PRESENT || ABSENT)) {
        //   setMarkList([
        //     ...newMarkList,
        //     {
        //       icon: "RefreshLineIcon",
        //       name: "RESET_TO_UNMARK",
        //       attendance: UNMARKED,
        //       color: "gray",
        //     },
        //   ]);
        //   setSpecialDutyList([
        //     ...newSpecialDutyList,
        //     {
        //       icon: "RefreshLineIcon",
        //       name: "RESET_TO_UNMARK",
        //       attendance: UNMARKED,
        //       color: "gray",
        //     },
        //   ]);
        //  }
      }
    }
    getData();
    return () => {
      ignore = true;
    };
  }, []);

  const handleGoBack = () => {
    navigate("/");
    setDone(false);
    setCameraModal(false);
    setLocationModal(false);
    setShowModal(false);
    setCameraUrl();
  };

  const setAttendanceMark = (e) => {
    if (selfAttendance.attendance == ABSENT) {
      setLocationModal(false);
      setShowModal(true);
      setDone(true);
      setCameraModal(false);
      handleMarkAttendance(selfAttendance);
    } else if (
      selfAttendance.attendance == PRESENT &&
      selfAttendance.name === selfAttendance.remark
    ) {
      setLocationModal(false);
      setShowModal(true);
      setDone(true);
      setCameraModal(false);
      handleMarkAttendance(selfAttendance);
    }
    setLocationModal(true);
    setShowModal(false);
  };

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
            alt=""
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
              {selfAttendance.attendance === PRESENT &&
              selfAttendance.name !== selfAttendance.remark
                ? t("YOU_SUCCESS_UPLOAD_IMAGE_ATTENDANCE")
                : ""}
            </BodyMedium>
          </VStack>
          <Button _text={{ color: colors.white }} onPress={handleGoBack}>
            {t("GO_BACK")}
          </Button>
        </VStack>
      </Box>
    );
  }
  if (cameraModal) {
    return (
      <Camera
        {...{
          cameraModal,
          setCameraModal,
          cameraUrl,
          setCameraUrl: markSelfAttendance,
        }}
      />
    );
  }
  if (locationModal) {
    return (
      <>
        {children}
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
                <H2>{t("TURN_ON_DEVICE_LOCATION")}</H2>
                <BodyLarge>
                  {t("DEVICE_LOCATION_CANT_MARK_ATTENDANCE")}
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
                    {t("CANCEL")}
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
                    {t("TURN_ON")}
                  </Button>
                </Button.Group>
              </VStack>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </>
    );
  }
  return (
    <>
      {children}
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
                    handleResetToUnmarkTelemetry(item);
                  } else if (item.name === "MARK_SPECIAL_DUTY") {
                    setSpecialDutyModal(true);
                  } else {
                    setSelfAttendance({
                      ...selfAttendance,
                      attendance: item.attendance,
                      name: t(item.name),
                      remark: "",
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
              onPress={setAttendanceMark}
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
                    attendance: PRESENT,
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
