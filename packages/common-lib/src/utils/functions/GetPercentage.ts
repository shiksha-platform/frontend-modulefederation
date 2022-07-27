// Lib
import {
  getPercentageStudentsPresentAbsent,
  calendar
} from '@shiksha/common-lib'

// Interfaces
export interface IGetPercentage {
  (
    attendances: any,
    student: any,
    count?: any,
    status?: string,
    type?: string,
    page?: any,
    compare?: string
  ): any
}

// Returns the percentage of students who are absent/present
export const GetPercentage: IGetPercentage = (
  attendances,
  student,
  count,
  status = 'Present',
  type = 'percentage',
  page,
  compare = ''
) => {
  let weekdays = calendar(
    page,
    ['days', 'week'].includes(compare) ? 'week' : compare
  )
  let workingDaysCount = count
    ? count
    : // @ts-ignore
      weekdays.filter((e) => e.day())?.length
  let percentage = getPercentageStudentsPresentAbsent(
    attendances,
    student,
    workingDaysCount,
    status
  )
  return percentage?.[type]
}
