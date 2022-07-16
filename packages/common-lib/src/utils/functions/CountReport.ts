// Constants
import { useTranslation } from 'react-i18next'
import { MALE, FEMALE } from './Constants'
import { GetStudentsAttendance } from './GetStudentsAttendance'

export interface ICountReport {
  gender?: any
  isAverage?: any
  attendance?: any
  attendanceType?: any
  type?: string
  studentIds?: any
  withoutHolidays?: any
  students?: any
  t?: any
}
export const CountReport = ({
  gender,
  isAverage,
  attendance,
  attendanceType,
  type,
  studentIds,
  withoutHolidays,
  students,
  t
}: ICountReport) => {
  let attendanceAll = GetStudentsAttendance({ attendance, type: 'id' })
  if (gender && [t('BOYS'), t('GIRLS')].includes(gender)) {
    studentIds = students
      .filter(
        (e) =>
          e.gender ===
          (gender === t('BOYS') ? MALE : gender === t('GIRLS') ? FEMALE : '')
      )
      .map((e) => e.id)
  }

  if (attendanceType === 'Unmarked' && gender === t('TOTAL')) {
    let studentIds1 = attendanceAll.filter(
      (e) => studentIds.includes(e.studentId) && e.attendance !== attendanceType
    )
    let val = studentIds.length * withoutHolidays - studentIds1.length
    if (isAverage) {
      return Math.round(val ? val / studentIds.length : 0)
    } else {
      return Math.round(val)
    }
  } else if (type === 'Unmarked' || attendanceType === 'Unmarked') {
    let studentIds1 = attendanceAll.filter((e) =>
      studentIds.includes(e.studentId)
    )

    if (attendanceType === 'Unmarked') {
      studentIds1 = attendanceAll.filter(
        (e) =>
          studentIds.includes(e?.studentId) && e.attendance !== attendanceType
      )
    }
    let val = studentIds.length * withoutHolidays - studentIds1.length
    if (isAverage) {
      return Math.round(val ? val / studentIds.length : 0)
    } else {
      return Math.round(val)
    }
  } else {
    let val = attendanceAll.filter(
      (e) =>
        studentIds.includes(e?.studentId) && e.attendance === attendanceType
    ).length

    if (isAverage) {
      return Math.round(val ? val / studentIds.length : 0)
    } else {
      return Math.round(val)
    }
  }
}
