import {
  Actionsheet,
  Avatar,
  Box,
  Button,
  HStack,
  Stack,
  Text,
  VStack,
  Link,
} from "native-base";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IconByName,
  capture,
  telemetryFactory,
  calendar,
  classRegistryService,
  attendanceRegistryService,
  overrideColorTheme,
  BodySmall,
  Caption,
  H2,
} from "@shiksha/common-lib";
import StudentEdit from "./StudentEdit";
import moment from "moment";
import colorTheme from "../../colorTheme";

const colors = overrideColorTheme(colorTheme);

const PRESENT = "Present";
const STUDNET = "Student";

const SubCard = ({
  item,
  type,
  img,
  textTitle,
  textSubTitle,
  attendanceProp,
  _textTitle,
  _textSubTitle,
}) => {
  const { t } = useTranslation("student");
  const [attendance, setAttendance] = React.useState([]);
  const [workingDaysCount, setWorkingDaysCount] = React.useState();
  const holidays = [];

  React.useEffect(() => {
    const getData = async () => {
      let weekdays = calendar(-1, "week");
      setWorkingDaysCount(
        weekdays.filter(
          (e) => !(!e.day() || holidays.includes(e.format("YYYY-MM-DD")))
        ).length
      );
      if (!attendanceProp) {
        let params = {
          fromDate: weekdays?.[0]?.format("YYYY-MM-DD"),
          toDate: weekdays?.[weekdays.length - 1]?.format("YYYY-MM-DD"),
          userId: item.id,
        };
        let attendanceData = await attendanceRegistryService.getAll(params);
        setAttendance(attendanceData.filter((e) => e.attendance === PRESENT));
      } else {
        setAttendance(
          attendanceProp.filter(
            (e) => e.attendance === PRESENT && item.id === e.studentId
          )
        );
      }
    };
    getData();
  }, []);

  return type === "vertical" ? (
    <VStack alignItems={"center"}>
      {typeof img === "undefined" || img === true ? (
        <Avatar
          size="40px"
          bg={item?.avatarUrl ? "" : colors.studentCardBg}
          {...(item?.avatarUrl ? { source: { uri: item.avatarUrl } } : {})}
          rounded="lg"
        >
          {item?.avatarUrl ? "" : item?.fullName?.toUpperCase().substr(0, 2)}
        </Avatar>
      ) : (
        <></>
      )}
      <VStack alignItems={"center"}>
        <BodySmall
          fontSize={"12px"}
          color={colors.studentNametext}
          {..._textTitle}
        >
          {textTitle ? (
            textTitle
          ) : item?.fullName ? (
            item?.fullName
          ) : (
            <Text italic>{t("NOT_ENTERED")}</Text>
          )}
        </BodySmall>
        <Caption color={colors.labelColor} {..._textSubTitle}>
          <HStack space={1}>
            <Text>{t("ROLL_NUMBER")}:</Text>
            {item.admissionNo ? (
              item.admissionNo.toString().padStart(2, "0")
            ) : (
              <Text italic>{t("NOT_ENTERED")}</Text>
            )}
          </HStack>
        </Caption>
      </VStack>
    </VStack>
  ) : (
    <HStack space={typeof img === "undefined" || img === true ? 2 : 0}>
      {typeof img === "undefined" || img === true ? (
        <Avatar
          size="40px"
          bg={item?.avatarUrl ? "" : "amber.500"}
          {...(item?.avatarUrl ? { source: { uri: item.avatarUrl } } : {})}
          rounded="lg"
        >
          {item?.avatarUrl ? "" : item?.fullName?.toUpperCase().substr(0, 2)}
        </Avatar>
      ) : (
        <></>
      )}
      <VStack>
        <HStack alignItems="center" space="2">
          <Text color={colors.studentNametext} bold {..._textTitle}>
            {textTitle ? (
              textTitle
            ) : item?.fullName ? (
              <>
                {type !== "card" ? (
                  <HStack alignItems={"center"}>
                    {item.admissionNo ? (
                      item.admissionNo.toString().padStart(2, "0")
                    ) : (
                      <Text italic>{t("NOT_ENTERED")}</Text>
                    )}
                    <Text color={colors.studentCardsubText}>{" • "}</Text>
                  </HStack>
                ) : (
                  <></>
                )}
                {item?.fullName}
              </>
            ) : (
              <Text italic>{t("NOT_ENTERED")}</Text>
            )}
          </Text>
          {attendance &&
          workingDaysCount &&
          attendance.length >= workingDaysCount ? (
            <Box bg={colors.starIconBg} rounded="full">
              <IconByName
                p="1px"
                name="StarSFillIcon"
                _icon={{ size: 16 }}
                color={colors.starIconColor}
              />
            </Box>
          ) : (
            ""
          )}
        </HStack>
        {type === "card" ? (
          <HStack alignItems={"center"}>
            {item?.className ? (
              <Text>{item?.className}</Text>
            ) : (
              <Text italic>{t("NOT_ENTERED")}</Text>
            )}
            <Text color={colors.labelColor}>{" • "}</Text>
            <Text>{t("ROLL_NUMBER") + "."} </Text>
            {item.admissionNo ? (
              <Text>{item.admissionNo.toString().padStart(2, "0")}</Text>
            ) : (
              <Text italic>{t("NOT_ENTERED")}</Text>
            )}
          </HStack>
        ) : type === "rollFather" ? (
          <Text color={colors.labelColor} fontSize={"xs"} {..._textSubTitle}>
            {textSubTitle ? (
              textSubTitle
            ) : (
              <HStack space={1}>
                <Text>{t("ROLL_NUMBER") + "."}</Text>
                {item.admissionNo ? (
                  <Text>{item.admissionNo.toString().padStart(2, "0")}</Text>
                ) : (
                  <Text italic>{t("NOT_ENTERED")}</Text>
                )}
                <Text>{t("FATHERS_NAME")}:</Text>
                {item.fathersName ? (
                  <Text>{item.fathersName}</Text>
                ) : (
                  <Text italic>{t("NOT_ENTERED")}</Text>
                )}
              </HStack>
            )}
          </Text>
        ) : (
          <Text color={colors.labelColor} fontSize={"xs"} {..._textSubTitle}>
            {textSubTitle ? (
              textSubTitle
            ) : (
              <HStack space={1}>
                <Text>{t("FATHERS_NAME")}:</Text>
                {item.fathersName ? (
                  <Text>{item.fathersName}</Text>
                ) : (
                  <Text italic>{t("NOT_ENTERED")}</Text>
                )}
              </HStack>
            )}
          </Text>
        )}
      </VStack>
    </HStack>
  );
};

