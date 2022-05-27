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
  capture,
  IconByName,
  Layout,
  Tab,
  H2,
  Collapsible,
} from "@shiksha/common-lib";
import moment from "moment";
import manifest from "../manifest.json";

const notificationData = [
  {
    name: "Absent Today",
    text: "Hello Mr. Rajesh Sharma, this is to inform you that your ward Sheetal is absent in school on Wednesday, 12th of January 2022.",
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

const Outbox = ({ footerLinks }) => {
  const { t } = useTranslation();
  const [showModalOutbox, setShowModalOutbox] = React.useState(false);

  React.useEffect(() => {
    capture("PAGE");
  }, []);

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
          bg="viewNotification.600"
          px="5"
          py="4px"
          _text={{textTransform:"capitalize", fontSize:"14px"}}
            rightIcon={<IconByName name="ArrowDownSLineIcon" isDisabled />}
            onPress={(e) => setShowModalOutbox(true)}
          >
            {t("Outbox")}
          </Button>
        ),
      }}
      _appBar={{ languages: manifest.languages }}
      subHeader={t("VIEW_YOUR_OUTGOMING_NOTIFICATIONS")}
      _subHeader={{
        bg: "classCard.500",
        py:"22px",
        _text: {
          fontSize: "16px",
          fontWeight: "500",
          textTransform: "inherit",
        },
      }}
      _footer={footerLinks}
    >
      <Tab
        _box={{ bg: "white", p: 5 }}
        routes={[
          { title: t("Scheduled"), component: <Schedule /> },
          { title: t("Sent"), component: <Send /> },
        ]}
      />
      <Actionsheet
        isOpen={showModalOutbox}
        onClose={() => setShowModalOutbox(false)}
      >
        <Actionsheet.Content alignItems={"left"} bg="classCard.500">
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={1} pb="2px">
              <H2 fontWeight={"500"}>
                {t("NOTIFCATION_ACTION")}
              </H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color="classCard.900"
              onPress={(e) => setShowModalOutbox(false)}
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

