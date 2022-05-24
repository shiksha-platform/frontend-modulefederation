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
import { capture, IconByName, Layout, Tab } from "@shiksha/common-lib";
import moment from "moment";
import manifest from "../manifest.json";

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
            bg="rgba(254, 239, 235, 1)"
            px="5"
            py="7px"
            _text={{textTransform:"capitalize", fontSize:"14px"}}
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
        bg: "classCard.500",
        py:"22px",
        _text: {
          fontSize: "16px",
          fontWeight: "600",
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
              <Checkbox colorScheme="button" borderColor="button.500" borderRadius="0" _text={{ color: "button.500" }}>
                {t("MARK_ALL_READ")}
              </Checkbox>
            </HStack>
          </Box>
          <Box bg="white" p="5" roundedBottom={"xl"}>
            <HStack justifyContent="end" alignItems="center" pb="5">
              {!filtered ? (
                <Button
                  rounded="full"
                  colorScheme="button"
                  variant="outline"
                  px="5"
                  _text={{textTransform:"capitalize"}}
                  onPress={(e) => setFiltered(true)}
                >
                  {t("FILTER")}
                </Button>
              ) : (
                <ScrollView horizontal={true}>
                  <HStack justifyContent="end" alignItems="center" py="5">
                    {filters.map((value, index) => {
                      const isSelect = groupValue.filter((e) =>
                        value?.data.includes(e)
                      ).length;
                      return (
                        <Button
                          key={index}
                          mr="1"
                          rounded="full"
                          colorScheme="button"
                          {...(isSelect < 1 ? { variant: "outline" } : {})}
                          px="5"
                          rightIcon={
                            <IconByName
                              color={isSelect < 1 ? "button.500" : "white"}
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
                          <Text color={isSelect > 0 ? "white" : "button.500"}>
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
                      px="5"
                      rightIcon={
                        <IconByName
                          color="button.500"
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
        <Box bg="white" p="5" position="sticky" bottom="0" shadow={2}>
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
          <Actionsheet.Content alignItems={"left"} bg="classCard.500">
            <HStack justifyContent={"space-between"}>
              <Stack p={5} pt={1} pb="2px">
                <Text fontSize="16px" fontWeight={"600"}>
                  {t("NOTIFCATION_ACTION")}
                </Text>
              </Stack>
              <IconByName
                name="CloseCircleLineIcon"
                color='classCard.900'
                onPress={(e) => setShowModalMore(false)}
              />
            </HStack>
          </Actionsheet.Content>
          <Box bg="white" width={"100%"}
          _text={{  }}
          >
            <Text p="5" fontSize="14px" fontWeight="500" color="#727272">{t("MARK_AS_READ")}</Text>
            <Text p="5" fontSize="14px" fontWeight="500" color="#727272">{t("DELETE_MESSAGES")}</Text>
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
          <Actionsheet.Content alignItems={"left"} bg="classCard.500">
            <HStack justifyContent={"space-between"}>
              <Stack p={5} pt={1} pb="2px">
                <Text fontSize="16px" fontWeight={"600"}>
                  {t("NOTIFCATION_ACTION")}
                </Text>
              </Stack>
              <IconByName
                name="CloseCircleLineIcon"
                color='classCard.900'
                onPress={(e) => setShowModalInbox(false)}
              />
            </HStack>
          </Actionsheet.Content>
          <Box bg="white" width={"100%"}>
            <Link href={"/notification"}>
              <Box p="5">{t("INBOX")}</Box>
            </Link>
            <Link href={"/notification/outbox"}>
              <Box p="5">{t("Outbox")}</Box>
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
          <Actionsheet.Content alignItems={"left"} bg="viewNotification.500">
            <HStack justifyContent={"space-between"}>
              <Stack p={5} pt={1} pb="2px">
                <Text fontSize="16px" fontWeight={"600"}>
                  {t("VIEW_NOTIFCATION")}
                </Text>
              </Stack>
              <IconByName
                name="CloseCircleLineIcon"
                color="classCard.900"
                onPress={(e) => setShowModal(false)}
              />
            </HStack>
          </Actionsheet.Content>
          <Box bg="white" width={"100%"}>
            <Box px="5" >
              <HStack py="5" borderBottomWidth="1" borderColor="gray.200" alignItems="center" space="1">
                <IconByName
                  _icon={{ size: "16" }}
                  color="classCard.900"
                  name="CheckDoubleLineIcon"
                  isDisabled
                />
                <Text fontSize="14" fontWeight="500">
                  {t("RECEIVED_FROM_ADMIN")}
                </Text>
              </HStack>
            </Box>
            <VStack p="5" space={6}>
              <Text fontSize="14" fontWeight="600">
                {t("NOTICE")}
              </Text>
              <Text fontSize="14" fontWeight="400" textTransform={"inherit"}>
                {notification?.text}
              </Text>
            </VStack>
            <Box bg="white" p="5" bottom="0" shadow="2">
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
          <Actionsheet.Content alignItems={"left"} bg="classCard.500">
            <HStack justifyContent={"space-between"}>
              <Stack p={5} pt={2} pb="25px">
                <Text fontSize="16px" fontWeight={"600"}>
                  {t("SELECT_MODULE")}
                </Text>
              </Stack>
              <IconByName
                name="CloseCircleLineIcon"
                color='classCard.900'
                onPress={(e) => setFilterData()}
              />
            </HStack>
          </Actionsheet.Content>
          <Box bg="white" width={"100%"}>
            <Box p="5">
              <Checkbox colorScheme="button">{t("Select All")}</Checkbox>
            </Box>
            {filterData &&
              filterData.map((value, index) => (
                <Box p="5" key={index}>
                  <Checkbox colorScheme="button">{value}</Checkbox>
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
        borderColor="button.500"
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
                <Text fontSize="16px" fontWeight="600">
                  {value.name}
                </Text>
                <Text fontSize="25px" color="button.500">
                  •
                </Text>
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
            <Text {...line2style} fontSize="12px" fontWeight="500">
              {value.text}
            </Text>
            <HStack justifyContent="space-between" alignItems="center">
              <HStack space="2" alignItems="center">
                <IconByName
                  _icon={{ size: "13" }}
                  name="SurveyLineIcon"
                  isDisabled
                />
                <Text fontSize="12px" fontWeight="400">
                  {value.type}
                </Text>
              </HStack>
              <HStack space="2" alignItems="center">
                <IconByName
                  _icon={{ size: "13" }}
                  name="TimeLineIcon"
                  isDisabled
                />
                <Text fontSize="12px" fontWeight="400">
                  {value.dateTime}
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </Pressable>
      </Box>
    );
  });
};

export default Notification;
