// Lib
import moment from 'moment'
import { telemetryFactory, capture } from '@shiksha/common-lib'
import { MultipleAttendance } from 'services/calls/registryCalls'

// Utils
import { PRESENT } from './Constants'

const groupExists = (classObject) => classObject?.id

export const MarkAllAttendance = async ({
  appName,
  students,
  getAttendance,
  classObject
}) => {
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

  const result = MultipleAttendance(allData)
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
