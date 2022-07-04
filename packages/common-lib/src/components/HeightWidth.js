import { ScrollView } from 'native-base'
import React from 'react'

export const maxWidth = '1080'
export default function HeghtWidth({ children }) {
  const [size, setSize] = React.useState({ width: '', Height: '' })
  React.useLayoutEffect(() => {
    function updateSize() {
      setSize({
        width: window.innerWidth > maxWidth ? maxWidth : '100%',
        Height:
          window.innerHeight > window.outerHeight
            ? window.outerHeight
            : window.innerHeight
      })
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return (
    <ScrollView minH={size.Height} maxH={size.Height} w={size.width}>
      {children}
    </ScrollView>
  )
}
