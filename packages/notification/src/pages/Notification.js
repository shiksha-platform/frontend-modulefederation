import React from "react";
import { useState, useEffect } from "react";
import {
  Text,
  Box,
  Pressable,
  Button,
  Checkbox,
  HStack,
  VStack,
  Stack,
  Actionsheet,
  Link,
  ScrollView,
  useToast,
} from "native-base";
import { useTranslation } from "react-i18next";
import jwt_decode from "jwt-decode";
import {
  BodyLarge,
  BodyMedium,
  BodySmall,
  capture,
  H1,
  H2,
  IconByName,
  Layout,
  Subtitle,
  overrideColorTheme,
  Tab,
  notificationRegistryService,
  getApiConfig,
  FilterButton,
  Form,
  telemetryFactory,
  teacherRegistryService,
  getAllForUser,
} from "@shiksha/common-lib";
import moment from "moment";
import manifest from "../manifest.json";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

const Notification = ({ footerLinks, appName }) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showModalMore, setShowModalMore] = useState(false);
  const [filterData, setFilterData] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [notification, setNotification] = useState({});
  const [groupValue, setGroupValue] = useState([]);
  const [showModalInbox, setShowModalInbox] = useState(false);
  const [notificationInfo, setNotificationInfo] = useState([]);
  const [date, setDate] = useState({});
  const [refinedData, setRefinedData] = useState("");
  const [filterObject, setFilterObject] = useState({});
  const [showMore, setShowMore] = useState(false);
  const [isTokenFound, setTokenFound] = useState(false);
  const [validUsers, setValidUsers] = useState("");
  const [show, setShow] = useState(false);
  const toast = useToast();
  const { realm_access } = jwt_decode(localStorage.getItem("token"));
  const CalendarBar = React.lazy(() => import("attendance/CalendarBar"));

  const line2style = {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  };

  const getDateFromCalendar = () => {
    setDate(moment().add(page, "days"));
  };

  const handleTelemetry = (notification) => {
    setShowModal(true);
    setNotification(notification);
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Notification-Intaract",
      notificationLogId: notification.id,
      module: notification.module,
    });
    capture("INTERACT", telemetryData);
  };

  const getConfigData = async () => {
    const Response = await getApiConfig();
    //setConfigData(Response);
    const ValidUsersResp = Array.isArray(
      Response["notification.configureWhoCanSendNotification"]
    )
      ? Response["notification.configureWhoCanSendNotification"]
      : JSON.parse(Response["notification.configureWhoCanSendNotification"]);
    setValidUsers(ValidUsersResp);
  };

  const GetAllNotifications = async () => {
    const resp1 = await getAllForUser({
      userId: localStorage.getItem("phoneNumber"),
      provider: "firebase",
      startDate: moment(date).format("DD-MM-YYYY"),
      endDate: moment(date).format("DD-MM-YYYY"),
    });
    setNotificationInfo(resp1);
  };

  useEffect(() => {
    getDateFromCalendar();
  }, [page]);

  //CURRENTLY THERE ARE NO FILTERS SUPPORTED BY HISTORY API
  // const getFilterDetails = () => {
  //   let latestDate = moment(date).format("YYYY-MM-DD");
  //   let newFilterObject = {};
  //   const filterObject1 = {
  //     ...filterObject, osCreatedAt: latestDate
  //   }
  //   const keyarr = Object.keys(filterObject1);
  //   console.log(keyarr);
  //   keyarr.forEach((item) => {
  //     newFilterObject = {
  //       ...newFilterObject,
  //       [item]: { ["eq"]: filterObject1[item] },
  //     };
  //   });
  //   return newFilterObject;
  // }

  useEffect(() => {
    capture("PAGE");
    GetAllNotifications();
  }, [filterObject, date]);

  useEffect(() => {
    getConfigData();
  }, []);

  return (
    <Layout
      _header={{
        title: t("MY_NOTIFICATIONS"),
        subHeading: moment().format("hh:mm A"),
        _subHeading: { fontWeight: 500, textTransform: "uppercase" },
        iconComponent: (
          <Button
            rounded="full"
            colorScheme="button"
            variant="outline"
            bg={colors.notificationbtnBg}
            px="5"
            py="4px"
            _text={{ textTransform: "capitalize", fontSize: "14px" }}
            rightIcon={<IconByName name="ArrowDownSLineIcon" isDisabled />}
            onPress={(e) => setShowModalInbox(true)}
          >
            {t("INBOX")}
          </Button>
        ),
      }}
      _appBar={{ languages: manifest.languages }}
      subHeader={t("VIEW_YOUR_INCOMING_NOTIFICATIONS")}
      _subHeader={{
        bg: colors?.cardBg,
        py: "22px",
        _text: {
          fontSize: "16px",
          fontWeight: "500",
          textTransform: "inherit",
        },
      }}
      _footer={footerLinks}
    >
      <Stack space={1} mb="2">
        <VStack space="1">
          <Box bg="white" p="5">
            <HStack justifyContent="space-between" alignItems="center">
              <CalendarBar {...{ page, setPage }} />
              {/* <Checkbox
                colorScheme="button"
                borderColor={colors.primary}
                borderRadius="0"
                _text={{ color: colors.primary, fontSize: "14px" }}
              >
                {t("MARK_ALL_READ")}
              </Checkbox> */}
            </HStack>
          </Box>
          <FilterButton
            getObject={setFilterObject}
            _box={{ p: 5 }}
            _actionSheet={{ bg: "worksheetCard.500" }}
            isResettableFilter={true}
            filters={[
              {
                name: "Module",
                attributeName: "module",
                type: "string",
                data: ["lessonPlans", "attendance", "worksheet"],
              },
            ]}
          />
          <Box bg="white" p="5" roundedBottom={"xl"}>
            <NotificationBox
              data={notificationInfo}
              showMore={showMore}
              setShowMore={setShowModal}
              onPressMore={(e) => setShowModalMore(true)}
              onPress={(notification) => {
                handleTelemetry(notification);
              }}
            />
          </Box>
          <Box alignItems="center" p="3">
            <Pressable
              alignItems="center"
              onPress={() =>
                showMore ? setShowMore(false) : setShowMore(true)
              }
            >
              <Text color="button.500">
                {showMore ? t("SHOW_LESS") : t("SHOW_MORE")}
              </Text>
            </Pressable>
          </Box>
        </VStack>
        {validUsers.includes(realm_access?.roles[2].toLowerCase()) && (
          <Box bg={colors.white} p="5" position="sticky" bottom="0" shadow={2}>
            <Link href={"/notification/create"}>
              <Button
                colorScheme="button"
                _text={{ color: "white" }}
                px="5"
                flex="1"
              >
                {t("CREATE_NEW")}
              </Button>
            </Link>
          </Box>
        )}
        <Actionsheet
          isOpen={showModalMore}
          onClose={() => setShowModalMore(false)}
        >
          <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
            <HStack justifyContent={"space-between"}>
              <Stack p={5} pt={1} pb="15px">
                <H2 fontWeight="500">{t("NOTIFICATION_ACTION")}</H2>
              </Stack>
              <IconByName
                name="CloseCircleLineIcon"
                color={colors.cardCloseIcon}
                onPress={(e) => setShowModalMore(false)}
              />
            </HStack>
          </Actionsheet.Content>
          <Box bg={colors.white} width={"100%"} _text={{}}>
            <BodyLarge p="5" color={colors.coolGraylight}>
              {t("MARK_AS_READ")}
            </BodyLarge>
            <BodyLarge p="5" color={colors.coolGraylight}>
              {t("DELETE_MESSAGES")}
            </BodyLarge>
            <Box p="5">
              <Button
                colorScheme="button"
                _text={{ color: "white" }}
                onPress={(e) => setShowModalMore(false)}
              >
                {t("CONTINUE")}
              </Button>
            </Box>
          </Box>
        </Actionsheet>
        <Actionsheet
          isOpen={showModalInbox}
          onClose={() => setShowModalInbox(false)}
        >
          <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
            <HStack justifyContent={"space-between"}>
              <Stack p={5} pt={1} pb="15px">
                <H2>{t("NOTIFCATION_ACTION")}</H2>
              </Stack>
              <IconByName
                name="CloseCircleLineIcon"
                color={colors.cardCloseIcon}
                onPress={(e) => setShowModalInbox(false)}
              />
            </HStack>
          </Actionsheet.Content>
          <Box bg={colors.white} width={"100%"}>
            <Link href={"/notification"}>
              <Box p="5">{t("INBOX")}</Box>
            </Link>
            <Link href={"/notification/outbox"}>
              <Box p="5">{t("OUTBOX")}</Box>
            </Link>
            <Box p="5">
              <Button
                colorScheme="button"
                _text={{ color: "white" }}
                onPress={(e) => setShowModalInbox(false)}
              >
                {t("CONTINUE")}
              </Button>
            </Box>
          </Box>
        </Actionsheet>
        <Actionsheet isOpen={showModal} onClose={() => setShowModal(false)}>
          <Actionsheet.Content alignItems={"left"} bg={colors?.cardBg}>
            <HStack justifyContent={"space-between"}>
              <Stack p={5} pt={1} pb="15px">
                <H2>{t("VIEW_NOTIFICATION")}</H2>
              </Stack>
              <IconByName
                name="CloseCircleLineIcon"
                color={colors.cardCloseIcon}
                onPress={(e) => setShowModal(false)}
              />
            </HStack>
          </Actionsheet.Content>
          <Box bg={colors.white} width={"100%"}>
            <Box px="5">
              <HStack
                py="5"
                borderBottomWidth="1"
                borderColor={colors.lightGray}
                alignItems="center"
                space="1"
              >
                <IconByName
                  _icon={{ size: "16" }}
                  color={colors.cardCloseIcon}
                  name="CheckDoubleLineIcon"
                  isDisabled
                />
                <BodyLarge>{t("RECEIVED_FROM_ADMIN")}</BodyLarge>
              </HStack>
            </Box>
            <VStack p="5" space={6}>
              <BodyLarge>{t("NOTICE")}</BodyLarge>
              <BodyMedium textTransform={"inherit"}>
                {notification?.payload?.text
                  ? notification?.payload?.text
                  : "Dummy text"}
              </BodyMedium>
            </VStack>
            <Box bg={colors.white} p="5" bottom="0" shadow="2">
              <Button
                colorScheme="button"
                _text={{ color: "white" }}
                onPress={(e) => setShowModal(false)}
              >
                {t("DONE")}
              </Button>
            </Box>
          </Box>
        </Actionsheet>
        <Actionsheet isOpen={filterData} onClose={() => setFilterData()}>
          <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
            <HStack justifyContent={"space-between"}>
              <Stack p={5} pt={1} pb="15px">
                <H2>{t("SELECT_MODULE")}</H2>
              </Stack>
              <IconByName
                name="CloseCircleLineIcon"
                color={colors.cardCloseIcon}
                onPress={(e) => setFilterData()}
              />
            </HStack>
          </Actionsheet.Content>
          <Box bg={colors.white} width={"100%"}>
            <Box p="5">
              <Checkbox
                colorScheme="button"
                borderColor={colors.primary}
                borderRadius="0"
              >
                {t("SELECT_ALL")}
              </Checkbox>
            </Box>
            {filterData &&
              filterData.map((value, index) => (
                <Box p="5" key={index}>
                  <Checkbox
                    colorScheme="button"
                    borderColor={colors.primary}
                    borderRadius="0"
                  >
                    {value}
                  </Checkbox>
                </Box>
              ))}
            <Box p="5">
              <Button
                colorScheme="button"
                _text={{ color: "white" }}
                onPress={(e) => {
                  setGroupValue(["Attendance", "Lesson Plans", "Timtable"]);
                  setFilterData();
                }}
              >
                {t("CONTINUE")}
              </Button>
            </Box>
          </Box>
        </Actionsheet>
      </Stack>
    </Layout>
  );
};

