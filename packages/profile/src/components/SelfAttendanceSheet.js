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
  getApiConfig,
  getArray,
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
  VStack,
} from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Camera from "./Camera";
import moment from "moment";

const PRESENT = "Present";
const ABSENT = "Absent";
const UNMARKED = "Unmarked";
const ON_LEAVE = "Onleave";

const newMarkList = [
  {
    icon: "CheckboxCircleLineIcon",
    name: "MARK_PRESENT",
    attendance: PRESENT,
    color: "profile.present",
    value: "Present",
  },
  {
    icon: "AwardLineIcon",
    name: "MARK_SPECIAL_DUTY",
    attendance: PRESENT,
    rightIcon: "ArrowRightSLineIcon",
    color: "profile.specialDuty",
    value: "Specialduty",
  },
  {
    icon: "CloseCircleLineIcon",
    name: "MARK_ABSENT",
    attendance: ABSENT,
    color: "profile.absent",
    value: "Absent",
  },
  {
    icon: "UserUnfollowLineIcon",
    name: "MARK_ON_LEAVE",
    attendance: ON_LEAVE,
    color: "profile.absent",
    value: "Onleave",
  },
];
const newSpecialDutyList = [
  {
    icon: "UserStarLineIcon",
    name: "ELECTION",
    color: "profile.specialDuty",
    attendance: PRESENT,
    value: "election",
  },
  {
    icon: "BookMarkLineIcon",
    name: "EVALUATION",
    color: "profile.specialDuty",
    attendance: PRESENT,
    value: "evaluation",
  },
  {
    icon: "SearchEyeLineIcon",
    name: "INTERVIEW",
    color: "profile.specialDuty",
    attendance: PRESENT,
    value: "interview",
  },
  {
    icon: "StarLineIcon",
    name: "INVIGILITION",
    color: "profile.specialDuty",
    attendance: PRESENT,
    value: "invigilation",
  },
  {
    icon: "SpyLineIcon",
    name: "INSPECTION",
    color: "profile.specialDuty",
    attendance: PRESENT,
    value: "inspection",
  },
  {
    icon: "StarLineIcon",
    name: "TRAINING",
    color: "profile.specialDuty",
    attendance: PRESENT,
    value: "training",
  },
];