export default function Card({
  item,
  img,
  type,
  href,
  rightComponent,
  hidePopUpButton,
  textTitle,
  textSubTitle,
  attendanceProp,
  _textTitle,
  _textSubTitle,
  _arrow,
  appName,
}) {
  const { t } = useTranslation("student");
  const [open, setOpen] = useState(false);
  const [studentObject, setStudentObject] = useState(item);
  const teacherId = localStorage.getItem("id");

  const handalOpenPoup = async (e) => {
    if (e?.currentClassID) {
      let classObj = await classRegistryService.getOne({
        id: e.currentClassID,
      });
      item.className = classObj?.className;
    }
    setOpen(true);
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Attendance-Student-Card",
      groupID: studentObject?.currentClassID,
      studentId: studentObject?.id,
    });
    capture("INTERACT", telemetryData);
  };

  const PressableNew = ({ item, children, href, ...prop }) => {
    return href ? (
      <Link
        href={href}
        style={{ color: "rgb(63, 63, 70)", textDecoration: "none" }}
      >
        {children}
      </Link>
    ) : (
      <Box {...prop}>{children}</Box>
    );
  };

  return (
    <HStack justifyContent="space-between" w={"100%"} alignItems="center">
      <PressableNew href={href ? href : null}>
        <SubCard
          {...{
            item,
            img,
            type,
            textTitle,
            textSubTitle,
            attendanceProp,
            _textTitle,
            _textSubTitle,
          }}
        />
      </PressableNew>
      {rightComponent ? (
        rightComponent
      ) : !hidePopUpButton ? (
        <Box>
          <IconByName
            onPress={(e) => handalOpenPoup(item)}
            size="sm"
            color={colors.downIconColor}
            name="ArrowDownSLineIcon"
            {..._arrow}
          />
          <Actionsheet isOpen={open} onClose={(e) => setOpen(false)}>
            <Actionsheet.Content bg={colors.studentBg} alignItems="inherit">
              <HStack justifyContent={"space-between"}>
                <Box px="3" py="4" pt="0">
                  <SubCard
                    {...{
                      item,
                      img,
                      type: type ? type : "card",
                      textTitle,
                      textSubTitle,
                      attendanceProp,
                      _textTitle,
                      _textSubTitle,
                    }}
                  />
                </Box>
                <IconByName
                  name="CloseCircleLineIcon"
                  onPress={(e) => setOpen(false)}
                />
              </HStack>
            </Actionsheet.Content>
            <Box bg={colors.white} width={"100%"}>
              <Stack space={5}>
                <StudentEdit
                  {...{
                    studentObject,
                    setStudentObject,
                    onlyParameterProp: ["firstName", "lastName", "admissionNo"],
                  }}
                />
                <VStack>
                  <Box px="5">
                    <HStack
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <H2>{t("NOTES")}</H2>
                      <Button
                        variant="ghost"
                        colorScheme="button"
                        endIcon={
                          <IconByName name={"PencilLineIcon"} isDisabled />
                        }
                        _text={{ fontWeight: "400" }}
                      >
                        {t("EDIT")}
                      </Button>
                    </HStack>
                    <Box bg={colors.lightGray} rounded={"md"} p="4">
                      <HStack
                        justifyContent={"space-between"}
                        alignItems="center"
                      >
                        <Text>{t("STUDENT_IS_GOOD_NEED")}</Text>
                      </HStack>
                    </Box>
                  </Box>
                </VStack>
                <Stack pb={5} alignItems={"center"}>
                  <Link href={"/students/" + item.id}>
                    <Box
                      rounded="lg"
                      borderColor={colors.primary}
                      borderWidth="1"
                      _text={{ color: colors.primary }}
                      px={6}
                      py={2}
                    >
                      {t("SEE_MORE")}
                    </Box>
                  </Link>
                </Stack>
              </Stack>
            </Box>
          </Actionsheet>
        </Box>
      ) : (
        <></>
      )}
    </HStack>
  );
}
