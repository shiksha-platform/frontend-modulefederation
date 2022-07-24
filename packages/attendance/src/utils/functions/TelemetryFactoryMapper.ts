// Lib
import { telemetryFactory } from "@shiksha/common-lib";

export const begin = (data) => {
  const dat = telemetryFactory.start(data);
  return dat;
};

export const end = (data) => {
  const dat = telemetryFactory.end(data);
  return dat;
};

export const interact = (data) => {
  const dat = telemetryFactory.interact(data);
  return dat;
};
