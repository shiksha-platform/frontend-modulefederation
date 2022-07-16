import { MALE, FEMALE } from './Constants'
export const HandleGenderList = (students, t) => {
  let genderList = []
  genderList = [t('BOYS'), t('GIRLS')].filter((gender) => {
    return (
      (gender === t('BOYS') &&
        students.filter((e) => e.gender === MALE).length) ||
      (gender === t('GIRLS') &&
        students.filter((e) => e.gender === FEMALE).length)
    )
  })
  return genderList
}
