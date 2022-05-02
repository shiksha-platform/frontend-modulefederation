import React from 'react'
import { IconButton as IconButtonCustom, Stack } from 'native-base'
import LightbulbFlashLineIcon from 'remixicon-react/LightbulbFlashLineIcon'
import Home4LineIcon from 'remixicon-react/Home4LineIcon'
import ParentLineIcon from 'remixicon-react/ParentLineIcon'
import FootballLineIcon from 'remixicon-react/FootballLineIcon'
import UserFollowLineIcon from 'remixicon-react/UserFollowLineIcon'
import Medal2LineIcon from 'remixicon-react/Medal2LineIcon'
import ArrowLeftLineIcon from 'remixicon-react/ArrowLeftLineIcon'
import More2LineIcon from 'remixicon-react/More2LineIcon'
import TeamLineIcon from 'remixicon-react/TeamLineIcon'
import GovernmentLineIcon from 'remixicon-react/GovernmentLineIcon'
import BookOpenLineIcon from 'remixicon-react/BookOpenLineIcon'
import UserLineIcon from 'remixicon-react/UserLineIcon'
import ArrowLeftSLineIcon from 'remixicon-react/ArrowLeftSLineIcon'
import ArrowRightSLineIcon from 'remixicon-react/ArrowRightSLineIcon'
import ArrowUpSLineIcon from 'remixicon-react/ArrowUpSLineIcon'
import ArrowDownSLineIcon from 'remixicon-react/ArrowDownSLineIcon'
import CalendarCheckLineIcon from 'remixicon-react/CalendarCheckLineIcon'
import CalendarEventLineIcon from 'remixicon-react/CalendarEventLineIcon'
import PencilLineIcon from 'remixicon-react/PencilLineIcon'
import CheckboxCircleLineIcon from 'remixicon-react/CheckboxCircleLineIcon'
import CheckboxCircleFillIcon from 'remixicon-react/CheckboxCircleFillIcon'
import CloseCircleLineIcon from 'remixicon-react/CloseCircleLineIcon'
import CheckboxBlankCircleLineIcon from 'remixicon-react/CheckboxBlankCircleLineIcon'
import CheckLineIcon from 'remixicon-react/CheckLineIcon'
import Loader4LineIcon from 'remixicon-react/Loader4LineIcon'
import UserSmileLineIcon from 'remixicon-react/UserSmileLineIcon'
import ListUnorderedIcon from 'remixicon-react/ListUnorderedIcon'
import EmotionUnhappyLineIcon from 'remixicon-react/EmotionUnhappyLineIcon'
import BriefcaseLineIcon from 'remixicon-react/BriefcaseLineIcon'
import FlashlightLineIcon from 'remixicon-react/FlashlightLineIcon'
import CheckboxBlankFillIcon from 'remixicon-react/CheckboxBlankFillIcon'
import MapPinLineIcon from 'remixicon-react/MapPinLineIcon'
import TimeLineIcon from 'remixicon-react/TimeLineIcon'
import SurveyLineIcon from 'remixicon-react/SurveyLineIcon'
import CheckDoubleLineIcon from 'remixicon-react/CheckDoubleLineIcon'
import MailOpenLineIcon from 'remixicon-react/MailOpenLineIcon'
import MailSendLineIcon from 'remixicon-react/MailSendLineIcon'
import Notification2LineIcon from 'remixicon-react/Notification2LineIcon'
import MailLockLineIcon from 'remixicon-react/MailLockLineIcon'

function IconButton({ icon, isDisabled, prefix, ...props }) {
  if (!isDisabled) {
    return <IconButtonCustom {...props} icon={icon} />
  } else {
    return <Stack {...props}>{icon}</Stack>
  }
}

export default function IconByName({ _icon, ...props }) {
  let icon = <React.Fragment />
  switch (props.name) {
    case 'ParentLineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<ParentLineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'LightbulbFlashLineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<LightbulbFlashLineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'FootballLineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<FootballLineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'UserFollowLineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<UserFollowLineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'Medal2LineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<Medal2LineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'ArrowLeftLineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<ArrowLeftLineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'More2LineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<More2LineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'TeamLineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<TeamLineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'GovernmentLineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<GovernmentLineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'BookOpenLineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<BookOpenLineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'UserLineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<UserLineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'ArrowLeftSLineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<ArrowLeftSLineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'ArrowRightSLineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<ArrowRightSLineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'ArrowDownSLineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<ArrowDownSLineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'ArrowUpSLineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<ArrowUpSLineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'CalendarCheckLineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<CalendarCheckLineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'CalendarEventLineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<CalendarEventLineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'PencilLineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<PencilLineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'CheckboxCircleLineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<CheckboxCircleLineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'CheckboxCircleFillIcon':
      icon = (
        <IconButton
          {...props}
          icon={<CheckboxCircleFillIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'CheckboxBlankCircleLineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<CheckboxBlankCircleLineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'CloseCircleLineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<CloseCircleLineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'CheckboxBlankFillIcon':
      icon = (
        <IconButton
          {...props}
          icon={<CheckboxBlankFillIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'CheckLineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<CheckLineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'Loader4LineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<Loader4LineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'UserSmileLineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<UserSmileLineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'ListUnorderedIcon':
      icon = (
        <IconButton
          {...props}
          icon={<ListUnorderedIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'EmotionUnhappyLineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<EmotionUnhappyLineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'BriefcaseLineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<BriefcaseLineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'FlashlightLineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<FlashlightLineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'MapPinLineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<MapPinLineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'TimeLineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<TimeLineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'SurveyLineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<SurveyLineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'CheckDoubleLineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<CheckDoubleLineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'MailOpenLineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<MailOpenLineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'MailLockLineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<MailLockLineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'MailSendLineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<MailSendLineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    case 'Notification2LineIcon':
      icon = (
        <IconButton
          {...props}
          icon={<Notification2LineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
    default:
      if (props.name !== 'Home4LineIcon') {
        console.warn(props.name)
      }
      icon = (
        <IconButton
          {...props}
          icon={<Home4LineIcon {...(_icon ? _icon : {})} />}
        />
      )
      break
  }
  return icon
}
