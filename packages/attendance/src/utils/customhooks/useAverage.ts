import * as React from "react";

export const useAverage = ({ calendarView }) => {
  const [isAverage, setIsAverage] = React.useState(false);
  React.useEffect(() => {
    setIsAverage(
      ["week", "weeks", "month", "months", "monthInDays"].includes(calendarView)
    );
  }, [calendarView]);
  return { isAverage };
};
