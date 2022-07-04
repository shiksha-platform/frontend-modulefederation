import React from "react";
import { Box } from "native-base";
import { IconByName } from "@shiksha/common-lib";
import { colorTheme } from "utils/functions/ColorTheme";

export const GetIcon = ({ status, _box, color, _icon }) => {
  let icon = <></>;
  let iconProps = { fontSize: "lg", isDisabled: true, ..._icon };
  switch (status) {
    case "Present":
      icon = (
        <Box {..._box} color={color ? color : colorTheme.attendancePresent}>
          <IconByName name="CheckboxCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Absent":
      icon = (
        <Box {..._box} color={color ? color : colorTheme.attendanceAbsent}>
          <IconByName name="CloseCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Late":
      icon = (
        <Box {..._box} color={color ? color : colorTheme.checkBlankcircle}>
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Holiday":
      icon = (
        <Box
          {..._box}
          color={color ? color : colorTheme.attendanceUnmarkedLight}
        >
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Unmarked":
      icon = (
        <Box {..._box} color={color ? color : colorTheme.attendanceUnmarked}>
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Today":
      icon = (
        <Box {..._box} color={color ? color : colorTheme.attendanceUnmarked}>
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    default:
      icon = (
        <Box {..._box} color={color ? color : colorTheme.attendancedefault}>
          <IconByName name={status} {...iconProps} />
        </Box>
      );
      break;
  }
  return icon;
};
export default GetIcon;
