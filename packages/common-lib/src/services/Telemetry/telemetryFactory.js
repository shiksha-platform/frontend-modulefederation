import { generateUUID } from '../../components/helper'

export const telemetryFactory = {
  interact: ({ appName, type, groupID, typeOfComparison, studentId }) => {
    return {
      type,
      eid: generateUUID(),
      $set: { id: localStorage.getItem('id') },
      actor: {
        id: localStorage.getItem('id'),
        type: 'Teacher'
      },
      context: {
        type: appName ? appName : 'Standalone'
      },
      edata: { type, groupID, typeOfComparison, studentId }
    }
  },

  start: ({ appName, type, groupID }) => {
    return {
      type,
      eid: generateUUID(),
      $set: { id: localStorage.getItem('id') },
      actor: {
        id: localStorage.getItem('id'),
        type: 'Teacher'
      },
      context: {
        type: appName ? appName : 'Standalone'
      },
      edata: { type, groupID }
    }
  },

  end: ({ appName, type, groupID, duration, percentage }) => {
    return {
      type,
      eid: generateUUID(),
      $set: { id: localStorage.getItem('id') },
      actor: {
        id: localStorage.getItem('id'),
        type: 'Teacher'
      },
      context: {
        type: appName ? appName : 'Standalone'
      },
      edata: { type, groupID, duration, percentage }
    }
  }
}
