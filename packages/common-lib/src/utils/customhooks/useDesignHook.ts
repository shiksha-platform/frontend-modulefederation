// Lib
import * as React from 'react'
import { calendar } from '@shiksha/common-lib'

// Utils
import { isMoment, isMoment2DArray } from 'utils/types/typeGuards'
import { PRESENT } from 'utils/functions/Constants'
import { colorTheme } from 'utils/functions/ColorTheme'
import { GetStudentsAttendance } from 'utils/functions/GetStudentsAttendance'

export const useDesignHook = ({ attendance, page, calendarView, t }) => {
  const [design, setDesign] = React.useState<any>({})
  const holidays = []
  React.useEffect(() => {
    let daysWithoutHolidays = []
    if (typeof page === 'object') {
      // @ts-ignore
      daysWithoutHolidays = page.map((e) => {
        const dat = calendar(e, calendarView ? calendarView : 'days')
        if (isMoment(dat) || isMoment2DArray(dat)) return

        return dat.filter(
          (e) => !(!e.day() || holidays.includes(e.format('YYYY-MM-DD')))
        ).length
      })
    }
    if (attendance[0]) {
      let percentage = 0
      let attendanceAll = GetStudentsAttendance({
        attendance: attendance[0],
        type: 'id'
      })
      let presentAttendanceCount = attendanceAll.filter(
        (e) => e.attendance && e.attendance !== PRESENT
      ).length
      percentage = (presentAttendanceCount * 100) / daysWithoutHolidays.length
      if (percentage && percentage >= 100) {
        setDesign({
          bg: colorTheme.success,
          iconName: 'EmotionHappyLineIcon',
          titleHeading:
            t('YOU_HAVE_BEEN_PRESENT_ALL_DAYS_THIS') + ' ' + calendarView
        })
      } else if (percentage && percentage < 100 && percentage >= 50) {
        setDesign({
          bg: colorTheme.warning,
          iconName: 'EmotionNormalLineIcon',
          titleHeading: t('AGERAGE_CAN_BE_IMPROVED')
        })
      } else {
        setDesign({
          bg: colorTheme.danger,
          iconName: 'EmotionSadLineIcon',
          titleHeading: t('ABSENT_TODAY_POOR_THAN_LAST') + ' ' + calendarView
        })
      }
    }
  }, [])
  return { design }
}
