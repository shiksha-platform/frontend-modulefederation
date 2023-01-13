import * as userRegistryService from '../services/userRegistryService'
import { useState, useEffect } from 'react'

export const useAuthFlow = () => {
  const [loggedInUser, setLoggedInUser] = useState()
  useEffect(async () => {
    const resultTeacher = await userRegistryService.getOne({}, {})

    if (resultTeacher) {
      let id = resultTeacher.id
      localStorage.setItem('id', id)
      localStorage.setItem(
        'fullName',
        resultTeacher.fullName
          ? resultTeacher.fullName
          : `${resultTeacher.firstName} ${resultTeacher.lastName}`
      )
      localStorage.setItem('firstName', resultTeacher.firstName)
      localStorage.setItem('lastName', resultTeacher.lastName)
      localStorage.setItem('schoolId', resultTeacher.schoolId)
      setLoggedInUser(resultTeacher)
      //window.location.reload();
    }
  }, [])

  return loggedInUser
}
