// Lib
import * as React from "react";
import { calendar } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";

// Utils
import { isMoment, isMoment2DArray } from "../types/typeGuards";
import { PRESENT } from "../functions/Constants";
import { GetStudentsAttendance } from "utils/functions/GetStudentsAttendance";

export interface IUseDesign {
  attendance: Array<any>;
  page: number | object;
  colorTheme: any;
  calendarView: string;
}

// Creates a design hook that helps with maintaining the
// design state
// Currently used in attendance
export const useDesign = ({
  attendance,
  page,
  colorTheme,
  calendarView,
}: IUseDesign) => {
  const { t } = useTranslation();
  const [design, setDesign] = React.useState<any>({});
  const holidays: Array<any> = [];
  React.useEffect(() => {
    let daysWithoutHolidays = [];
    if (typeof page === "object") {
      // @ts-ignore
      daysWithoutHolidays = page.map((e) => {
        const dat = calendar(e, calendarView ? calendarView : "days");
        if (isMoment(dat) || isMoment2DArray(dat)) return;

        return dat.filter(
          (e) => !(!e.day() || holidays.includes(e.format("YYYY-MM-DD")))
        ).length;
      });
    }
    if (attendance[0]) {
      let percentage = 0;
      let attendanceAll = GetStudentsAttendance({
        attendance: attendance[0],
        type: "id",
      });
      let presentAttendanceCount = attendanceAll.filter(
        (e) => e.attendance && e.attendance !== PRESENT
      ).length;
      percentage = (presentAttendanceCount * 100) / daysWithoutHolidays.length;
      if (percentage && percentage >= 100) {
        setDesign({
          bg: colorTheme.success,
          iconName: "EmotionHappyLineIcon",
          titleHeading:
            t("YOU_HAVE_BEEN_PRESENT_ALL_DAYS_THIS") + " " + calendarView,
        });
      } else if (percentage && percentage < 100 && percentage >= 50) {
        setDesign({
          bg: colorTheme.warning,
          iconName: "EmotionNormalLineIcon",
          titleHeading: t("AGERAGE_CAN_BE_IMPROVED"),
        });
      } else {
        setDesign({
          bg: colorTheme.danger,
          iconName: "EmotionSadLineIcon",
          titleHeading: t("ABSENT_TODAY_POOR_THAN_LAST") + " " + calendarView,
        });
      }
    }
  }, []);
  return { design };
};
