// Libs
import React from "react";
import { Box, FlatList, HStack, Text, VStack } from "native-base";
import { useTranslation } from "react-i18next";

// @ts-ignore
import manifest from "../../manifest.json";
import {
  ProgressBar,
  calendar,
  BodySmall,
  Subtitle,
  Caption,
} from "@shiksha/common-lib";

// Utilities
import { colorTheme } from "utils/functions/ColorTheme";
import { PRESENT, ABSENT, UNMARKED } from "utils/functions/Constants";
import { useStudentIds } from "utils/customhooks/useStudentIds";
import { useDesignHook } from "utils/customhooks/useDesignHook";
import { useWithoutHolidays } from "utils/customhooks/useWithoutHolidays";
import { useGenderList } from "utils/customhooks/useGenderList";
import { useAverage } from "utils/customhooks/useAverage";
import { CountReport } from "utils/functions/CountReport";

export interface IReport {
  students: Array<any>;
  attendance?: Array<any>;
  title?: Array<{
    name: string;
    _text?: Object;
  }>;
  page?: object | number;
  calendarView?: string;
  footer?: React.ReactNode;
}
export const ReportSummary: React.FC<IReport> = ({
  students,
  attendance,
  title,
  page,
  calendarView,
  footer,
}) => {
  const { t } = useTranslation();
  const { studentIds } = useStudentIds({ students });
  const { design } = useDesignHook({ attendance, page, calendarView, t });
  const { withoutHolidays } = useWithoutHolidays({ page, calendarView });
  const { genderList } = useGenderList({ students, t });
  const { isAverage } = useAverage({ calendarView });
  const fullName = localStorage.getItem("fullName");
  const status = manifest?.status ? manifest?.status : [];

  return (
    <Box rounded={"xl"}>
      <Box roundedTop={"xl"} p="5" bg={design?.bg}>
        <HStack alignItems={"center"} space={2}>
          {/* <IconByName name={design?.iconName} isDisabled color="white" />
          <Text color="white" textTransform={"inherit"}>
            {design?.titleHeading}
          </Text> */}
        </HStack>
      </Box>
      <Box bg={colorTheme.reportBoxBg}>
        {attendance && attendance.length ? (
          <FlatList
            // @ts-ignore
            data={genderList}
            renderItem={({ item, index }) => (
              <VStack
                p="5"
                space={3}
                borderBottomWidth="1"
                borderBottomColor={colorTheme.reportBorder}
              >
                {attendance.length > 1 ? <Subtitle>{item}</Subtitle> : ""}
                <VStack space={3}>
                  {attendance.map((itemAttendance, index) => (
                    <HStack key={index} alignItems={"center"} space={3}>
                      <VStack alignItems={"center"}>
                        {title && title.length && title[index] ? (
                          title[index].name.split(" ").map((item, subIndex) => (
                            <Caption key={subIndex} {...title[index]?._text}>
                              {item}
                            </Caption>
                          ))
                        ) : (
                          <BodySmall>{item}</BodySmall>
                        )}
                      </VStack>
                      <VStack flex="auto" alignContent={"center"}>
                        {
                          // @ts-ignore
                          <ProgressBar
                            data={status.map((subItem, subIndex) => {
                              let statusCount = CountReport({
                                isAverage,
                                gender: item,
                                attendanceType: subItem,
                                attendance: itemAttendance,
                                studentIds,
                                withoutHolidays: withoutHolidays[index],
                                students,
                                t,
                              });
                              return {
                                name: subItem,
                                color:
                                  subItem === PRESENT
                                    ? colorTheme.attendancePresent
                                    : subItem === ABSENT
                                    ? colorTheme.attendanceAbsent
                                    : subItem === UNMARKED
                                    ? colorTheme.attendanceUnmarked
                                    : colorTheme.gray,
                                value: statusCount,
                              };
                            })}
                          />
                        }
                      </VStack>
                    </HStack>
                  ))}
                </VStack>
              </VStack>
            )}
            keyExtractor={(item, index) => index}
          />
        ) : (
          ""
        )}
      </Box>
      <Box roundedBottom={"xl"} p="5" bg={colorTheme.reportBoxBg}>
        {footer ? (
          footer
        ) : (
          <HStack justifyContent={"space-between"}>
            <Text>{t("ATTENDANCE_TAKEN_BY")}</Text>
            <Text>{fullName ? fullName : ""}</Text>
          </HStack>
        )}
      </Box>
    </Box>
  );
};
