import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import {
  Actionsheet,
  Box,
  Button,
  HStack,
  Modal,
  Pressable,
  Stack,
  Text,
  VStack,
} from "native-base";

import AppBar from "./AppBar";

import { useTranslation } from "react-i18next";
import IconByName from "../IconByName";
import { Link } from "react-router-dom";
import Camera from "../Camera";

export default function Layout({
  isDisabledAppBar,
  subHeader,
  children,
  imageUrl,
  showModal,
  setShowModal,
  _appBar,
  _header,
  _subHeader,
  _footer,
}) {
  const [show, setShow] = React.useState(false);
  let selfAttendance = localStorage.getItem("selfAttendance");
  let attMarkSheetAttr;
  if (showModal && setShowModal) {
    attMarkSheetAttr = { showModal, setShowModal, selfAttendance };
  } else {
    attMarkSheetAttr = {
      showModal: show,
      setShowModal: setShow,
      selfAttendance,
    };
  }

  return (
    <>
      <AttendanceMarkSheet {...attMarkSheetAttr} />
      <Stack
        width={"100%"}
        style={{
          backgroundImage: imageUrl
            ? "url(" + imageUrl + ")"
            : "url(" + window.location.origin + "/headerBg.png)",
          backgroundColor: "transparent",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        space={5}
      >
        {!isDisabledAppBar ? (
          <AppBar color={imageUrl ? "white" : ""} {..._appBar} />
        ) : (
          <></>
        )}
        {_header ? (
          <Header {..._header} setShowModal={attMarkSheetAttr.setShowModal} />
        ) : (
          <></>
        )}
      </Stack>
      {subHeader ? (
        <Box
          {...{
            p: 4,
            position: "relative",
            bg: "purple.400",
            roundedTop: "20",
            _text: { textTransform: "inherit" },
          }}
          {..._subHeader}
        >
          {subHeader}
        </Box>
      ) : (
        <></>
      )}
      {children}
      <Footer {..._footer} />
    </>
  );
}

const AttendanceMarkSheet = ({ showModal, setShowModal, selfAttendance }) => {
  const { t } = useTranslation();
  const [specialDutyModal, setSpecialDutyModal] = React.useState(false);
  const [markAttendance, setMarkAttendance] = React.useState(selfAttendance);
  const [markList, setMarkList] = React.useState([]);
  const [specialDutyList, setSpecialDutyList] = React.useState([]);
  const [cameraModal, setCameraModal] = React.useState(false);
  const [locationModal, setLocationModal] = React.useState(false);
  const [cameraUrl, setCameraUrl] = React.useState();

  const markSelfAttendance = () => {
    if (markAttendance) {
      localStorage.setItem("selfAttendance", markAttendance);
      setLocationModal(true);
    } else {
      localStorage.removeItem("selfAttendance");
    }
    setShowModal(false);
  };

  React.useEffect(() => {
    let newMarkList = [
      {
        icon: "CheckboxCircleLineIcon",
        name: "MARK_PRESENT",
        color: "present",
      },
      {
        icon: "AwardLineIcon",
        name: "MARK_SPECIAL_DUTY",
        rightIcon: "ArrowRightSLineIcon",
        color: "special_duty",
      },
      {
        icon: "CloseCircleLineIcon",
        name: "MARK_ABSENT",
        color: "absent",
      },
    ];
    let newSpecialDutyList = [
      { icon: "UserStarLineIcon", name: "ELECTION", color: "special_duty" },
      { icon: "BookMarkLineIcon", name: "EVALUATION", color: "special_duty" },
      { icon: "SearchEyeLineIcon", name: "INTERVIEW", color: "special_duty" },
      { icon: "StarLineIcon", name: "INVIGILITION", color: "special_duty" },
      { icon: "SpyLineIcon", name: "INSPECTION", color: "special_duty" },
      { icon: "StarLineIcon", name: "TRAINING", color: "special_duty" },
    ];
    if (markAttendance) {
      newMarkList = [
        ...newMarkList,
        {
          icon: "RefreshLineIcon",
          name: "RESET_TO_UNMARK",
          color: "gray",
        },
      ];
      newSpecialDutyList = [
        ...newSpecialDutyList,
        {
          icon: "RefreshLineIcon",
          name: "RESET_TO_UNMARK",
          color: "gray",
        },
      ];
    }
    setMarkList(newMarkList);
    setSpecialDutyList(newSpecialDutyList);
  }, [markAttendance]);

  return (
    <>
      <Camera {...{ cameraModal, setCameraModal, cameraUrl, setCameraUrl }} />
      <Modal isOpen={locationModal} onClose={() => setLocationModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.Body>
            <VStack space="6" textAlign="center" py="20px" px="30px">
              <IconByName
                alignSelf="center"
                name="MapPinLineIcon"
                isDisabled
                color="button.500"
                _icon={{
                  size: "60px",
                }}
              />
              <Text fontSize="18px" fontWeight={"600"}>
                Turn on device location.
              </Text>
              <Text fontSize="14px" fontWeight={"500"}>
                Attendance marking requires to log in your device location.
                Without location, the app can't mark your attendance.
              </Text>
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
                  _text={{ color: "white" }}
                  onPress={() => {
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
        <Actionsheet.Content alignItems={"left"} bg="classCard.500">
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="25px">
              <Text fontSize="16px" fontWeight={"600"}>
                {t("ATTENDANCE")}
              </Text>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              onPress={(e) => setShowModal(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" justifyContent="center" bg="white">
          {markList.map((item, index) => (
            <Pressable
              key={index}
              p={5}
              onPress={(e) => {
                if (item.name === "RESET_TO_UNMARK") {
                  setMarkAttendance();
                } else if (item.name === "MARK_SPECIAL_DUTY") {
                  setSpecialDutyModal(true);
                } else {
                  setMarkAttendance(item.name);
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
                      markAttendance === item.name ||
                      (specialDutyList.some((e) => e.name === markAttendance) &&
                        item.color === "special_duty")
                        ? item.color + ".500"
                        : "gray.100"
                    }
                    colorScheme={
                      markAttendance === item.name ||
                      (specialDutyList.some((e) => e.name === markAttendance) &&
                        item.color === "special_duty")
                        ? item.color
                        : "gray"
                    }
                    color={
                      markAttendance === item.name ||
                      (specialDutyList.some((e) => e.name === markAttendance) &&
                        item.color === "special_duty")
                        ? "white"
                        : "gray.500"
                    }
                    _icon={{ size: "18" }}
                  />
                  <Text fontSize="14px" fontWeight={500}>
                    {t(item.name)}
                  </Text>
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
            <Link
              style={{
                textDecoration: "none",
                flex: "1",
              }}
              to={"/profile"}
            >
              <Button colorScheme="button" variant={"outline"}>
                {t("GO_TO_PROFILE")}
              </Button>
            </Link>
            <Button
              flex="1"
              colorScheme={markAttendance ? "button" : "gray"}
              _text={{ color: "white" }}
              onPress={(e) => markSelfAttendance()}
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
        <Actionsheet.Content alignItems={"left"} bg="classCard.500">
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="25px">
              <Text fontSize="16px" fontWeight={"600"}>
                {t("SELECT_DUTY_TYPE")}
              </Text>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              onPress={(e) => setSpecialDutyModal(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" justifyContent="center" bg="white">
          {specialDutyList.map((item, index) => (
            <Pressable
              key={index}
              p={5}
              onPress={(e) => {
                if (item.name === "RESET_TO_UNMARK") {
                  setMarkAttendance();
                } else {
                  setMarkAttendance(item.name);
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
                      markAttendance === item.name
                        ? item.color + ".500"
                        : "gray.100"
                    }
                    colorScheme={
                      markAttendance === item.name ? item.color : "gray"
                    }
                    color={markAttendance === item.name ? "white" : "gray.500"}
                    _icon={{ size: "18" }}
                  />
                  <Text fontSize="14px" fontWeight={500}>
                    {t(item.name)}
                  </Text>
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
            <Link
              style={{
                textDecoration: "none",
                flex: "1",
              }}
              to={"/profile"}
            >
              <Button colorScheme="button" variant={"outline"}>
                {t("GO_TO_PROFILE")}
              </Button>
            </Link>
            <Button
              flex="1"
              colorScheme="button"
              _text={{ color: "white" }}
              onPress={(e) => setSpecialDutyModal(false)}
            >
              {t("MARK")}
            </Button>
          </Button.Group>
        </Box>
      </Actionsheet>
    </>
  );
};
