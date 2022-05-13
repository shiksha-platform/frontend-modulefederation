import {
  capture,
  IconByName,
  Layout,
  Loading,
  telemetryFactory,
  useWindowSize,
} from "@shiksha/common-lib";
import moment from "moment";
import {
  HStack,
  Stack,
  Button,
  Text,
  Actionsheet,
  Box,
  Pressable,
  Checkbox,
  VStack,
  Center,
} from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import manifest from "../manifest.json";

export default function ScheduleNotification({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [dateTime, setDateTime] = React.useState({});
  const [dateTimeData, setDateTimeData] = React.useState({});
  const [recurring, setRecurring] = React.useState(false);
  const [recurringData, setRecurringData] = React.useState([]);
  const [showSummaryModal, setShowSummaryModal] = React.useState();
  const [success, setSuccess] = React.useState(false);
  const [width, height] = useWindowSize();

  React.useEffect(() => {
    setRecurringData([
      { name: "REPEAT", data: ["Daily", "Weekly", "Monthly"] },
    ]);
  }, [recurring]);

  React.useEffect(() => {
    let data = {};
    setDateTime({ ...dateTime, FREQUENCY: "", Time: "" });
    if (dateTime?.REPEAT === "Weekly") {
      data = { name: "FREQUENCY", data: ["1", "2", "3"] };
    } else if (dateTime?.REPEAT === "Monthly") {
      data = {
        name: "FREQUENCY",
        data: [
          "Monthly on day 28",
          "Monthly on the fourth thursday",
          "Monthly on last thursday",
        ],
      };
    } else {
      data = { name: "Time", data: ["3:00PM", "4:00PM", "5:00PM"] };
    }
    setRecurringData([
      { name: "REPEAT", data: ["Daily", "Weekly", "Monthly"] },
      data,
    ]);
  }, [dateTime?.REPEAT]);

  if (success) {
    return (
      <Layout _appBar={{ languages: manifest.languages }}>
        <Loading
          width={width}
          height={height - 60}
          icon={<IconByName name="MailLockLineIcon" _icon={{ size: 100 }} />}
          message={
            <Center>
              <Text fontSize="24" fontWeight="600" color="gray.500">
                {"Notification Scheduled"}
              </Text>
              <Text fontSize="14" fontWeight="400" color="gray.500">
                {`Attendance Notification has been scheduled for Thursdays 2:00pm`}
              </Text>
              <Button
                colorScheme="button"
                variant="outline"
                onPress={(e) => {
                  setRecurringData([]);
                  setRecurring(false);
                  setSuccess(false);
                }}
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
        title: t("SCHEDULE_NOTIFICATION"),
        icon: "Group",
        subHeading: moment().format("hh:mm a"),
        _subHeading: { fontWeight: 500, textTransform: "uppercase" },
      }}
      _appBar={{ languages: manifest.languages }}
      subHeader={t("PICK_DATE_AND_TIME")}
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
      <Stack space={1} mb="2">
        <FormInput
          {...{ dateTime, setDateTime, dateTimeData, setDateTimeData }}
          data={[
            { name: "DATE", data: ["24", "12"] },
            { name: "MONTH", data: ["April"] },
            {
              name: "TIME",
              buttonVariant: "outline",
              data: ["8.30AM", "9.30AM", "10.30AM"],
            },
          ]}
        />
        <Box bg="white" p="5">
          <Checkbox
            isChecked={recurring}
            colorScheme="button"
            onChange={(e) => setRecurring(!recurring)}
          >
            {t("THIS_IS_A_RECURRING_NOTIFICATION")}
          </Checkbox>
        </Box>
        {recurring ? (
          <FormInput
            {...{ dateTime, setDateTime, dateTimeData, setDateTimeData }}
            data={recurringData}
          />
        ) : (
          ""
        )}
        <Box bg="white" p="5" position="sticky" bottom="0" shadow={2}>
          <Button.Group>
            <Button colorScheme="button" px="5" flex="1" variant="outline">
              {t("CANCEL")}
            </Button>
            <Button
              colorScheme="button"
              _text={{ color: "white" }}
              px="5"
              flex="1"
              onPress={(e) => {
                console.log({ dateTime });
                setShowSummaryModal({ ...dateTime, name: "View Summary" });
              }}
            >
              {t("REVIEW")}
            </Button>
          </Button.Group>
        </Box>
        <Actionsheet
          isOpen={dateTimeData?.name}
          onClose={() => setDateTimeData({})}
        >
          <Actionsheet.Content alignItems={"left"} bg="classCard.500">
            <HStack justifyContent={"space-between"}>
              <Stack p={5} pt={2} pb="25px">
                <Text fontSize="16px" fontWeight={"600"}>
                  {t(`Select ${dateTimeData?.name}`)}
                </Text>
              </Stack>
              <IconByName
                name="CloseCircleLineIcon"
                onPress={(e) => setDateTimeData({})}
              />
            </HStack>
          </Actionsheet.Content>
          <Box bg="white" width={"100%"}>
            {dateTimeData?.data &&
              dateTimeData.data.map((value, index) => {
                return (
                  <Pressable
                    key={index}
                    p="5"
                    onPress={(e) =>
                      setDateTime({ ...dateTime, [dateTimeData.name]: value })
                    }
                    bg={dateTime[dateTimeData.name] === value ? "gray.100" : ""}
                  >
                    <Text colorScheme="button">{value}</Text>
                  </Pressable>
                );
              })}
            <Box p="5">
              <Button
                colorScheme="button"
                _text={{ color: "white" }}
                onPress={(e) => setDateTimeData({})}
              >
                {t("SELECT")}
              </Button>
            </Box>
          </Box>
        </Actionsheet>
        <Actionsheet
          isOpen={showSummaryModal?.name}
          onClose={() => setShowSummaryModal({})}
        >
          <Actionsheet.Content alignItems={"left"} bg="classCard.500">
            <HStack justifyContent={"space-between"}>
              <Stack p={5} pt={2} pb="25px">
                <Text fontSize="16px" fontWeight={"600"}>
                  {showSummaryModal?.name}
                </Text>
              </Stack>
              <IconByName
                name="CloseCircleLineIcon"
                onPress={(e) => setShowSummaryModal({})}
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
            <Box p="5" borderBottomWidth="1" borderColor="gray.200">
              <HStack alignItems="center" space="1">
                <IconByName
                  _icon={{ size: "16" }}
                  name="TimeLineIcon"
                  isDisabled
                />
                <Text fontSize="14" fontWeight="500">
                  {t("Scheduled weekly on Thursday, 2:00 pm")}
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
              <Button
                colorScheme="button"
                _text={{ color: "white" }}
                onPress={(e) => {
                  setSuccess(true);
                  setShowSummaryModal({});
                  if (recurring) {
                    const telemetryData = telemetryFactory.interact({
                      appName,
                      type: "Attendance-Notification-Recurring-Notifications",
                      repeat: dateTime?.REPEAT,
                      frequency: dateTime?.FREQUENCY,
                      time: dateTime?.TIME,
                    });
                    capture("INTERACT", telemetryData);
                  }
                }}
              >
                {t("SELECT")}
              </Button>
            </Box>
          </Box>
        </Actionsheet>
      </Stack>
    </Layout>
  );
}

const FormInput = ({
  data,
  dateTime,
  setDateTime,
  dateTimeData,
  setDateTimeData,
}) => {
  const { t } = useTranslation();
  return (
    data &&
    data.map((item, index) => (
      <HStack
        key={index}
        bg="white"
        p="5"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontSize={"14px"} fontWeight="500">
          {t(item.name)}
        </Text>
        <Button
          {...(item?.buttonVariant
            ? { variant: item.buttonVariant }
            : { _text: { color: "white" } })}
          rounded="full"
          colorScheme="button"
          px="5"
          rightIcon={
            <IconByName
              color={item?.buttonVariant ? "button.500" : "white"}
              name="ArrowDownSLineIcon"
              isDisabled
            />
          }
          onPress={(e) => setDateTimeData(item)}
        >
          {dateTime[item.name] ? dateTime[item.name] : `Select ${t(item.name)}`}
        </Button>
      </HStack>
    ))
  );
};
