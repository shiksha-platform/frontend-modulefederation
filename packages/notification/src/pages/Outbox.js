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
} from "native-base";
import { useTranslation } from "react-i18next";
import {
  capture,
  IconByName,
  Layout,
  Tab,
  H2,
  Collapsible,
  BodyLarge,
  BodyMedium,
  Subtitle,
  BodySmall,
  H3,
  overrideColorTheme,
  H1,
  notificationRegistryService,
  FilterButton,
} from "@shiksha/common-lib";
import moment from "moment";
import manifest from "../manifest.json";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

const Outbox = ({ footerLinks }) => {
  const { t } = useTranslation();
  const [showModalOutbox, setShowModalOutbox] = useState(false);
  const [notificationInfo, setNotificationInfo] = useState([]);
  const [page, setPage] = useState(0);
  const [date, setDate] = useState({});

  const getDateFromCalendar = () => {
    setDate(moment().add(page, "days"));
  };

  useEffect(() => {
    getDateFromCalendar();
  }, [page]);

  return (
    <Layout
      _header={{
        title: t("MY_NOTIFICATIONS"),
        icon: "Group",
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
            onPress={(e) => setShowModalOutbox(true)}
          >
            {t("OUTBOX")}
          </Button>
        ),
      }}
      _appBar={{ languages: manifest.languages }}
      subHeader={t("VIEW_YOUR_OUTGOING_NOTIFICATIONS")}
      _subHeader={{
        bg: colors.cardBg,
        py: "22px",
        _text: {
          fontSize: "16px",
          fontWeight: "500",
          textTransform: "inherit",
        },
      }}
      _footer={footerLinks}
    >
      <Tab
        _box={{ bg: colors.white, p: 5 }}
        routes={[
          {
            title: t("Scheduled"),
            component: (
              <Schedule
                data={notificationInfo}
                page={page}
                setPage={setPage}
                date={date}
              />
            ),
          },
          {
            title: t("Sent"),
            component: (
              <Send
                data={notificationInfo}
                page={page}
                setPage={setPage}
                date={date}
              />
            ),
          },
        ]}
      />
      <Actionsheet
        isOpen={showModalOutbox}
        onClose={() => setShowModalOutbox(false)}
      >
        <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={1} pb="15px">
              <H2>{t("NOTIFICATION_ACTION")}</H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={colors.cardCloseIcon}
              onPress={(e) => setShowModalOutbox(false)}
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
              onPress={(e) => setShowModalOutbox(false)}
            >
              {t("CONTINUE")}
            </Button>
          </Box>
        </Box>
      </Actionsheet>
    </Layout>
  );
};