const Schedule = () => {
  const { t } = useTranslation();
  const [page, setPage] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);
  const [showModalMore, setShowModalMore] = React.useState(false);
  const [filterData, setFilterData] = React.useState(false);
  const [filtered, setFiltered] = React.useState(false);
  const [notification, setNotification] = React.useState({});
  const [groupValue, setGroupValue] = React.useState([]);
  const [selectOptions, setSelectOptions] = React.useState(["Mark as read"]);

  const CalendarBar = React.lazy(() => import("attendance/CalendarBar"));
  return (
    <Stack space={1} mb="2">
      <VStack space="1">
        <Box bg="white" p="5">
          <HStack justifyContent="space-between" alignItems="center">
            <CalendarBar {...{ page, setPage }} />
            <Checkbox colorScheme="button" borderColor="button.500" borderRadius="0" _text={{ color: "button.500", fontSize:"14px" }}>
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
              <ScrollView horizontal={true} >
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
                        bg="viewNotification.800"
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
                    bg="viewNotification.800"
                    _text={{textTransform:"capitelize", fontWeight:"400", fontSize:"14px"}}
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

          <Collapsible header="Scheduled by admin">
            <NotificationBox
              data={notificationData}
              onPressMore={(e) => setShowModalMore(true)}
              onPress={(notification) => {
                setShowModal(true);
                setNotification(notification);
              }}
            />
          </Collapsible>
          <Collapsible header="Scheduled by you">
            <NotificationBox
              data={notificationData}
              onPressMore={(e) => {
                setSelectOptions(["Edit Messages", "Delete messages"]);
                setShowModalMore(true);
              }}
              onPress={(notification) => {
                setShowModal(true);
                setNotification(notification);
              }}
            />
          </Collapsible>
        </Box>
      </VStack>
      <Actionsheet
        isOpen={showModalMore}
        onClose={() => setShowModalMore(false)}
      >
        <Actionsheet.Content alignItems={"left"} bg="classCard.500">
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={1} pb="2px">
              <H2 fontWeight={"500"}>
                {t("NOTIFCATION_ACTION")}
              </H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color="classCard.900"
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
        <Actionsheet.Content alignItems={"left"} bg="viewNotification.700">
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={1} pb="15px">
              <H2 fontWeight={"500"}>
                {t("VIEW_NOTIFCATION")}
              </H2>
            </Stack>
          </HStack>
        </Actionsheet.Content>
        <Box bg="white" width={"100%"}>
          <Box px="5" pt="5" >
            <VStack space="4">
              <HStack alignItems="center" space="1">
                <IconByName
                  _icon={{ size: "16" }}
                  name="CheckDoubleLineIcon"
                  color="classCard.900"
                  isDisabled
                />
                <Text fontSize="14" fontWeight="500">
                  {t("RECEIVED_FROM_ADMIN")}
                </Text>
              </HStack>
              <HStack pb="5" borderBottomWidth="1" borderColor="gray.200" alignItems="center" space="1">
                <IconByName
                  _icon={{ size: "16" }}
                  name="TimeLineIcon"
                  color="classCard.900"
                  isDisabled
                />
                <Text fontSize="14" fontWeight="500">
                  {t("Scheduled weekly on Thursday, 2:00 pm")}
                </Text>
              </HStack>
            </VStack>
          </Box>
          <VStack p="5" space={6}>
            <Text fontSize="14" fontWeight="600">
              {t("NOTICE")}
            </Text>
            <Text fontSize="14" fontWeight="400" textTransform={"inherit"}>
              {notification?.text}
            </Text>
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
        <Actionsheet.Content alignItems={"left"} bg="classCard.500">
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={1} pb="2px">
              <H2 fontWeight={"500"}>
                {t("SELECT_MODULE")}
              </H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color="classCard.900"
              onPress={(e) => setFilterData()}
            />
          </HStack>
        </Actionsheet.Content>
        <Box bg="white" width={"100%"} justifyContent="space-between">
          <Box p="5">
            <Checkbox colorScheme="button" borderColor="button.500" borderRadius="0">{t("Select All")}</Checkbox>
          </Box>
          {filterData &&
            filterData.map((value, index) => (
              <Box p="5" key={index}>
                <Checkbox colorScheme="button" borderColor="button.500" borderRadius="0">{value}</Checkbox>
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

const Send = () => {
  const { t } = useTranslation();
  const [page, setPage] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);
  const [showModalMore, setShowModalMore] = React.useState(false);
  const [filterData, setFilterData] = React.useState(false);
  const [filtered, setFiltered] = React.useState(false);
  const [notification, setNotification] = React.useState({});
  const [groupValue, setGroupValue] = React.useState([]);
  const [selectOptions, setSelectOptions] = React.useState(["Mark as read"]);
  const [sendBy, setSendBy] = React.useState("admin");

  const CalendarBar = React.lazy(() => import("attendance/CalendarBar"));

  return (
    <Stack space={1} mb="2">
      <VStack space="1">
        <Box bg="white" p="5">
          <HStack justifyContent="space-between" alignItems="center">
            <CalendarBar {...{ page, setPage }} />
            <Checkbox colorScheme="button" borderColor="button.500" borderRadius="0" _text={{ color: "button.500", fontSize:"14px" }}>
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
                _text={{ textTransform: "capitelize"}}
                onPress={(e) => setFiltered(true)}
              >
                {t("FILTER")}
              </Button>
            ) : (
              <ScrollView horizontal={true}>
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
                        bg="viewNotification.800"
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
                    bg="viewNotification.800"
                    _text={{textTransform:"capitelize", fontWeight:"500", fontSize:"14px"}}
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

          <Collapsible header="Scheduled by admin">
            <NotificationBox
              data={notificationData}
              onPressMore={(e) => setShowModalMore(true)}
              onPress={(notification) => {
                setShowModal(true);
                setNotification(notification);
              }}
            />
          </Collapsible>
          <Collapsible header="Scheduled by you">
            <NotificationBox
              data={notificationData}
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
          </Collapsible>
        </Box>
      </VStack>
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
              color="classCard.900"
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
        <Actionsheet.Content alignItems={"left"} bg="viewNotification.700">
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={1} pb="2px">
              <H2 fontWeight={"500"}>
                {t("VIEW_NOTIFCATION")}
              </H2>
            </Stack>
          </HStack>
        </Actionsheet.Content>
        <Box bg="white" width={"100%"}>
          {sendBy === "admin" ? (
            <Box px="5" pt="5" >
             <VStack space="4">
              <HStack alignItems="center" space="1">
                  <IconByName
                    _icon={{ size: "16" }}
                    name="CheckDoubleLineIcon"
                    color="classCard.900"
                    isDisabled
                  />
                  <Text fontSize="14" fontWeight="500">
                    {t("RECEIVED_FROM_ADMIN")}
                  </Text>
                </HStack>
                <HStack alignItems="center" space="1">
                  <IconByName
                    _icon={{ size: "16" }}
                    name="TimeLineIcon"
                    color="classCard.900"
                    isDisabled
                  />
                  <Text fontSize="14" fontWeight="500">
                    {t("Scheduled weekly on Thursday, 2:00 pm")}
                  </Text>
                </HStack>
              </VStack>
            </Box>
          ) : (
            ""
          )}
          <VStack p="5" space={6}>
            <Text fontSize="14" fontWeight="600">
              {t("NOTICE")}
            </Text>
            <Text fontSize="14" fontWeight="400" textTransform={"inherit"}>
              {notification?.text}
            </Text>
          </VStack>
          {sendBy === "teacher" ? (
            <VStack>
              <Box p="5" borderBottomWidth="1" borderColor="gray.200">
                <HStack alignItems="center" justifyContent="space-between">
                  <HStack alignItems="center" space="1">
                    <IconByName
                      _icon={{ size: "16" }}
                      name="CheckDoubleLineIcon"
                      color="classCard.900"
                      isDisabled
                    />
                    <Text fontSize="14" fontWeight="500">
                      {t("19 parents received")}
                    </Text>
                  </HStack>
                  <IconByName
                    _icon={{ size: "16" }}
                    name="ArrowRightSLineIcon"
                    color="classCard.900"
                    isDisabled
                  />
                </HStack>
              </Box>
              <Box p="5" borderBottomWidth="1" borderColor="gray.200">
                <HStack alignItems="center" justifyContent="space-between">
                  <HStack alignItems="center" space="1">
                    <IconByName
                      _icon={{ size: "16" }}
                      name="TimeLineIcon"
                      color="classCard.900"
                      isDisabled
                    />
                    <Text fontSize="14" fontWeight="500">
                      {t("14 parents didnt receive")}
                    </Text>
                  </HStack>
                  <IconByName
                    _icon={{ size: "16" }}
                    name="ArrowRightSLineIcon"
                    color="classCard.900"
                    isDisabled
                  />
                </HStack>
              </Box>
              <Box p="5" borderBottomWidth="1" borderColor="gray.200">
                <Button colorScheme="button" variant="outline">
                  resend
                </Button>
              </Box>
              <Box p="5" borderBottomWidth="1" borderColor="gray.200">
                <HStack alignItems="center" space="1">
                  <IconByName
                    _icon={{ size: "16" }}
                    name="CheckDoubleLineIcon"
                    color="classCard.900"
                    isDisabled
                  />
                  <Text fontSize="14" fontWeight="500">
                    {t("Sent - 23rd April, 2022.")}
                  </Text>
                </HStack>
              </Box>
              <Box p="5" borderBottomWidth="1" borderColor="gray.200">
                <HStack alignItems="center" space="1">
                  <IconByName
                    _icon={{ size: "16" }}
                    name="TimeLineIcon"
                    color="classCard.900"
                    isDisabled
                  />
                  <Text fontSize="14" fontWeight="500">
                    {t("Scheduled - weekly on Thursday, 2:00 pm")}
                  </Text>
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
        <Actionsheet.Content alignItems={"left"} bg="classCard.500">
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={1} pb="2px">
              <H2 fontWeight={"500"}>
                {t("SELECT_MODULE")}
              </H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color="classCard.900"
              onPress={(e) => setFilterData()}
            />
          </HStack>
        </Actionsheet.Content>
        <Box bg="white" width={"100%"}>
          <Box p="5">
            <Checkbox colorScheme="button" borderColor="button.500" borderRadius="0" >{t("Select All")}</Checkbox>
          </Box>
          {filterData &&
            filterData.map((value, index) => (
              <Box p="5" key={index}>
                <Checkbox colorScheme="button" borderColor="button.500" borderRadius="0" >{value}</Checkbox>
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

export default Outbox;
