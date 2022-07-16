// Services
import { GetAttendance } from 'services/calls/registryCalls'

// Utils
import { isMoment, isMoment2DArray } from 'utils/types/typeGuards'
export interface IGetAttendanceReport {
  (page: any, calendar: Function, calendarView: string, fun?: string): any
}

export const GetAttendanceReport: IGetAttendanceReport = async (
  page,
  calendar,
  calendarView,
  fun
) => {
  let weekdays = calendar(page, calendarView)
  if (isMoment(weekdays) || isMoment2DArray(weekdays)) return
  let params = {
    fromDate: weekdays?.[0]?.format('Y-MM-DD'),
    toDate: weekdays?.[weekdays.length - 1]?.format('Y-MM-DD'),
    fun
  }
  const attendanceData = await GetAttendance(params)
  return attendanceData
}
