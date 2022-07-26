// Lib
import * as React from "react";
import { useState, useEffect } from "react";
import { calendar } from "@shiksha/common-lib";
import moment from "moment";

// Utilities
import { MomentUnionType, UseStateFunction } from "utils/types/types";

// Helper Components
import { Display } from "./Display";
import { Children } from "./Children";

// Misc
import { colors, colorTheme } from "utils/functions/ColorTheme";

// Interace
export interface ITimeBar {
  type: string;
  page: number;
  setPage: UseStateFunction<number>;
  activeColor?: string;
  setActiveColor?: UseStateFunction<string>;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
  leftErrorText?: any;
  rightErrorText?: any;
  _box?: any;
}

export const TimeBar: React.FC<ITimeBar> = (props) => {
  // Type decides if array or not
  // etc
  const [date, setDate] = useState<MomentUnionType>();
  useEffect(() => {
    if (props.type === "days") setDate(moment().add(props.page, "days"));
    else setDate(calendar(props.page, props.type));
    if (props.setActiveColor) {
      props.setActiveColor(props.page === 0 ? colors.primary : colorTheme.gray);
    }
  }, [props.page, props.setActiveColor]);

  return (
    <Display {...props}>
      <Children type={props.type} date={date} page={props.page} />
    </Display>
  );
};
