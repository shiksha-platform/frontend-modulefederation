import {
  capture,
  IconByName,
  Layout,
  Loading,
  H1,
  telemetryFactory,
  useWindowSize,
  H2,
  BodyLarge,
  BodyMedium,
  H3,
  overrideColorTheme,
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
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

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
      data = { name: "Frequency", data: ["1", "2", "3"] };
    } else if (dateTime?.REPEAT === "Monthly") {
      data = {
        name: "Frequency",
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
      { name: "Recurring", data: ["Daily", "Weekly", "Monthly"] },
      data,
    ]);
  }, [dateTime?.REPEAT]);

  if (success) {
    return (
      <Layout _appBar={{ languages: manifest.languages }}>
        <Loading
          width={width - 60}
          height={height - 100}
          icon={<IconByName name="MailLockLineIcon" _icon={{ size: 100 }} />}
          message={
            <Center mx="5">
              <H1 color="gray.500">{"Notification Scheduled"}</H1>
              <BodyMedium textAlign="center" color="gray.500">
                {`Attendance Notification has been scheduled for Thursdays 2:00pm`}
              </BodyMedium>
              {/* <Button
                colorScheme="button"
                variant="outline"
                onPress={(e) => {
                  setRecurringData([]);
                  setRecurring(false);
                  setSuccess(false);
                }}
              >
                {"Done"}
              </Button> */}
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
        subHeading: moment().format("hh:mm A"),
        _subHeading: { fontWeight: 500, textTransform: "uppercase" },
      }}
      _appBar={{ languages: manifest.languages }}
      subHeader={t("PICK_DATE_AND_TIME")}
      _subHeader={{
        bg: colors.cardBg,
        _text: {
          fontSize: "16px",
          fontWeight: "500",
          textTransform: "inherit",
        },
      }}
      _footer={footerLinks}
    >
      <Stack space={1} mb="2">
        <FormInput
          {...{ dateTime, setDateTime, dateTimeData, setDateTimeData }}
          data={[
            { name: "Date", data: ["24", "12"] },
            { name: "Month", data: ["April"] },
            {
              name: "Time",
              buttonVariant: "outline",
              data: ["8.30AM", "9.30AM", "10.30AM"],
            },
          ]}
        />
        <Box bg={colors.white} p="5">
          <Checkbox
            isChecked={recurring}
            colorScheme="button"
            borderColor={colors.primary}
            borderRadius="0"
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
        <Box bg={colors.white} p="5" position="sticky" bottom="0" shadow={2}>
          <Button.Group>
            <Button
              colorScheme="button"
              px="5"
              mr="5px"
              flex="1"
              variant="outline"
            >
              {t("CANCEL")}
            </Button>
            <Button
              colorScheme="button"
              _text={{ color: "white" }}
              px="5"
              ml="5px"
              flex="1"
              onPress={(e) => {
                setShowSummaryModal({ ...dateTime, name: "View Summary" });
              }}
            >
              {t("VIEW SUMMARY")}
            </Button>
          </Button.Group>
        </Box>
        <Actionsheet
          isOpen={dateTimeData?.name}
          onClose={() => setDateTimeData({})}
        >
          <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
            <HStack justifyContent={"space-between"}>
              <Stack p={5} pt={1} pb="15px">
                <H2>{t(`Select ${dateTimeData?.name}`)}</H2>
              </Stack>
              <IconByName
                name="CloseCircleLineIcon"
                color={colors.cardCloseIcon}
                onPress={(e) => setDateTimeData({})}
              />
            </HStack>
          </Actionsheet.Content>
          <Box bg={colors.white} width={"100%"}>
            {dateTimeData?.data &&
              dateTimeData.data.map((value, index) => {
                return (
                  <Pressable
                    key={index}
                    p="5"
                    onPress={(e) =>
                      setDateTime({ ...dateTime, [dateTimeData.name]: value })
                    }
                    bg={
                      dateTime[dateTimeData.name] === value
                        ? colors.coolGray
                        : ""
                    }
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
          <Actionsheet.Content
            alignItems={"left"}
            bg={colors.scheduleNotificationBg}
          >
            <HStack justifyContent={"space-between"}>
              <Stack p={5} pt={1} pb="15px">
                <H2>{showSummaryModal?.name}</H2>
              </Stack>
              <IconByName
                name="CloseCircleLineIcon"
                color={colors.cardCloseIcon}
                onPress={(e) => setShowSummaryModal({})}
              />
            </HStack>
          </Actionsheet.Content>
          <Box bg={colors.white} width={"100%"}>
            <Box px="5" pt="5">
              <HStack alignItems="center" space="1">
                <IconByName
                  _icon={{ size: "16" }}
                  name="CheckDoubleLineIcon"
                  color={colors.cardCloseIcon}
                  isDisabled
                />
                <BodyLarge>
                  {t(`Sending to ${students.length} parents`)}
                </BodyLarge>
              </HStack>
            </Box>
            <Box
              px="5"
              pt="5"
              pb="5"
              borderBottomWidth="1"
              borderColor={colors.lightGray}
            >
              <HStack alignItems="center" space="1">
                <IconByName
                  _icon={{ size: "16" }}
                  name="TimeLineIcon"
                  color={colors.cardCloseIcon}
                  isDisabled
                />
                <BodyLarge>
                  {t("Scheduled weekly on Thursday, 2:00 pm")}
                </BodyLarge>
              </HStack>
            </Box>
            <VStack p="5" space={6}>
              <H3>{t("NOTICE")}</H3>
              <BodyMedium textTransform={"inherit"}>
                Worksheets help the kids in exploring multiple concepts They
                develop fine motor skills, logical thinking
              </BodyMedium>
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
                {t("SCHEDULE MESSAGE")}
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
        bg={colors.white}
        p="5"
        alignItems="center"
        justifyContent="space-between"
      >
        <BodyMedium>{t(item.name)}</BodyMedium>
        <Button
          {...(item?.buttonVariant
            ? { variant: item.buttonVariant }
            : { _text: { color: "black" } })}
          rounded="full"
          colorScheme="button"
          px="5"
          bg={colors.notificationCardBg}
          _text={{ textTransform: "capitelize" }}
          rightIcon={
            <IconByName
              color={item?.buttonVariant ? colors.primary : colors.primary}
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
