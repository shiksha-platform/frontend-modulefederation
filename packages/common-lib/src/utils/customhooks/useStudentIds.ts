import * as React from 'react'

export interface IUseStudentsIds {
  students: Array<any>
}
// Used for maintaing list of student ids
// used in attendance
export const useStudentIds = ({ students }: IUseStudentsIds) => {
  const [studentIds, setStudentIds] = React.useState<any>([])
  React.useEffect(() => {
    let ignore = false
    const getData = async () => {
      if (!ignore) {
        const temp = students.map((e) => e.id)
        setStudentIds(temp)
      }
    }
    getData()
    return () => {
      ignore = true
    }
  }, [students])

  return { studentIds }
}
