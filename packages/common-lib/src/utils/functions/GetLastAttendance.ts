import moment from 'moment'
// Gets the last attendance from a provided array of attendance;

export interface IGetLastAttendance {
  (attendance: Array<any>): string
}

export const GetLastAttendance: IGetLastAttendance = (attendance) => {
  let dates = attendance.map((d) => moment(d.updatedAt))
  let date = moment.max(dates)
  return dates.length ? date.format('hh:mmA') : 'N/A'
}
