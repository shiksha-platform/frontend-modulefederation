import React, { Suspense } from "react";
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
  FormControl,
  Input,
  Center,
} from "native-base";
import { useTranslation } from "react-i18next";
import {
  capture,
  IconByName,
  Layout,
  Loading,
  Tab,
  useWindowSize,
} from "@shiksha/common-lib";
import moment from "moment";
import manifest from "../manifest.json";

const CreateNotification = ({ footerLinks, appName }) => {
  const { t } = useTranslation();
  const [pageName, setPageName] = React.useState();
  const [students, setStudents] = React.useState([]);
  const [width, height] = useWindowSize();

  const CalendarBar = React.lazy(() => import("attendance/CalendarBar"));

  React.useEffect(() => {
    capture("PAGE");
  }, []);

  if (pageName === "Success") {
    return (
      <Layout _appBar={{ languages: manifest.languages }}>
        <Loading
          width={width}
          height={height - 60}
          icon={<IconByName name="MailSendLineIcon" _icon={{ size: 100 }} />}
          message={
            <Center>
              <Text fontSize="24" fontWeight="600" color="gray.500">
                {"Notification Sent"}
              </Text>
              <Text fontSize="14" fontWeight="400" color="gray.500">
                {`Attendance Notification has been sent to ${students.length} parents`}
              </Text>
              <Button
                colorScheme="button"
                variant="outline"
                onPress={(e) => setPageName()}
              >
                {"Done"}
              </Button>
            </Center>
          }
        />
      </Layout>
    );
  }

  return (
    <Layout
      _header={{
        title: t("MY_NOTIFICATIONS"),
        icon: "Group",
        subHeading: moment().format("hh:mm a"),
        _subHeading: { fontWeight: 500, textTransform: "uppercase" },
      }}
      _appBar={{ languages: manifest.languages }}
      subHeader={t("ADD_NEW_NOTIFICATION")}
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
      {pageName === "StudentList" ? (
        <StudentList {...{ setPageName, students, setStudents }} />
      ) : pageName === "RecipientList" ? (
        <RecipientList {...{ setPageName, students, setStudents }} />
      ) : pageName === "Popup" ? (
        <Actionsheet
          isOpen={pageName === "Popup"}
          onClose={() => setPageName()}
        >
          <Actionsheet.Content alignItems={"left"} bg="classCard.500">
            <HStack justifyContent={"space-between"}>
              <Stack p={5} pt={2} pb="25px">
                <Text fontSize="16px" fontWeight={"600"}>
                  {t("VIEW_NOTIFCATION")}
                </Text>
              </Stack>
              <IconByName
                name="CloseCircleLineIcon"
                onPress={(e) => setPageName()}
              />
            </HStack>
          </Actionsheet.Content>
          <Box bg="white" width={"100%"}>
            <Box p="5" borderBottomWidth="1" borderColor="gray.200">
              <HStack alignItems="center" space="1">
                <IconByName
                  _icon={{ size: "16" }}
                  name="CheckDoubleLineIcon"
                  isDisabled
                />
                <Text fontSize="14" fontWeight="500">
                  {t(`Sending to ${students.length} parents`)}
                </Text>
              </HStack>
            </Box>
            <VStack p="5" space={4} shadow="1">
              <Text fontSize="14" fontWeight="600">
                {t("NOTICE")}
              </Text>
              <Text fontSize="14" fontWeight="400" textTransform={"inherit"}>
                Worksheets help the kids in exploring multiple concepts They
                develop fine motor skills, logical thinking
              </Text>
            </VStack>
            <Box p="5">
              <Button.Group>
                <Button
                  flex="1"
                  colorScheme="button"
                  variant="outline"
                  px="5"
                  onPress={(e) => setPageName()}
                >
                  {t("Cancel")}
                </Button>
                <Button
                  flex="1"
                  colorScheme="button"
                  _text={{ color: "white" }}
                  px="5"
                  onPress={(e) => setPageName("Success")}
                >
                  {t("Send message")}
                </Button>
              </Button.Group>
            </Box>
          </Box>
        </Actionsheet>
      ) : (
        <AddNotification {...{ setPageName, students, setStudents }} />
      )}
    </Layout>
  );
};

