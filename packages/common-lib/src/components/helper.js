import axios from 'axios'
import React from 'react'
import { getApiConfig } from '../services/configApiRegistryService'
import * as joyfull from '../theme/joyfull'
import * as monochrome from '../theme/monochrome'
import { extendTheme } from 'native-base'

export const maxWidth = '1080'
export function useWindowSize() {
  const [size, setSize] = React.useState([0, 0])
  React.useLayoutEffect(() => {
    function updateSize() {
      setSize([
        window.innerWidth > maxWidth ? maxWidth : '100%',
        window.innerHeight
      ])
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size
}

export const getUniqAttendance = (attendances, status, students = []) => {
  let studentIds = students.map((e) => e.id)
  return attendances
    .slice()
    .reverse()
    .filter((value, index, self) => {
      return (
        self.findIndex(
          (m) =>
            value?.studentId === m?.studentId &&
            value?.date === m?.date &&
            value?.attendance === status
        ) === index
      )
    })
    .filter(
      (e) =>
        studentIds.includes(e.studentId) &&
        e.studentId &&
        e.date &&
        e.attendance &&
        e.id
    )
}
export const getStudentsPresentAbsent = (
  attendances,
  students,
  count,
  status = 'Present'
) => {
  const newPresent = getUniqAttendance(attendances, status, students)
  return students
    .map((value) => {
      let newCount = newPresent.filter((e) => e.studentId === value.id).length
      if (newCount >= count) {
        return {
          count,
          id: value.id
        }
      }
      return undefined
    })
    .filter((e) => e?.id)
}

export const getPercentageStudentsPresentAbsent = (
  attendances,
  student,
  workingDaysCount,
  status = 'Present'
) => {
  const newPresent = getUniqAttendance(attendances, status, [student])
  let count = newPresent.filter((e) => e.studentId === student.id).length
  return {
    count,
    percentage: (count * 100) / workingDaysCount,
    ...student
  }
}

export const generateUUID = () => {
  var d = new Date().getTime()
  var d2 =
    (typeof performance !== 'undefined' &&
      performance.now &&
      performance.now() * 1000) ||
    0
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16
    if (d > 0) {
      r = (d + r) % 16 | 0
      d = Math.floor(d / 16)
    } else {
      r = (d2 + r) % 16 | 0
      d2 = Math.floor(d2 / 16)
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

export const overrideColorTheme = (colorObject = {}, theme = 'joyfull') => {
  if (theme === 'monochrome') {
    return { ...colorObject, ...monochrome.colorTheme }
  }
  return { ...joyfull.colorTheme, ...colorObject }
}

export const DEFAULT_THEME = async (theme = '') => {
  if (!theme) {
    try {
      const adminTheme = await getApiConfig(['theme'])
      theme = JSON.parse(adminTheme['theme.forModules'])
    } catch {
      theme = 'joyFull'
    }
  }

  if (theme === 'monochrome') {
    return extendTheme(monochrome.theme)
  }
  return extendTheme(joyfull.theme)
}
