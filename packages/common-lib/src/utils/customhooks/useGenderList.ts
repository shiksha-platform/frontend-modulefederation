// Lib
import * as React from 'react'

// Utilities
import { HandleGenderList } from 'utils/functions/HandleGenderList'

export const useGenderList = ({ students, t }) => {
  const [genderList, setGenderList] = React.useState([])
  React.useEffect(() => {
    const genderList = HandleGenderList(students, t)
    setGenderList([...genderList, t('TOTAL')])
  }, [students])

  return { genderList }
}
