import React from "react";
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
} from "@shiksha/common-lib";
import moment from "moment";
import manifest from "../manifest.json";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

const notificationData = [
  {
    name: "Absent Today",
    text: "Worksheets help the kids in exploring multiple concepts They develop fine motor skills, logical thinking",
    dateTime: moment().add("2", "minute").format("hh:mmA"),
    type: "Attendance",
  },
  {
    name: "Absent Today",
    text: "Worksheets help the kids in exploring multiple concepts They develop fine motor skills, logical thinking",
    dateTime: moment().add("2", "minute").format("hh:mmA"),
    type: "Attendance",
  },
  {
    name: "Absent Today",
    text: "Worksheets help the kids in exploring multiple concepts They develop fine motor skills, logical thinking",
    dateTime: moment().add("2", "minute").format("hh:mmA"),
    type: "Attendance",
  },
];

const filters = [
  { name: "Module", data: ["Lesson Plans", "Attendance", "Timtable"] },
  { name: "Recipient", data: [] },
  { name: "Class", data: [] },
];

const Notification = ({ footerLinks, appName }) => {
  const { t } = useTranslation();
  const [page, setPage] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);
  const [showModalMore, setShowModalMore] = React.useState(false);
  const [filterData, setFilterData] = React.useState(false);
  const [filtered, setFiltered] = React.useState(false);
  const [notification, setNotification] = React.useState({});
  const [groupValue, setGroupValue] = React.useState([]);
  const [showModalInbox, setShowModalInbox] = React.useState(false);
  const CalendarBar = React.lazy(() => import("attendance/CalendarBar"));
  console.log(colors);
  React.useEffect(() => {
    capture("PAGE");
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
              <Checkbox
                colorScheme="button"
                borderColor={colors.primary}
                borderRadius="0"
                _text={{ color: colors.primary, fontSize: "14px" }}
              >
                {t("MARK_ALL_READ")}
              </Checkbox>
            </HStack>
          </Box>
          <Box bg={colors.white} p="5" roundedBottom={"xl"}>
            <HStack justifyContent="end" alignItems="center" pb="5">
              {!filtered ? (
                <Button
                  rounded="full"
                  colorScheme="button"
                  variant="outline"
                  px="5"
                  _text={{ textTransform: "capitalize" }}
                  onPress={(e) => setFiltered(true)}
                >
                  {t("FILTER")}
                </Button>
              ) : (
                <ScrollView horizontal={true} display={"hidden"}>
                  <HStack justifyContent="end" alignItems="center" py="4">
                    {filters.map((value, index) => {
                      const isSelect = groupValue.filter((e) =>
                        value?.data.includes(e)
                      ).length;
                      return (
                        <Button
                          key={index}
                          mr="1"
                          rounded="full"
                          bg={colors.scrollViewbtnBg}
                          colorScheme="button"
                          {...(isSelect < 1 ? { variant: "outline" } : {})}
                          px="5"
                          rightIcon={
                            <IconByName
                              color={
                                isSelect < 1 ? colors.primary : colors.white
                              }
                              name="ArrowDownSLineIcon"
                              isDisabled
                            />
                          }
                          onPress={(e) => {
                            if (value?.data && value?.data.length > 0) {
                              setFilterData(value?.data);
                            }
                          }}
                        >
                          <Text
                            color={isSelect > 0 ? colors.white : colors.primary}
                          >
                            {value.name}{" "}
                            {groupValue.filter((e) => value?.data.includes(e))
                              .length > 0 && groupValue[0]
                              ? groupValue[0]
                              : ""}
                          </Text>
                        </Button>
                      );
                    })}
                    <Button
                      mr="1"
                      rounded="full"
                      colorScheme="button"
                      variant="outline"
                      bg={colors.scrollViewbtnBg}
                      px="5"
                      _text={{
                        textTransform: "capitelize",
                        fontWeight: "400",
                        fontSize: "14px",
                      }}
                      rightIcon={
                        <IconByName
                          color={colors.primary}
                          name="ArrowDownSLineIcon"
                          isDisabled
                        />
                      }
                      onPress={(e) => setFiltered(false)}
                    >
                      {t("RESET_FILTER")}
                    </Button>
                  </HStack>
                </ScrollView>
              )}
            </HStack>
            <NotificationBox
              data={notificationData}
              onPressMore={(e) => setShowModalMore(true)}
              onPress={(notification) => {
                setShowModal(true);
                setNotification(notification);
              }}
            />
          </Box>
        </VStack>
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
        <Actionsheet
          isOpen={showModalMore}
          onClose={() => setShowModalMore(false)}
        >
          <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
            <HStack justifyContent={"space-between"}>
              <Stack p={5} pt={1} pb="15px">
                <H2 fontWeight="500">{t("NOTIFCATION_ACTION")}</H2>
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
                <H2>{t("VIEW_NOTIFCATION")}</H2>
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
                {notification?.text}
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
                {t("Select All")}
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

const NotificationBox = ({ data, onPressMore, onPress }) => {
  const line2style = {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  };
  return data.map((value, index) => {
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
            <HStack
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
            </HStack>
            <Subtitle {...line2style}>{value.text}</Subtitle>
            <HStack justifyContent="space-between" alignItems="center">
              <HStack space="2" alignItems="center">
                <IconByName
                  _icon={{ size: "13" }}
                  name="SurveyLineIcon"
                  isDisabled
                />
                <BodySmall>{value.type}</BodySmall>
              </HStack>
              <HStack space="2" alignItems="center">
                <IconByName
                  _icon={{ size: "13" }}
                  name="TimeLineIcon"
                  isDisabled
                />
                <BodySmall>{value.dateTime}</BodySmall>
              </HStack>
            </HStack>
          </VStack>
        </Pressable>
      </Box>
    );
  });
};

export default Notification;
