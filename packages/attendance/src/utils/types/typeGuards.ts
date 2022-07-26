import moment, { Moment } from "moment";
import { MomentUnionType } from "./types";

// Moment Related
export function isMoment2DArray(date: MomentUnionType): date is Moment[][] {
  return "filter" in date[0];
}
export function isMomentArray(date: MomentUnionType): date is Moment[] {
  return "filter" in date;
}
export function isMoment(date: MomentUnionType): date is Moment {
  return moment.isMoment(date);
}
