import React from "react";
import { IconButton as IconButtonCustom, Stack } from "native-base";
import LightbulbFlashLineIcon from "remixicon-react/LightbulbFlashLineIcon";
import Home4LineIcon from "remixicon-react/Home4LineIcon";
import ParentLineIcon from "remixicon-react/ParentLineIcon";
import FootballLineIcon from "remixicon-react/FootballLineIcon";
import UserFollowLineIcon from "remixicon-react/UserFollowLineIcon";
import Medal2LineIcon from "remixicon-react/Medal2LineIcon";
import ArrowLeftLineIcon from "remixicon-react/ArrowLeftLineIcon";
import More2LineIcon from "remixicon-react/More2LineIcon";
import TeamLineIcon from "remixicon-react/TeamLineIcon";
import GovernmentLineIcon from "remixicon-react/GovernmentLineIcon";
import BookOpenLineIcon from "remixicon-react/BookOpenLineIcon";
import UserLineIcon from "remixicon-react/UserLineIcon";
import ArrowLeftSLineIcon from "remixicon-react/ArrowLeftSLineIcon";
import ArrowRightSLineIcon from "remixicon-react/ArrowRightSLineIcon";
import ArrowUpSLineIcon from "remixicon-react/ArrowUpSLineIcon";
import ArrowDownSLineIcon from "remixicon-react/ArrowDownSLineIcon";
import CalendarCheckLineIcon from "remixicon-react/CalendarCheckLineIcon";
import PencilLineIcon from "remixicon-react/PencilLineIcon";
import CheckboxCircleLineIcon from "remixicon-react/CheckboxCircleLineIcon";
import CloseCircleLineIcon from "remixicon-react/CloseCircleLineIcon";
import CheckboxBlankCircleLineIcon from "remixicon-react/CheckboxBlankCircleLineIcon";
import CheckLineIcon from "remixicon-react/CheckLineIcon";
import Loader4LineIcon from "remixicon-react/Loader4LineIcon";
import UserSmileLineIcon from "remixicon-react/UserSmileLineIcon";
import ListUnorderedIcon from "remixicon-react/ListUnorderedIcon";
import EmotionUnhappyLineIcon from "remixicon-react/EmotionUnhappyLineIcon";

function IconButton({ icon, isDisabled, prefix, _fontawesome, ...props }) {
  if (!isDisabled) {
    return (
      <IconButtonCustom
        {...props}
        icon={React.cloneElement(icon, props._icon)}
      />
    );
  } else {
    return <Stack {...props}>{icon}</Stack>;
  }
}

export default function IconByName(props) {
  let icon = <></>;
  switch (props.name) {
    case "ParentLineIcon":
      icon = <IconButton {...props} icon={<ParentLineIcon />} />;
      break;
    case "LightbulbFlashLineIcon":
      icon = <IconButton {...props} icon={<LightbulbFlashLineIcon />} />;
      break;
    case "FootballLineIcon":
      icon = <IconButton {...props} icon={<FootballLineIcon />} />;
      break;
    case "UserFollowLineIcon":
      icon = <IconButton {...props} icon={<UserFollowLineIcon />} />;
      break;
    case "Medal2LineIcon":
      icon = <IconButton {...props} icon={<Medal2LineIcon />} />;
      break;
    case "ArrowLeftLineIcon":
      icon = <IconButton {...props} icon={<ArrowLeftLineIcon />} />;
      break;
    case "More2LineIcon":
      icon = <IconButton {...props} icon={<More2LineIcon />} />;
      break;
    case "TeamLineIcon":
      icon = <IconButton {...props} icon={<TeamLineIcon />} />;
      break;
    case "GovernmentLineIcon":
      icon = <IconButton {...props} icon={<GovernmentLineIcon />} />;
      break;
    case "BookOpenLineIcon":
      icon = <IconButton {...props} icon={<BookOpenLineIcon />} />;
      break;
    case "UserLineIcon":
      icon = <IconButton {...props} icon={<UserLineIcon />} />;
      break;
    case "ArrowLeftSLineIcon":
      icon = <IconButton {...props} icon={<ArrowLeftSLineIcon />} />;
      break;
    case "ArrowRightSLineIcon":
      icon = <IconButton {...props} icon={<ArrowRightSLineIcon />} />;
      break;
    case "ArrowDownSLineIcon":
      icon = <IconButton {...props} icon={<ArrowDownSLineIcon />} />;
      break;
    case "ArrowUpSLineIcon":
      icon = <IconButton {...props} icon={<ArrowUpSLineIcon />} />;
      break;
    case "CalendarCheckLineIcon":
      icon = <IconButton {...props} icon={<CalendarCheckLineIcon />} />;
      break;
    case "PencilLineIcon":
      icon = <IconButton {...props} icon={<PencilLineIcon />} />;
      break;
    case "CheckboxCircleLineIcon":
      icon = <IconButton {...props} icon={<CheckboxCircleLineIcon />} />;
      break;
    case "CloseCircleLineIcon":
      icon = <IconButton {...props} icon={<CloseCircleLineIcon />} />;
      break;
    case "CheckboxBlankCircleLineIcon":
      icon = <IconButton {...props} icon={<CheckboxBlankCircleLineIcon />} />;
      break;
    case "CheckLineIcon":
      icon = <IconButton {...props} icon={<CheckLineIcon />} />;
      break;
    case "Loader4LineIcon":
      icon = <IconButton {...props} icon={<Loader4LineIcon />} />;
      break;
    case "UserSmileLineIcon":
      icon = <IconButton {...props} icon={<UserSmileLineIcon />} />;
      break;
    case "ListUnorderedIcon":
      icon = <IconButton {...props} icon={<ListUnorderedIcon />} />;
      break;
    case "EmotionUnhappyLineIcon":
      icon = <IconButton {...props} icon={<EmotionUnhappyLineIcon />} />;
      break;
    default:
      if (props.name !== "Home4LineIcon") {
        console.warn(props.name);
      }
      icon = <IconButton {...props} icon={<Home4LineIcon />} />;
      break;
  }
  return icon;
}
