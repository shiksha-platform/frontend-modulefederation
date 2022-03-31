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
import CheckboxCircleFillIcon from "remixicon-react/CheckboxCircleFillIcon";
import CloseCircleLineIcon from "remixicon-react/CloseCircleLineIcon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import CheckboxBlankCircleLineIcon from "remixicon-react/CheckboxBlankCircleLineIcon";
import CheckLineIcon from "remixicon-react/CheckLineIcon";
import Loader4LineIcon from "remixicon-react/Loader4LineIcon";
import UserSmileLineIcon from "remixicon-react/UserSmileLineIcon";
import ListUnorderedIcon from "remixicon-react/ListUnorderedIcon";
import EmotionUnhappyLineIcon from "remixicon-react/EmotionUnhappyLineIcon";
import EmotionHappyLineIcon from "remixicon-react/EmotionHappyLineIcon";
import SearchLineIcon from "remixicon-react/SearchLineIcon";
import MenuLineIcon from "remixicon-react/MenuLineIcon";
import CheckDoubleLineIcon from "remixicon-react/CheckDoubleLineIcon";
import SpamLineIcon from "remixicon-react/SpamLineIcon";
import MailLineIcon from "remixicon-react/MailLineIcon";
import MailFillIcon from "remixicon-react/MailFillIcon";
import MailForbidFillIcon from "remixicon-react/MailForbidFillIcon";
import AwardLineIcon from "remixicon-react/AwardLineIcon";
import RefreshLineIcon from "remixicon-react/RefreshLineIcon";
import UserStarLineIcon from "remixicon-react/UserStarLineIcon";
// import BookMarkLineIcon from "remixicon-react/BookMarkLineIcon";
import SearchEyeLineIcon from "remixicon-react/SearchEyeLineIcon";
import StarLineIcon from "remixicon-react/StarLineIcon";
import SpyLineIcon from "remixicon-react/SpyLineIcon";
import CameraLineIcon from "remixicon-react/CameraLineIcon";
import ShareLineIcon from "remixicon-react/ShareLineIcon";
import RecordCircleFillIcon from "remixicon-react/RecordCircleFillIcon";
import FlashlightLineIcon from "remixicon-react/FlashlightLineIcon";
import CameraSwitchLineIcon from "remixicon-react/CameraSwitchLineIcon";
import Settings4LineIcon from "remixicon-react/Settings4LineIcon";
import MapPinLineIcon from "remixicon-react/MapPinLineIcon";

function IconButton({ icon, isDisabled, ...props }) {
    if (!isDisabled) {
        return (
            <IconButtonCustom
                {...props}
                icon={React.cloneElement(icon, props._icon)}
            />
        );
    } else {
        return <Stack {...props}>{React.cloneElement(icon, props._icon)}</Stack>;
    }
}

export default function IconByName(props) {
    let icon = <></>;
    switch (props.name) {
        case "ParentLineIcon":
            icon = <ParentLineIcon />;
            break;
        case "LightbulbFlashLineIcon":
            icon = <LightbulbFlashLineIcon />;
            break;
        case "FootballLineIcon":
            icon = <FootballLineIcon />;
            break;
        case "UserFollowLineIcon":
            icon = <UserFollowLineIcon />;
            break;
        case "Medal2LineIcon":
            icon = <Medal2LineIcon />;
            break;
        case "ArrowLeftLineIcon":
            icon = <ArrowLeftLineIcon />;
            break;
        case "More2LineIcon":
            icon = <More2LineIcon />;
            break;
        case "TeamLineIcon":
            icon = <TeamLineIcon />;
            break;
        case "GovernmentLineIcon":
            icon = <GovernmentLineIcon />;
            break;
        case "BookOpenLineIcon":
            icon = <BookOpenLineIcon />;
            break;
        case "UserLineIcon":
            icon = <UserLineIcon />;
            break;
        case "ArrowLeftSLineIcon":
            icon = <ArrowLeftSLineIcon />;
            break;
        case "ArrowRightSLineIcon":
            icon = <ArrowRightSLineIcon />;
            break;
        case "ArrowDownSLineIcon":
            icon = <ArrowDownSLineIcon />;
            break;
        case "ArrowUpSLineIcon":
            icon = <ArrowUpSLineIcon />;
            break;
        case "CalendarCheckLineIcon":
            icon = <CalendarCheckLineIcon />;
            break;
        case "PencilLineIcon":
            icon = <PencilLineIcon />;
            break;
        case "CheckboxCircleLineIcon":
            icon = <CheckboxCircleLineIcon />;
            break;
        case "CheckboxCircleFillIcon":
            icon = <CheckboxCircleFillIcon />;
            break;
        case "CloseCircleLineIcon":
            icon = <CloseCircleLineIcon />;
            break;
        case "CloseLineIcon":
            icon = <CloseLineIcon />;
            break;
        case "CheckboxBlankCircleLineIcon":
            icon = <CheckboxBlankCircleLineIcon />;
            break;
        case "CheckLineIcon":
            icon = <CheckLineIcon />;
            break;
        case "Loader4LineIcon":
            icon = <Loader4LineIcon />;
            break;
        case "UserSmileLineIcon":
            icon = <UserSmileLineIcon />;
            break;
        case "ListUnorderedIcon":
            icon = <ListUnorderedIcon />;
            break;
        case "EmotionUnhappyLineIcon":
            icon = <EmotionUnhappyLineIcon />;
            break;
        case "EmotionHappyLineIcon":
            icon = <EmotionHappyLineIcon />;
            break;
        case "SearchLineIcon":
            icon = <SearchLineIcon />;
            break;
        case "MenuLineIcon":
            icon = <MenuLineIcon />;
            break;
        case "CheckDoubleLineIcon":
            icon = <CheckDoubleLineIcon />;
            break;
        case "SpamLineIcon":
            icon = <SpamLineIcon />;
            break;
        case "MailLineIcon":
            icon = <MailLineIcon />;
            break;
        case "MailFillIcon":
            icon = <MailFillIcon />;
            break;
        case "MailForbidFillIcon":
            icon = <MailForbidFillIcon />;
            break;
        case "AwardLineIcon":
            icon = <AwardLineIcon />;
            break;
        case "RefreshLineIcon":
            icon = <RefreshLineIcon />;
            break;
        case "UserStarLineIcon":
            icon = <UserStarLineIcon />;
            break;
        // case "BookMarkLineIcon":
        //     icon = <BookMarkLineIcon />;
        //     break;
        case "SearchEyeLineIcon":
            icon = <SearchEyeLineIcon />;
            break;
        case "StarLineIcon":
            icon = <StarLineIcon />;
            break;
        case "SpyLineIcon":
            icon = <SpyLineIcon />;
            break;
        case "CameraLineIcon":
            icon = <CameraLineIcon />;
            break;
        case "ShareLineIcon":
            icon = <ShareLineIcon />;
            break;
        case "RecordCircleFillIcon":
            icon = <RecordCircleFillIcon />;
            break;
        case "FlashlightLineIcon":
            icon = <FlashlightLineIcon />;
            break;
        case "CameraSwitchLineIcon":
            icon = <CameraSwitchLineIcon />;
            break;
        case "Settings4LineIcon":
            icon = <Settings4LineIcon />;
            break;
        case "MapPinLineIcon":
            icon = <MapPinLineIcon />;
            break;
        default:
            if (props.name !== "Home4LineIcon") {
                console.warn(props.name);
            }
            icon = <Home4LineIcon />;
            break;
    }
    return <IconButton {...props} icon={icon} />;
}
