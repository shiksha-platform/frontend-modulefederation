// Lib
import { useState, useEffect } from 'react'
import { calendar } from '@shiksha/common-lib'
import { getStudentsPresentAbsent } from '@shiksha/common-lib'

// Services
import { GetAttendance, DefaultStudents } from 'services/calls/registryCalls'

// Utilities
import { MomentUnionType } from 'utils/types/types'
import { isMomentArray } from 'utils/types/typeGuards'

export const usePAStudents = ({ students, attendance, type }) => {
  const holidays = []
  const [paStudents, setPaStudents] = useState([])
  useEffect(() => {
    const getPresentStudents = async ({ students }) => {
      let weekdays: MomentUnionType = calendar(-1, 'week')
      // Check type, also for typescripts
      if (isMomentArray(weekdays)) {
        let workingDaysCount =
          type.toLowerCase() === 'present'
            ? weekdays.filter(
                (e) => !(!e.day() || holidays.includes(e.format('YYYY-MM-DD')))
              )?.length
            : 3
        let params = {
          fromDate: weekdays?.[0]?.format('YYYY-MM-DD'),
          toDate: weekdays?.[weekdays.length - 1]?.format('YYYY-MM-DD')
        }
        if (type.toLowerCase() === 'absent') params['fun'] = 'getAbsentStudents'
        let attendanceData = await GetAttendance(params)
        let data
        if (type.toLowerCase() === 'present')
          data = getStudentsPresentAbsent(
            attendanceData,
            students,
            workingDaysCount
          )
        else
          data = getStudentsPresentAbsent(
            attendanceData,
            students,
            workingDaysCount,
            'Absent'
          )

        let dataNew = students.filter((e) =>
          data.map((e) => e.id).includes(e.id)
        )
        setPaStudents(await DefaultStudents(dataNew))
      }
    }
    getPresentStudents({ students })
  }, [students, attendance])

  return [paStudents]
}
