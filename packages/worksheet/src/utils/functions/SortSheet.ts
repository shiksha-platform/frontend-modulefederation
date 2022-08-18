// Lib
import { capture, telemetryFactory } from "@shiksha/common-lib";

// Interface
export interface ISortSheet {
  (object: any, appName: string): Object;
}

// Sorts the given sheet
const sortSheet: ISortSheet = (object, appName) => {
  const newSort = { ["name"]: object };
  const telemetryData = telemetryFactory.interact({
    appName,
    type: "Worksheet-Sort",
    sortType: newSort,
  });
  capture("INTERACT", telemetryData);
  return newSort;
};

export default sortSheet;