const NotificationBox = ({
  data,
  onPressMore,
  onPress,
  showMore,
  setShowMore,
}) => {
  const line2style = {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  };
  const numberOfItems = showMore ? data.length : 2;
  return data.slice(0, numberOfItems).map((value, index) => {
    return (
      <Box
        key={index}
        borderWidth="1"
        borderColor={colors.primary}
        my="2"
        p="5"
        rounded="10"
      >
        <Pressable onPress={(e) => onPress(value)}>
          <VStack space="3">
            {/* <HStack
              space="2"
              alignItems="center"
              justifyContent="space-between"
            >
               <HStack space="2" alignItems="center">
                <IconByName
                  _icon={{ size: "16" }}
                  name="UserLineIcon"
                  isDisabled
                />
                <H2>{value.name}</H2>
                <H1 color={colors.primary}>•</H1>
              </HStack>
              <IconByName
                _icon={{ size: "18" }}
                p="0"
                name="More2LineIcon"
                onPress={(e) => {
                  onPressMore();
                }}
              />
            </HStack> */}
            <Subtitle {...line2style}>{value.payload.text}</Subtitle>
            <HStack justifyContent="space-between" alignItems="center">
              <HStack space="2" alignItems="center">
                <IconByName
                  _icon={{ size: "13" }}
                  name="SurveyLineIcon"
                  isDisabled
                />
                <BodySmall>Attendance</BodySmall>
                {/* <BodySmall>{value.module}</BodySmall> */}
              </HStack>
              <HStack space="2" alignItems="center">
                <IconByName
                  _icon={{ size: "13" }}
                  name="TimeLineIcon"
                  isDisabled
                />
                <BodySmall>
                  {moment.utc(value.timestamp).local().format("LT")}
                </BodySmall>
              </HStack>
            </HStack>
          </VStack>
        </Pressable>
      </Box>
    );
  });
};

export default Notification;
