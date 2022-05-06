import React from "react";
import { Avatar, Box, Image, Pressable, Stack, VStack } from "native-base";
import { capture, IconByName, Layout, Widget } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import manifest from "../manifest.json";
import moment from "moment";

const SelfAttedanceSheet = React.lazy(() =>
  import("profile/SelfAttedanceSheet")
);

function Home({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = React.useState(false);
  let newAvatar = localStorage.getItem("firstName");
  const [selfAttendance, setSelfAttendance] = React.useState({});

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
          subTitle: "3 " + t("REMAINING"),
          icon: "ParentLineIcon",
          _box: {
            bg: "violet.200",
          },
          _text: { color: "warmGray.700" },
        },
        {
          title: t("ACTIVITY"),
          subTitle: "1 " + t("REMAINING"),
          icon: "LightbulbFlashLineIcon",
          _box: {
            bg: "orange.200",
          },
          _text: { color: "warmGray.700" },
        },
        {
          title: t("HOLIDAYS"),
          subTitle: "2 " + t("THIS_WEEK"),
          icon: "FootballLineIcon",
          _box: {
            bg: "blue.200",
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
            bg: "green.200",
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
            bg: "orange.200",
          },
          _text: { color: "warmGray.700" },
        },
        {
          title: t("ACTIVITY"),
          subTitle: "1 " + t("SCHOOL_ACTIVITY"),
          icon: "LightbulbFlashLineIcon",
          _box: {
            bg: "violet.200",
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
    <>
      <Layout
        _header={{
          title: t("HOME"),
          icon: "Group",
          subHeading: moment().format("hh:mm a"),
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
                  name="CheckboxCircleFillIcon"
                  isDisabled
                  color="present.500"
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
        _appBar={{ languages: manifest.languages }}
        subHeader={t("THIS_IS_HOW_YOUR_DAY_LOOKS")}
        _subHeader={{
          bg: "classCard.500",
          _text: {
            fontSize: "16px",
            fontWeight: "600",
            textTransform: "inherit",
          },
        }}
        _footer={footerLinks}
      >
        <SelfAttedanceSheet
          {...{
            showModal,
            setShowModal,
            setAttendance: setSelfAttendance,
            appName,
          }}
        />
        <Box bg="white" roundedBottom={"2xl"} py={6} px={4} shadow={3}>
          <Stack>
            <VStack space={6}>
              {widgetData.map((item, index) => {
                return <Widget {...item} key={index} />;
              })}
            </VStack>
          </Stack>
        </Box>
      </Layout>
    </>
  );
}
export default Home;
