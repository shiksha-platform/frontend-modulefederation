import { HStack } from 'native-base'
import React from 'react'
import IconByName from './IconByName'

export default function StarRating({ color, _icon, count, percentage = 0 }) {
  const [stars, setStars] = React.useState([])
  React.useEffect(() => {
    let iconName = ''
    let rate = (percentage * count) / 100
    let icons = []
    for (let i = 1; i <= count; i++) {
      if (rate >= i) {
        iconName = 'StarFillIcon'
      } else if (rate - Math.floor(rate) > 0 && Math.floor(rate) + 1 === i) {
        iconName = 'StarHalfFillIcon'
      } else {
        iconName = 'StarLineIcon'
      }

      icons = [
        ...icons,
        <IconByName
          key={i}
          name={iconName}
          isDisabled
          color={color}
          {..._icon}
        />
      ]
    }
    setStars(icons)
  }, [count, percentage, color])

  return (
    <HStack justifyContent={'center'} alignItems='center'>
      {stars}
    </HStack>
  )
}