const Schedule = ({ data, page, setPage, date }) => {
  const { t } = useTranslation();
  // const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showModalMore, setShowModalMore] = useState(false);
  const [filterData, setFilterData] = useState(false);
  const [filtered, setFiltered] = useState(false);
  const [notification, setNotification] = useState({});
  const [groupValue, setGroupValue] = useState([]);
  const [selectOptions, setSelectOptions] = useState(["Mark as read"]);
  const [filterObject, setFilterObject] = useState({});
  const [refinedData, setRefinedData] = useState([]);
  const [currentUserNotifications, setCurrentUserNotifications] = useState([]);
  const [adminNotifications, setAdminNotifications] = useState([]);
  const [showMoreAdmin, setShowMoreAdmin] = useState(false);
  const [showMoreUser, setShowMoreUser] = useState(false);

  const CalendarBar = React.lazy(() => import("attendance/CalendarBar"));

  const GetNotificationsScheduledByAdmin = async () => {
    const FilterData1 = getFilterDetails();
    // const FilterDataWithUserDetails = {
    //   ...FilterData1, userType: "Admin"
    // }
    const resp1 =
      await notificationRegistryService.sendScheduledNotificationSearch({
        //limit: "8",
        filters: FilterData1,
      });
    setAdminNotifications(resp1);
    return resp1;
  };

  const GetNotificationsScheduledByCurrentUser = async () => {
    const FilterData1 = getFilterDetails();
    const FilterDataWithUserDetails = {
      ...FilterData1,
      sentBy: {
        eq: localStorage.getItem("id"),
      },
    };
    const resp2 =
      await notificationRegistryService.sendScheduledNotificationSearch({
        //limit: "8",
        filters: FilterDataWithUserDetails,
      });
    setCurrentUserNotifications(resp2);
    return resp2;
  };

  const getFilterDetails = () => {
    let latestDate = moment(date).format("YYYY-MM-DD");
    let newFilterObject = {};
    const filterObject1 = {
      ...filterObject,
      osCreatedAt: latestDate,
    };
    const keyarr = Object.keys(filterObject1);
    keyarr.forEach((item) => {
      newFilterObject = {
        ...newFilterObject,
        [item]: { ["eq"]: filterObject1[item] },
      };
    });
    return newFilterObject;
  };

  useEffect(() => {
    capture("PAGE");
    GetNotificationsScheduledByAdmin();
    GetNotificationsScheduledByCurrentUser();
  }, [filterObject, date]);

  return (
    <Stack space={1} mb="2">
      <VStack space="1">
        <Box bg={colors.white} p="5">
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
              data: ["Lesson Plans", "Attendance", "Worksheet"],
            },
          ]}
        />
        <Box bg="white" p="5" roundedBottom={"xl"}>
          <Collapsible header={t("SCHEDULED_BY_ADMIN")}>
            <VStack space="1">
              <NotificationBox
                data={adminNotifications}
                textmsg={t("SCHEDULED_AT")}
                showMore={showMoreAdmin}
                setShowMore={setShowModal}
                onPressMore={(e) => setShowModalMore(true)}
                onPress={(notification) => {
                  setShowModal(true);
                  setNotification(notification);
                }}
              />
              <Box alignItems="center" p="3">
                <Pressable
                  alignItems="center"
                  onPress={() =>
                    showMoreAdmin
                      ? setShowMoreAdmin(false)
                      : setShowMoreAdmin(true)
                  }
                >
                  <Text color="button.500">
                    {showMoreAdmin ? t("SHOW_LESS") : t("SHOW_MORE")}
                  </Text>
                </Pressable>
              </Box>
            </VStack>
          </Collapsible>
          <Collapsible header={t("SCHEDULED_BY_YOU")}>
            <VStack space="1">
              <NotificationBox
                data={currentUserNotifications}
                textmsg={t("SCHEDULED_AT")}
                showMore={showMoreUser}
                setShowMore={setShowModal}
                onPressMore={(e) => {
                  setSelectOptions(["Edit Messages", "Delete messages"]);
                  setShowModalMore(true);
                }}
                onPress={(notification) => {
                  setShowModal(true);
                  setNotification(notification);
                }}
              />
              <Box alignItems="center" p="3">
                <Pressable
                  alignItems="center"
                  onPress={() =>
                    showMoreUser
                      ? setShowMoreUser(false)
                      : setShowMoreUser(true)
                  }
                >
                  <Text color="button.500">
                    {showMoreUser ? t("SHOW_LESS") : t("SHOW_MORE")}
                  </Text>
                </Pressable>
              </Box>
            </VStack>
          </Collapsible>
        </Box>
      </VStack>
      <Actionsheet
        isOpen={showModalMore}
        onClose={() => setShowModalMore(false)}
      >
        <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={1} pb="15px">
              <H2>{t("NOTIFICATION_ACTION")}</H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={colors.cardCloseIcon}
              onPress={(e) => setShowModalMore(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <Box bg={colors.white} width={"100%"}>
          {selectOptions.map((value, index) => (
            <Text p="5" key={index}>
              {value}
            </Text>
          ))}
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
      <Actionsheet isOpen={showModal} onClose={() => setShowModal(false)}>
        <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={1} pb="15px">
              <H2>{t("VIEW_NOTIFICATION")}</H2>
            </Stack>
          </HStack>
        </Actionsheet.Content>
        <Box bg={colors.white} width={"100%"}>
          <Box px="5" pt="5">
            <VStack space="4">
              <HStack alignItems="center" space="1">
                <IconByName
                  _icon={{ size: "16" }}
                  name="CheckDoubleLineIcon"
                  color={colors.cardCloseIcon}
                  isDisabled
                />
                <BodyLarge>{t("RECEIVED_FROM_ADMIN")}</BodyLarge>
              </HStack>
              <HStack
                pb="5"
                borderBottomWidth="1"
                borderColor={colors.lightGray}
                alignItems="center"
                space="1"
              >
                <IconByName
                  _icon={{ size: "16" }}
                  name="TimeLineIcon"
                  color={colors.cardCloseIcon}
                  isDisabled
                />
                <BodyLarge>{t("SCHEDULED_AT")}</BodyLarge>
              </HStack>
            </VStack>
          </Box>
          <VStack p="5" space={6}>
            <H3>{t("NOTICE")}</H3>
            <BodyMedium textTransform={"inherit"}>
              {notification?.content
                ? notification?.content
                : t("NO_CONTENT_AVAILABLE")}
            </BodyMedium>
          </VStack>
          <Box p="5">
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
        <Box bg={colors.white} width={"100%"} justifyContent="space-between">
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
                //DOUBT HERE
                setFilterData();
              }}
            >
              {t("CONTINUE")}
            </Button>
          </Box>
        </Box>
      </Actionsheet>
    </Stack>
  );
};

