import React, { Suspense } from "react";
import {
  Text,
  Box,
  Button,
  HStack,
  VStack,
  Stack,
  Actionsheet,
  Center,
} from "native-base";
import { useTranslation } from "react-i18next";
import {
  capture,
  IconByName,
  Layout,
  Loading,
  telemetryFactory,
  useWindowSize,
} from "@shiksha/common-lib";
import moment from "moment";
import manifest from "../manifest.json";
import { FormNotification } from "component/FormNotification";
import RecipientList, { StudentList } from "component/RecipientList";
import { useNavigate } from "react-router-dom";
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
const CreateNotification = ({ footerLinks, appName }) => {
  const { t } = useTranslation();
  const [pageName, setPageName] = React.useState();
  const [students, setStudents] = React.useState([]);
  const [width, height] = useWindowSize();
  const navigate = useNavigate();

  React.useEffect(() => {
    capture("PAGE");
    setStudents(newStudents);
  }, []);

  const handleBackButton = () => {
    if (pageName === "Success") {
      setPageName("");
    } else if (pageName === "StudentList") {
      setPageName("RecipientList");
    } else if (pageName === "RecipientList") {
      setPageName("");
    } else {
      navigate(-1);
    }
  };

  if (pageName === "Success") {
    return (
      <Layout
        _appBar={{
          languages: manifest.languages,
          onPressBackButton: handleBackButton,
        }}
      >
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
        subHeading: moment().format("hh:mm A"),
        _subHeading: { fontWeight: 500, textTransform: "uppercase" },
      }}
      _appBar={{
        languages: manifest.languages,
        onPressBackButton: handleBackButton,
      }}
      subHeader={t("ADD_NEW_NOTIFICATION")}
      _subHeader={{
        bg: "classCard.500",
        _text: {
          fontSize: "16px",
          fontWeight: "500",
          textTransform: "inherit",
          py: "7px",
        },
      }}
      _footer={footerLinks}
    >
      {pageName === "StudentList" ? (
        <StudentList {...{ setPageName, students, setStudents }} />
      ) : pageName === "RecipientList" ? (
        <RecipientList {...{ setPageName, students, setStudents, appName }} />
      ) : (
        <FormNotification {...{ setPageName, students, setStudents }} />
      )}
      <Actionsheet isOpen={pageName === "Popup"} onClose={() => setPageName()}>
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
              onPress={(e) => setPageName()}
            />
          </HStack>
        </Actionsheet.Content>
        <Box bg="white" width={"100%"}>
          <Box px="5">
            <HStack
              py="5"
              borderBottomWidth="1"
              borderColor="gray.200"
              alignItems="center"
              space="1"
            >
              <IconByName
                _icon={{ size: "16" }}
                name="CheckDoubleLineIcon"
                color="classCard.900"
                isDisabled
              />
              <Text fontSize="14" fontWeight="500">
                {t(`Sending to ${students.length} parents`)}
              </Text>
            </HStack>
          </Box>
          <VStack p="5" space={6}>
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
                mr="5px"
                onPress={(e) => setPageName()}
              >
                {t("Cancel")}
              </Button>
              <Button
                flex="1"
                colorScheme="button"
                _text={{ color: "white" }}
                px="5"
                ml="5px"
                onPress={(e) => {
                  const telemetryData = telemetryFactory.interact({
                    appName,
                    type: "Attendance-Notification-End-Send-Another-Message",
                    startEventId: "2fd27a3a-27d6-481e-9ea5-24c5a976b0e9",
                    badTemplate: "10%",
                    goodTemplate: "50%",
                    Now: "10%",
                    Later: "50%",
                    channel: "SMS",
                  });
                  capture("INTERACT", telemetryData);
                  setPageName("Success");
                }}
              >
                {t("Send message")}
              </Button>
            </Button.Group>
          </Box>
        </Box>
      </Actionsheet>
    </Layout>
  );
};

export default CreateNotification;
