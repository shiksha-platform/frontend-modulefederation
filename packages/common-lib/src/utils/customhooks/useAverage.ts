// Lib
import * as React from 'react'

export interface IUseAverage {
  calendarView: string
}
// This hook is used to set how the average is to be computed
// i.e over week, month or something else
export const useAverage = ({ calendarView }: IUseAverage) => {
  const [isAverage, setIsAverage] = React.useState(false)
  React.useEffect(() => {
    setIsAverage(
      ['week', 'weeks', 'month', 'months', 'monthInDays'].includes(calendarView)
    )
  }, [calendarView])
  return { isAverage }
}
