import React from 'react'
import IconByName from './IconByName'
import Loading from './Loading'

export default function NotFound() {
  return (
    <Loading
      icon={
        <IconByName
          name={'SearchEyeLineIcon'}
          color={'primary'}
          _icon={{ size: '50' }}
        />
      }
      message={'Not Found'}
    />
  )
}
