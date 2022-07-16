import React from "react";
import {
  Modal,
  Avatar,
  Box,
  Button,
  Image,
  Pressable,
  Stack,
  VStack,
} from "native-base";
import {
  BodyLarge,
  capture,
  H1,
  IconByName,
  Layout,
  Widget,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import manifest from "../manifest.json";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const PRESENT = "Present";
const ABSENT = "Absent";
const UNMARKED = "Unmarked";

const SelfAttedanceSheet = React.lazy(() =>
  import("profile/SelfAttedanceSheet")
);

function Home({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = React.useState(false);
  const [popupModal, setPopupModal] = React.useState(true);
  let newAvatar = localStorage.getItem("firstName");
  const [selfAttendance, setSelfAttendance] = React.useState({});
  const navigate = useNavigate();

  let cameraUrl = "";
  let avatarUrlObject = cameraUrl
    ? {
        source: {
          uri: cameraUrl,
        },
      }
    : {};

  const widgetData = [
    {
      title: t("QUICK_CHECK"),
      data: [
        {
          title: t("TIME_TABLE"),
          subTitle: "2 " + t("FREE_PERIODS"),
          _box: {
            style: {
              background:
                "linear-gradient(281.03deg, #FC5858 -21.15%, #F8AF5A 100.04%)",
            },
          },
        },
        {
          title: t("CALENDAR"),
          subTitle: "8 " + t("HOLIDAYS"),
          _box: {
            style: {
              background:
                "linear-gradient(102.88deg, #D7BEE6 -5.88%, #B143F3 116.6%)",
            },
          },
        },
      ],
    },
    {
      title: t("TODAY_TASKS"),
      data: [
        {
          title: t("CLASSES"),
          link: "/classes",
          subTitle: "3 " + t("REMAINING"),
          icon: "ParentLineIcon",
          _box: {
            bg: "widgetColor.500",
          },
          _icon: {
            color: "iconColor.500",
          },
          _text: { color: "warmGray.700" },
        },
        {
          title: t("ACTIVITY"),
          subTitle: "1 " + t("REMAINING"),
          icon: "LightbulbFlashLineIcon",
          label: "NEW",
          _box: {
            bg: "widgetColor.600",
          },
          _icon: {
            color: "iconColor.600",
          },
          _text: { color: "warmGray.700" },
        },
        {
          title: t("HOLIDAYS"),
          subTitle: "2 " + t("THIS_WEEK"),
          icon: "FootballLineIcon",
          _box: {
            bg: "widgetColor.700",
          },
          _icon: {
            color: "iconColor.700",
          },
          _text: {
            color: "warmGray.700",
          },
        },
        {
          title: t("ATTENDANCE"),
          subTitle: "12 " + t("REMAINING"),
          icon: "UserFollowLineIcon",
          _box: {
            bg: "widgetColor.800",
          },
          _icon: {
            color: "iconColor.800",
          },
          _text: { color: "warmGray.700" },
        },
      ],
    },
    {
      title: t("THIS_WEEK_TASKS"),
      data: [
        {
          title: t("INSPECTION"),
          subTitle: "1 " + t("OFFICAL_VISIT"),
          icon: "Medal2LineIcon",
          _box: {
            bg: "widgetColor.900",
          },
          _icon: {
            color: "iconColor.900",
          },
          _text: { color: "warmGray.700" },
        },
        {
          title: t("ACTIVITY"),
          subTitle: "1 " + t("SCHOOL_ACTIVITY"),
          icon: "LightbulbFlashLineIcon",
          _box: {
            bg: "widgetColor.1000",
          },
          _icon: {
            color: "iconColor.1000",
          },
          _text: { color: "warmGray.700" },
        },
      ],
    },
  ];

  React.useEffect(() => {
    capture("PAGE");
  }, []);

  return (
    <SelfAttedanceSheet
      {...{
        showModal,
        setShowModal,
        setAttendance: setSelfAttendance,
        appName,
      }}
    >
      <Layout
        _header={{
          title: t("HOME"),
          subHeading: moment().format("hh:mm A"),
          _subHeading: { fontWeight: 500, textTransform: "uppercase" },
          iconComponent: (
            <Pressable onPress={(e) => setShowModal(true)}>
              {cameraUrl ? (
                <Image
                  ref={myRef}
                  {...avatarUrlObject}
                  rounded="lg"
                  alt="Profile"
                  size="50px"
                />
              ) : (
                <Avatar bg="amber.500" rounded="lg">
                  {newAvatar?.toUpperCase().substr(0, 2)}
                </Avatar>
              )}
              {selfAttendance?.attendance ? (
                <IconByName
                  name={
                    selfAttendance.attendance === PRESENT &&
                    selfAttendance?.remark !== ""
                      ? "AwardFillIcon"
                      : selfAttendance.attendance === ABSENT
                      ? "CloseCircleFillIcon"
                      : "CheckboxCircleFillIcon"
                  }
                  isDisabled
                  color={
                    selfAttendance.attendance === PRESENT &&
                    selfAttendance?.remark !== ""
                      ? "special_duty.500"
                      : selfAttendance.attendance === ABSENT
                      ? "absent.500"
                      : "present.500"
                  }
                  position="absolute"
                  bottom="-5px"
                  right="-5px"
                  bg="white"
                  rounded="full"
                />
              ) : (
                ""
              )}
            </Pressable>
          ),
        }}
        _appBar={{
          languages: manifest.languages,
          isShowNotificationButton: true,
        }}
        subHeader={t("THIS_IS_HOW_YOUR_DAY_LOOKS")}
        _subHeader={{
          bg: "white",
          pt: "30px",
          pb: "0px",
        }}
        _footer={footerLinks}
      >
        <Box bg="white" roundedBottom={"2xl"} py={6} px={4} mb={5} shadow={3}>
          <Stack>
            <VStack space={6}>
              {widgetData.map((item, index) => {
                return <Widget {...item} key={index} />;
              })}
            </VStack>
          </Stack>
        </Box>
        <Modal
          safeAreaTop={true}
          isOpen={popupModal}
          onClose={() => setPopupModal(false)}
        >
          <Modal.Content
            maxWidth="1024px"
            position="fixed"
            bottom="0"
            w="92%"
            mb="69px"
          >
            <VStack space={5} p="5">
              <H1>{t("HOW_TO_MARK_OWN_ATTENDANCE")}</H1>
              <BodyLarge>{t("HOW_TO_MARK_OWN_ATTENDANCE_MESSAGE")}</BodyLarge>
              <Button.Group>
                <Button
                  flex="1"
                  variant="outline"
                  fontSize="12px"
                  fontWeight="600"
                  colorScheme="button"
                  _text={{ textTransform: "capitalize" }}
                  onPress={(e) => setPopupModal(false)}
                >
                  {t("SKIP")}
                </Button>
                <Button
                  flex="1"
                  fontSize="12px"
                  fontWeight="600"
                  colorScheme="button"
                  _text={{ color: "white", textTransform: "capitalize" }}
                  onPress={(e) => {
                    setShowModal(true);
                    setPopupModal(false);
                  }}
                >
                  {t("NEXT")}
                </Button>
              </Button.Group>
            </VStack>
          </Modal.Content>
        </Modal>
      </Layout>
    </SelfAttedanceSheet>
  );
}
export default Home;
