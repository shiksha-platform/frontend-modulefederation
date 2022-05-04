import { generateUUID } from '../../components/helper'

export const telemetryFactory = {
  interact: ({ appName, ...edata }) => {
    return {
      type: edata?.type,
      eid: generateUUID(),
      $set: { id: localStorage.getItem('id') },
      actor: {
        id: localStorage.getItem('id'),
        type: 'Teacher'
      },
      context: {
        type: appName ? appName : 'Standalone'
      },
      edata
    }
  },

  start: ({ appName, ...edata }) => {
    return {
      type: edata?.type,
      eid: generateUUID(),
      $set: { id: localStorage.getItem('id') },
      actor: {
        id: localStorage.getItem('id'),
        type: 'Teacher'
      },
      context: {
        type: appName ? appName : 'Standalone'
      },
      edata
    }
  },

  end: ({ appName, ...edata }) => {
    return {
      type: edata?.type,
      eid: generateUUID(),
      $set: { id: localStorage.getItem('id') },
      actor: {
        id: localStorage.getItem('id'),
        type: 'Teacher'
      },
      context: {
        type: appName ? appName : 'Standalone'
      },
      edata
    }
  }
}
