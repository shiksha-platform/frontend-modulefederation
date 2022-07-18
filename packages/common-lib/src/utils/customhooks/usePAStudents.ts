// Lib
import { useState, useEffect } from 'react'
import { calendar } from '@shiksha/common-lib'
import { getStudentsPresentAbsent } from '@shiksha/common-lib'

// Services
import { attendanceRegistryService, studentRegistryService } from '../..'

// Utilities
import { MomentUnionType } from '../types/types'
import { isMomentArray } from '../types/typeGuards'

export interface IUsePAStudents {
  students: Array<any>
  attendance: Array<any>
  type: string
}

// A flexible hook used for maintaining list of present/absent students
// passing parameters allows us to configure what kind we need
export const usePAStudents = ({
  students,
  attendance,
  type
}: IUsePAStudents) => {
  const holidays: Array<any> = []
  const [paStudents, setPaStudents] = useState([])
  useEffect(() => {
    const getPresentStudents = async ({
      students
    }: {
      students: Array<any>
    }) => {
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
        let attendanceData = await attendanceRegistryService.getAll(params)
        let data: any
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

        let dataNew = students.filter((e: any) =>
          data.map((e: any) => e.id).includes(e.id)
        )
        setPaStudents(await studentRegistryService.setDefaultValue(dataNew))
      }
    }
    getPresentStudents({ students })
  }, [students, attendance])

  return [paStudents]
}
