// Lib
import * as React from "react";
import { calendar } from "@shiksha/common-lib";

// Utilities
import { isMoment, isMoment2DArray } from "utils/types/typeGuards";

export interface IUseWithoutHolidays {
  page: any;
  calendarView: string;
}
// This hook maintains the list of days that are not a holiday
// currently used in attendance
export const useWithoutHolidays = ({
  page,
  calendarView,
}: IUseWithoutHolidays) => {
  const [withoutHolidays, setWithoutHolidays] = React.useState<Array<any>>([]);
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
      setWithoutHolidays(daysWithoutHolidays);
    } else {
      const dat = calendar(
        page ? page : 0,
        calendarView ? calendarView : "days"
      );
      if (isMoment(dat) || isMoment2DArray(dat)) return;
      daysWithoutHolidays = [
        dat.filter(
          (e) => !(!e.day() || holidays.includes(e.format("YYYY-MM-DD")))
        ).length,
      ];
      setWithoutHolidays(daysWithoutHolidays);
    }
  }, [calendarView, page]);

  return { withoutHolidays };
};