const AddNotification = ({ setPageName }) => {
  const { t } = useTranslation();
  const [showModalTemplate, setShowModalTemplate] = React.useState(false);

  return (
    <Stack space={1} mb="2">
      <Box bg="white" p="5">
        <FormControl>
          <FormControl.Label>
            <Text fontSize={"14px"} fontWeight="500">
              {"Notification title"}
            </Text>
          </FormControl.Label>
          <Input variant="filled" p={2} placeholder="Enter name" />
        </FormControl>
      </Box>
      <HStack
        bg="white"
        p="5"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontSize={"14px"} fontWeight="500">
          {"Choose Module"}
        </Text>
        <Button
          rounded="full"
          colorScheme="button"
          _text={{ color: "white" }}
          px="5"
          rightIcon={
            <IconByName color={"white"} name="ArrowDownSLineIcon" isDisabled />
          }
          onPress={(e) => console.log("")}
        >
          {t("Attendance")}
        </Button>
      </HStack>
      <HStack
        bg="white"
        p="5"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontSize={"14px"} fontWeight="500">
          {"Choose event trigger"}
        </Text>
        <Button
          rounded="full"
          colorScheme="button"
          _text={{ color: "white" }}
          px="5"
          rightIcon={
            <IconByName color={"white"} name="ArrowDownSLineIcon" isDisabled />
          }
          onPress={(e) => console.log("")}
        >
          {t("Absent for 3 days")}
        </Button>
      </HStack>
      <HStack
        bg="white"
        p="5"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontSize={"14px"} fontWeight="500">
          {"Choose channel"}
        </Text>
        <Button
          rounded="full"
          colorScheme="button"
          variant="outline"
          px="5"
          rightIcon={
            <IconByName
              color={"button.500"}
              name="ArrowDownSLineIcon"
              isDisabled
            />
          }
          onPress={(e) => console.log("")}
        >
          {t("Select channel")}
        </Button>
      </HStack>
      <Box bg="white" p="5">
        <VStack space="2">
          <HStack justifyContent="space-between">
            <Text fontSize="16" fontWeight="600">
              {"Message"}
            </Text>
            <Button variant="ghost" onPress={(e) => setShowModalTemplate(true)}>
              <Text fontSize="14" fontWeight="500" color="button.500">
                {"Use Another Template"}
              </Text>
            </Button>
          </HStack>
          <Text fontSize="12" fontWeight="400">
            Worksheets help the kids in exploring multiple concepts They develop
            fine motor skills, logical thinking
          </Text>
        </VStack>
      </Box>
      <Box bg="white" p="5">
        <Pressable onPress={(e) => setPageName("RecipientList")}>
          <HStack justifyContent="space-between" alignItems="center">
            <Text>{"View recipient list"}</Text>
            <IconByName name="ArrowRightSLineIcon" isDisabled />
          </HStack>
        </Pressable>
      </Box>
      <Box bg="white" p="5" position="sticky" bottom="0" shadow={2}>
        <Button.Group>
          <Button flex="1" colorScheme="button" variant="outline" px="5">
            {t("SEND LATER")}
          </Button>
          <Button
            flex="1"
            colorScheme="button"
            _text={{ color: "white" }}
            px="5"
            onPress={(e) => setPageName("RecipientList")}
          >
            {t("Review & Send Now")}
          </Button>
        </Button.Group>
      </Box>
      <Actionsheet
        isOpen={showModalTemplate}
        onClose={() => setShowModalTemplate(false)}
      >
        <Actionsheet.Content alignItems={"left"} bg="classCard.500">
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="25px">
              <Text fontSize="16px" fontWeight={"600"}>
                {t("Select Template")}
              </Text>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              onPress={(e) => setShowModalTemplate(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <Box bg="white" width={"100%"}>
          {[
            "Absent Notice",
            "Holiday Announcement",
            "Attendace Report",
            "Timetable Update",
          ].map((value, index) => {
            return (
              <Box p="5" key={index}>
                <Checkbox colorScheme="button">{value}</Checkbox>
              </Box>
            );
          })}
          <Box p="5">
            <Button
              colorScheme="button"
              _text={{ color: "white" }}
              onPress={(e) => setShowModalTemplate(false)}
            >
              {t("CONTINUE")}
            </Button>
          </Box>
        </Box>
      </Actionsheet>
    </Stack>
  );
};

const RecipientList = ({ setPageName, students, setStudents }) => {
  const { t } = useTranslation();
  const Card = React.lazy(() => import("students/Card"));
  const [checkStudents, setCheckStudents] = React.useState([]);

  const newStudents = [
    {
      fullName: "Shah Rukh Khan",
      admissionNo: "1",
      fathersName: "Mr. Fathers Name",
      days: "11",
    },
    {
      fullName: "Salman Khan",
      admissionNo: "7",
      fathersName: "Mr. Fathers Name",
      days: "11",
    },
    {
      fullName: "Rahul Dravid",
      admissionNo: "8",
      fathersName: "Mr. Fathers Name",
      days: "3",
    },
    {
      fullName: "Shah Rukh Khan",
      admissionNo: "9",
      fathersName: "Mr. Fathers Name",
      days: "11",
    },
    {
      fullName: "Sandhya Shankar",
      admissionNo: "3",
      fathersName: "Mr. Fathers Name",
      days: "11",
    },
    {
      fullName: "Siddharth Kabra",
      admissionNo: "6",
      fathersName: "Mr. Fathers Name",
      days: "3",
    },
  ];

  React.useEffect((e) => {
    setStudents(newStudents);
    setCheckStudents(newStudents.map((e) => e.admissionNo));
  }, []);

  return (
    <Stack>
      <VStack bg="white" p="5" space="2">
        <Box pb="2">
          <Text fontSize="14px" fontWeight="500">
            {"Recipient List"}
          </Text>
        </Box>
        {newStudents.map((item, index) => (
          <Box
            key={index}
            borderWidth="1"
            borderColor="absentCardBg.600"
            bg="absentCardBg.500"
            p="10px"
            rounded="lg"
          >
            <Suspense fallback="logding">
              <Card
                item={item}
                type="rollFather"
                textTitle={
                  <VStack alignItems="center">
                    <Text fontSize="14" fontWeight="500">
                      <Text>{item.fullName}</Text>
                      <Text color="gray.300"> • </Text>
                      <Text color="absentCardText.500">
                        {item.days} {t("DAYS")}
                      </Text>
                    </Text>
                  </VStack>
                }
                rightComponent={
                  <input
                    type={"checkbox"}
                    value={item.admissionNo}
                    checked={
                      students.filter((e) => e.admissionNo === item.admissionNo)
                        .length > 0
                    }
                    onChange={(event) => {
                      if (!event.currentTarget.checked) {
                        const newData = students.filter(
                          (subE) => subE.admissionNo !== item.admissionNo
                        );
                        setStudents(newData);
                      } else {
                        setStudents([...students, item]);
                      }
                    }}
                  />
                }
                hidePopUpButton
              />
            </Suspense>
          </Box>
        ))}
      </VStack>
      <Box bg="white" p="5" position="sticky" bottom="0" shadow={2}>
        <Button.Group>
          <Button
            flex="1"
            colorScheme="button"
            variant="outline"
            px="5"
            onPress={(e) => {
              setStudents(
                newStudents.filter((e) => checkStudents.includes(e.admissionNo))
              );
              setPageName("StudentList");
            }}
          >
            {t("ADD STUDENTS")}
          </Button>
          <Button
            flex="1"
            colorScheme="button"
            _text={{ color: "white" }}
            px="5"
            onPress={(e) => setPageName("Popup")}
          >
            {t("SAVE CHANGES")}
          </Button>
        </Button.Group>
      </Box>
    </Stack>
  );
};

const StudentList = ({ setPageName, students, setStudents }) => {
  const { t } = useTranslation();
  const Card = React.lazy(() => import("students/Card"));

  const newStudents = [
    {
      fullName: "Shah Rukh Khan",
      admissionNo: "1",
      fathersName: "Mr. Fathers Name",
      days: "11",
    },
    {
      fullName: "Rahul Patil",
      admissionNo: "2",
      fathersName: "Mr. Fathers Name",
      days: "11",
    },
    {
      fullName: "Sandhya Shankar",
      admissionNo: "3",
      fathersName: "Mr. Fathers Name",
      days: "3",
    },
    {
      fullName: "Jatin Agarwal",
      admissionNo: "4",
      fathersName: "Mr. Fathers Name",
      days: "11",
    },
    {
      fullName: "Rehan Orpe",
      admissionNo: "5",
      fathersName: "Mr. Fathers Name",
      days: "11",
    },
    {
      fullName: "Siddharth Kabra",
      admissionNo: "6",
      fathersName: "Mr. Fathers Name",
      days: "3",
    },
  ];

  return (
    <Stack>
      <VStack bg="white" p="5" space="2">
        <Box pb="2">
          <Text fontSize="14px" fontWeight="500">
            {"Recipient List"}
          </Text>
        </Box>
        {newStudents.map((item, index) => (
          <Box
            key={index}
            borderBottomWidth="1"
            borderColor="gray.100"
            p="10px"
          >
            <Suspense fallback="logding">
              <Card
                item={item}
                type="rollFather"
                textTitle={
                  <VStack alignItems="center">
                    <Text fontSize="14" fontWeight="500">
                      <Text>{item.admissionNo}</Text>
                      <Text color="gray.300"> • </Text>
                      <Text>{item.fullName}</Text>
                    </Text>
                  </VStack>
                }
                textSubTitle={
                  <VStack alignItems="center">
                    <Text fontSize="10" fontWeight="400" color="gray.400">
                      <Text>{item.fathersName}</Text>
                    </Text>
                  </VStack>
                }
                rightComponent={
                  <input
                    type={"checkbox"}
                    value={item.admissionNo}
                    checked={
                      students.filter((e) => e.admissionNo === item.admissionNo)
                        .length > 0
                    }
                    onChange={(event) => {
                      if (!event.currentTarget.checked) {
                        const newData = students.filter(
                          (subE) => subE.admissionNo !== item.admissionNo
                        );
                        setStudents(newData);
                      } else {
                        setStudents([...students, item]);
                      }
                    }}
                  />
                }
                hidePopUpButton
              />
            </Suspense>
          </Box>
        ))}
      </VStack>
      <Box bg="white" p="5" position="sticky" bottom="0" shadow={2}>
        <Button.Group>
          <Button
            flex="1"
            colorScheme="button"
            _text={{ color: "white" }}
            px="5"
            onPress={(e) => setPageName("Popup")}
          >
            {t("ADD STUDENTS")}
          </Button>
        </Button.Group>
      </Box>
    </Stack>
  );
};

export default CreateNotification;