const Send = ({ data, page, setPage, date }) => {
  const { t } = useTranslation();
  // const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showModalMore, setShowModalMore] = useState(false);
  const [filterData, setFilterData] = useState(false);
  const [notification, setNotification] = useState({});
  const [groupValue, setGroupValue] = useState([]);
  const [selectOptions, setSelectOptions] = useState(["Mark as read"]);
  const [sendBy, setSendBy] = useState("admin");
  const [filterObject, setFilterObject] = useState({});
  const [currentUserNotifications, setCurrentUserNotifications] = useState([]);
  const [adminNotifications, setAdminNotifications] = useState([]);
  const [showMoreAdmin, setShowMoreAdmin] = useState(false);
  const [showMoreUser, setShowMoreUser] = useState(false);

  const CalendarBar = React.lazy(() => import("attendance/CalendarBar"));

  const GetNotificationsSentByAdmin = async () => {
    const FilterData1 = getFilterDetails();
    // const FilterDataWithUserDetails = {
    //   ...FilterData1, userType: "Admin"
    // }
    const resp1 = await notificationRegistryService.sendNotificationSearch({
      //limit: "8",
      filters: FilterData1,
    });
    setAdminNotifications(resp1);
    return resp1;
  };

  const GetNotificationsSentByCurrentUser = async () => {
    const FilterData1 = getFilterDetails();
    const FilterDataWithUserDetails = {
      ...FilterData1,
      sentBy: { eq: localStorage.getItem("id") },
    };
    const resp2 = await notificationRegistryService.sendNotificationSearch({
      //limit: "8",
      filters: FilterDataWithUserDetails,
    });
    setCurrentUserNotifications(resp2);
    return resp2;
  };

  const getFilterDetails = () => {
    let latestDate = moment(date).format("YYYY-MM-DD");
    let newFilterObject = {};
    const filterObject1 = {
      ...filterObject,
      osCreatedAt: latestDate,
    };
    const keyarr = Object.keys(filterObject1);
    keyarr.forEach((item) => {
      newFilterObject = {
        ...newFilterObject,
        [item]: { ["eq"]: filterObject1[item] },
      };
    });
    return newFilterObject;
  };

  useEffect(() => {
    capture("PAGE");
    GetNotificationsSentByAdmin();
    GetNotificationsSentByCurrentUser();
  }, [filterObject, date]);

  return (
    <Stack space={1} mb="2">
      <VStack space="1">
        <Box bg={colors.white} p="5">
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
              data: ["Lesson Plans", "Attendance", "Worksheet"],
            },
          ]}
        />
        <Box bg="white" p="5" roundedBottom={"xl"}>
          <Collapsible header={t("SENT_BY_ADMIN")}>
            <VStack space="1">
              <NotificationBox
                data={adminNotifications}
                textmsg={t("SENT_AT")}
                showMore={showMoreAdmin}
                setShowMore={setShowModal}
                onPressMore={(e) => setShowModalMore(true)}
                onPress={(notification) => {
                  setShowModal(true);
                  setNotification(notification);
                }}
              />
              <Box alignItems="center" p="3">
                <Pressable
                  alignItems="center"
                  onPress={() =>
                    showMoreAdmin
                      ? setShowMoreAdmin(false)
                      : setShowMoreAdmin(true)
                  }
                >
                  <Text color="button.500">
                    {showMoreAdmin ? t("SHOW_LESS") : t("SHOW_MORE")}
                  </Text>
                </Pressable>
              </Box>
            </VStack>
          </Collapsible>
          <Collapsible header={t("SENT_BY_YOU")}>
            <VStack space="1">
              <NotificationBox
                data={currentUserNotifications}
                textmsg={t("SENT_AT")}
                showMore={showMoreUser}
                setShowMore={setShowModal}
                onPressMore={(e) => {
                  setSelectOptions(["Delete messages"]);
                  setShowModalMore(true);
                }}
                onPress={(notification) => {
                  setShowModal(true);
                  setSendBy("teacher");
                  setNotification(notification);
                }}
              />
              <Box alignItems="center" p="3">
                <Pressable
                  alignItems="center"
                  onPress={() =>
                    showMoreUser
                      ? setShowMoreUser(false)
                      : setShowMoreUser(true)
                  }
                >
                  <Text color="button.500">
                    {showMoreUser ? t("SHOW_LESS") : t("SHOW_MORE")}
                  </Text>
                </Pressable>
              </Box>
            </VStack>
          </Collapsible>
        </Box>
      </VStack>
      <Actionsheet
        isOpen={showModalMore}
        onClose={() => setShowModalMore(false)}
      >
        <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={1} pb="15px">
              <H2>{t("NOTIFICATION_ACTION")}</H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={colors.cardCloseIcon}
              onPress={(e) => setShowModalMore(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <Box bg="white" width={"100%"}>
          {selectOptions.map((value, index) => (
            <Text p="5" key={index}>
              {value}
            </Text>
          ))}
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
      <Actionsheet isOpen={showModal} onClose={() => setShowModal(false)}>
        <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={1} pb="15px">
              <H2>{t("VIEW_NOTIFICATION")}</H2>
            </Stack>
          </HStack>
        </Actionsheet.Content>
        <Box bg={colors.white} width={"100%"}>
          {sendBy === "admin" ? (
            <Box px="5" pt="5">
              <VStack space="4">
                <HStack alignItems="center" space="1">
                  <IconByName
                    _icon={{ size: "16" }}
                    name="CheckDoubleLineIcon"
                    color={colors.cardCloseIcon}
                    isDisabled
                  />
                  <BodyLarge>{t("RECEIVED_FROM_ADMIN")}</BodyLarge>
                </HStack>
                <HStack alignItems="center" space="1">
                  <IconByName
                    _icon={{ size: "16" }}
                    name="TimeLineIcon"
                    color={colors.cardCloseIcon}
                    isDisabled
                  />
                  {/* <BodyLarge>
                    {t("Scheduled weekly on Thursday, 2:00 pm")}
                  </BodyLarge> */}
                </HStack>
              </VStack>
            </Box>
          ) : (
            ""
          )}
          <VStack p="5" space={6}>
            <H3>{t("NOTICE")}</H3>
            <BodyMedium textTransform={"inherit"}>
              {notification?.text}
            </BodyMedium>
          </VStack>
          {sendBy === "teacher" ? (
            <VStack>
              <Box p="5" borderBottomWidth="1" borderColor={colors.lightGray}>
                <HStack alignItems="center" justifyContent="space-between">
                  <HStack alignItems="center" space="1">
                    <IconByName
                      _icon={{ size: "16" }}
                      name="CheckDoubleLineIcon"
                      color={colors.cardCloseIcon}
                      isDisabled
                    />
                    <BodyLarge>"19 parents received"</BodyLarge>
                  </HStack>
                  <IconByName
                    _icon={{ size: "16" }}
                    name="ArrowRightSLineIcon"
                    color={colors.cardCloseIcon}
                    isDisabled
                  />
                </HStack>
              </Box>
              <Box p="5" borderBottomWidth="1" borderColor={colors.lightGray}>
                <HStack alignItems="center" justifyContent="space-between">
                  <HStack alignItems="center" space="1">
                    <IconByName
                      _icon={{ size: "16" }}
                      name="TimeLineIcon"
                      color={colors.cardCloseIcon}
                      isDisabled
                    />
                    <BodyLarge>"14 parents didn't receive"</BodyLarge>
                  </HStack>
                  <IconByName
                    _icon={{ size: "16" }}
                    name="ArrowRightSLineIcon"
                    color={colors.cardCloseIcon}
                    isDisabled
                  />
                </HStack>
              </Box>
              <Box p="5" borderBottomWidth="1" borderColor={colors.lightGray}>
                <Button colorScheme="button" variant="outline">
                  {t("RESEND")}
                </Button>
              </Box>
              <Box p="5" borderBottomWidth="1" borderColor={colors.lightGray}>
                <HStack alignItems="center" space="1">
                  <IconByName
                    _icon={{ size: "16" }}
                    name="CheckDoubleLineIcon"
                    color={colors.cardCloseIcon}
                    isDisabled
                  />
                  <BodyLarge>"Sent - 23rd April, 2022."</BodyLarge>
                </HStack>
              </Box>
              <Box p="5" borderBottomWidth="1" borderColor={colors.lightGray}>
                <HStack alignItems="center" space="1">
                  <IconByName
                    _icon={{ size: "16" }}
                    name="TimeLineIcon"
                    color={colors.cardCloseIcon}
                    isDisabled
                  />
                  <BodyLarge>
                    {t("Scheduled - weekly on Thursday, 2:00 pm")}
                  </BodyLarge>
                </HStack>
              </Box>
            </VStack>
          ) : (
            ""
          )}
          <Box p="5">
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
              color={colors.cardBg}
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
  );
};

const NotificationBox = ({
  data,
  onPressMore,
  onPress,
  showMore,
  setShowMore,
  textmsg,
}) => {
  const line2style = {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  };
  const numberOfItems = showMore ? data?.length : 2;
  return data?.slice(0, numberOfItems).map((value, index) => {
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
          <VStack space="2">
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
            <Subtitle {...line2style}>{value?.content}</Subtitle>
            <HStack justifyContent="space-between" alignItems="center">
              <HStack space="2" alignItems="center">
                <IconByName
                  _icon={{ size: "13" }}
                  name="SurveyLineIcon"
                  isDisabled
                />
                <BodySmall>{value?.module}</BodySmall>
              </HStack>
              <HStack space="2" alignItems="center">
                <IconByName
                  _icon={{ size: "13" }}
                  name="TimeLineIcon"
                  isDisabled
                />
                <BodySmall>
                  {textmsg}
                  {moment.utc(value?.createdAt).local().format("LT")}
                </BodySmall>
              </HStack>
            </HStack>
          </VStack>
        </Pressable>
      </Box>
    );
  });
};

export default Outbox;
