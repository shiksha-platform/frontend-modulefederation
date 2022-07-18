// Lib
import moment from 'moment'
import { telemetryFactory, capture } from '@shiksha/common-lib'
import { attendanceRegistryService } from '../..'

// Utils
import { PRESENT } from './Constants'

// Small helper function to check if a class exists
const groupExists = (classObject: any) => classObject?.id

export interface IMarkAllAttendance {
  appName: string
  students: Array<any>
  getAttendance: Function
  classObject: any
}

// Marks and returns the attendance,
export const MarkAllAttendance = async ({
  appName,
  students,
  getAttendance,
  classObject
}: IMarkAllAttendance) => {
  let student = students.find((e, index) => !index)

  const attendanceData = students.map((item, index) => {
    return {
      attendance: PRESENT,
      userId: item.id
    }
  })
  let allData = {
    schoolId: student?.schoolId,
    userType: 'Student',
    groupId: student?.currentClassID,
    attendanceDate: moment().format('YYYY-MM-DD'),
    attendanceData
  }

  const result = attendanceRegistryService.multipal(allData)
  if (getAttendance) {
    getAttendance()
  }

  if (groupExists(classObject)) {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: 'Attendance-Mark-All-Present',
      groupID: classObject.id
    })
    capture('INTERACT', telemetryData)
  }

  return result
}