export default function SelfAttendanceSheet({
  children,
  showModal,
  setShowModal,
  setAttendance,
  appName,
  setAlert,
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
  const [config, setConfig] = React.useState({});
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
        })
        .catch((e) => {
          setLoding(false);
          setCameraModal(false);
          setLocationModal(false);
          setAlert ? setAlert(e.message) : console.log(e.message);
        });
    } else {
      newAttedance = {
        ...newAttedance,
        date: moment().format("YYYY-MM-DD"),
        studentId: localStorage.getItem("id"),
      };
      setSelfAttendance(newAttedance);
      attendanceRegistryService
        .create(newAttedance, {
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
        })
        .then((e) => {
          setLoding(false);
          handleTelemetry(newAttedance);
          setSelfAttendance({ ...newAttedance, id: e });
          if (setAttendance) setAttendance(newAttedance);
        })
        .catch((e) => {
          setLoding(false);
          setCameraModal(false);
          setLocationModal(false);
          setAlert ? setAlert(e.message) : console.log(e.message);
        });
    }
  };

  React.useEffect(() => {
    let ignore = false;
    async function getData() {
      let newConfig = await getApiConfig(["attendance"]);
      setConfig(newConfig);
      const status = getArray(newConfig["attendance_states_of_staff"]);
      const newData = newMarkList.filter((e) => {
        return status.includes(e.value);
      });
      setMarkList(newData);

      const specialDutyStatus = getArray(newConfig["specialDuties"]);
      const newDataSpecialDuty = newSpecialDutyList.filter((e) => {
        return specialDutyStatus.includes(e.value);
      });
      setSpecialDutyList(newDataSpecialDuty);
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
    } else if (config && config["captureLocation"] === "true") {
      setLocationModal(true);
    } else if (config && config["capture_selfie"] === "true") {
      setCameraModal(true);
    } else {
      setDone(true);
      handleMarkAttendance(selfAttendance);
    }
    setShowModal(false);
  };

  const getLocation = async (returnData = false) => {
    const getPosition = () => {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    };
    var data = {};
    if (navigator.geolocation) {
      var position = await getPosition();
      if (!returnData) {
        setSelfAttendance({
          ...selfAttendance,
          latitude: position?.coords?.latitude,
          longitude: position?.coords?.longitude,
        });
      } else {
        data = {
          latitude: position?.coords?.latitude,
          longitude: position?.coords?.longitude,
        };
      }
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    return data;
  };

  if (showModal && config && config["captureSelfAttendace"] === "false") {
    return (
      <>
        {children}
        <Modal safeAreaTop={true} isOpen={showModal}>
          <Modal.Content
            maxWidth="1024px"
            position="fixed"
            bottom="0"
            w="92%"
            mb="69px"
          >
            <VStack space={5} p="5">
              <H1>{t("Can't mark self attendance")}</H1>
              <Button.Group>
                <Button
                  flex="1"
                  fontSize="12px"
                  fontWeight="600"
                  colorScheme="button"
                  _text={{
                    color: "profile.white",
                    textTransform: "capitalize",
                  }}
                  onPress={(e) => {
                    setShowModal(false);
                  }}
                >
                  {t("CLOSE")}
                </Button>
                <Button
                  flex="1"
                  mr="5px"
                  colorScheme="button"
                  variant={"outline"}
                  onPress={(e) => {
                    navigate("/profile");
                    setShowModal(false);
                  }}
                >
                  {t("GO_TO_PROFILE")}
                </Button>
              </Button.Group>
            </VStack>
          </Modal.Content>
        </Modal>
      </>
    );
  }

  if (loding) {
    return (
      <Box
        position="fixed"
        zIndex={100}
        {...{ width, height }}
        bg={"profile.white"}
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
        bg={"profile.white"}
        justifyContent="center"
        p="5"
      >
        <VStack space="55px" alignItems="center">
          {cameraUrl ? (
            <Image
              ref={myRef}
              source={{
                uri: cameraUrl,
              }}
              rounded="full"
              alt=""
              size="250px"
            />
          ) : (
            <React.Fragment />
          )}
          <VStack space="3" alignItems="center">
            <IconByName
              name="CheckboxCircleLineIcon"
              color={"profile.present"}
              _icon={{
                size: "47px",
              }}
            />
            <H1 color={"profile.present"}>{t("ATTENDANCE_MARKED")}</H1>
            <BodyMedium textAlign="center" textTransform="inherit">
              {selfAttendance.attendance === PRESENT &&
              selfAttendance.name !== selfAttendance.remark
                ? config && config["capture_selfie"] === "true"
                  ? t("YOU_SUCCESS_UPLOAD_IMAGE_ATTENDANCE")
                  : t("YOU_SUCCESS_ATTENDANCE")
                : ""}
            </BodyMedium>
          </VStack>
          <Button _text={{ color: "profile.white" }} onPress={handleGoBack}>
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
                  color={"profile.primary"}
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
                    _text={{ color: "profile.white" }}
                    onPress={async () => {
                      setLocationModal(false);
                      if (config && config["capture_selfie"] === "true") {
                        getLocation();
                        setCameraModal(true);
                      } else {
                        const location = await getLocation(true);
                        handleMarkAttendance({
                          ...selfAttendance,
                          ...location,
                        });
                      }
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
        <Actionsheet.Content alignItems={"left"} bg={"profile.cardBg"}>
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="10px">
              <H2>{t("ATTENDANCE")}</H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              onPress={(e) => setShowModal(false)}
              color={"profile.cardCloseIcon"}
            />
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" justifyContent="center" bg={"profile.white"}>
          {markList.map((item, index) => {
            let isActive =
              selfAttendance?.name === t(item.name) ||
              (specialDutyList.some(
                (e) => t(e.name) === selfAttendance?.name
              ) &&
                item.color === "profile.specialDuty");
            return (
              <Pressable
                key={index}
                p={3}
                bg={
                  selfAttendance?.name === t(item.name)
                    ? "profile.lightGray5"
                    : ""
                }
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
                      bg={isActive ? item.color : "profile.white"}
                      colorScheme={isActive ? item.color : "profile.gray"}
                      color={isActive ? "profile.white" : "profile.isActive"}
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
                selfAttendance?.attendance ? "button" : "profile.lightGray6"
              }
              isDisabled={selfAttendance?.attendance ? false : true}
              _text={{
                textTransform: "uppercase",
                color: selfAttendance?.attendance ? "profile.white" : "",
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
        <Actionsheet.Content alignItems={"left"} bg={"profile.cardBg"}>
          <HStack justifyContent={"space-between"}>
            <HStack pt={2} pb="5px" alignItems="center">
              <IconByName
                name="ArrowLeftSLineIcon"
                onPress={(e) => setSpecialDutyModal(false)}
                color={"profile.cardCloseIcon"}
              />
              <H2>{t("SELECT_DUTY_TYPE")}</H2>
            </HStack>
            <IconByName
              name="CloseCircleLineIcon"
              onPress={(e) => setSpecialDutyModal(false)}
              color={"profile.cardCloseIcon"}
            />
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" justifyContent="center" bg="profile.white">
          {specialDutyList.map((item, index) => (
            <Pressable
              key={index}
              bg={
                selfAttendance?.name === t(item.name)
                  ? "profile.lightGray5"
                  : ""
              }
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
                        ? item.color
                        : "profile.lightGray5"
                    }
                    colorScheme={
                      selfAttendance?.name === t(item.name)
                        ? item.color
                        : "profile.lightGray0"
                    }
                    color={
                      selfAttendance?.name === t(item.name)
                        ? "profile.white"
                        : "profile.lightGray0"
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
              _text={{ color: "profile.white" }}
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
