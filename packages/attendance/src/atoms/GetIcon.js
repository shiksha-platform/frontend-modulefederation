import React from "react";
import { Box } from "native-base";
import { IconByName } from "@shiksha/common-lib";

export const GetIcon = ({ status, _box, color, _icon, type }) => {
  let icon = <></>;
  let iconProps = { fontSize: "xl", isDisabled: true, ..._icon };
  switch (status) {
    case "Present":
      icon = (
        <Box {..._box} color={color ? color : "present.500"}>
          <IconByName
            name={type === "Send" ? "MailFillIcon" : "MailForbidFillIcon"}
            p="5px"
            rounded="full"
            _icon={{ size: "14" }}
            bg={status.toLowerCase() + ".100"}
            {...iconProps}
          />
        </Box>
      );
      break;
    case "Absent":
      icon = (
        <Box {..._box} color={color ? color : "absent.500"}>
          <IconByName
            name={type === "Send" ? "MailFillIcon" : "MailForbidFillIcon"}
            p="5px"
            rounded="full"
            _icon={{ size: "14" }}
            bg={status.toLowerCase() + ".100"}
            {...iconProps}
          />
        </Box>
      );
      break;
    case "Holiday":
      icon = (
        <Box {..._box} color={color ? color : "attendanceUnmarked.100"}>
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Unmarked":
      icon = (
        <Box {..._box} color={color ? color : "attendanceUnmarked.500"}>
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Today":
      icon = (
        <Box {..._box} color={color ? color : "attendanceUnmarked.500"}>
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    default:
      icon = (
        <Box {..._box} color={color ? color : "attendanceUnmarked.400"}>
          <IconByName name={status} {...iconProps} />
        </Box>
      );
      break;
  }
  return icon;
};

export default GetIcon;
