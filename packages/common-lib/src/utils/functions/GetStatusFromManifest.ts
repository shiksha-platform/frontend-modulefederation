// From a given manifest, returns the status
// currently used for attendance but may be generalised
export interface IGetStatusFromManifest {
  (manifest: any): any
}

export const GetStatusFromManifest: IGetStatusFromManifest = (manifest) => {
  const status = Array.isArray(
    manifest?.['attendance.default_attendance_states']
  )
    ? manifest?.['attendance.default_attendance_states']
    : manifest?.['attendance.default_attendance_states']
    ? JSON.parse(manifest?.['attendance.default_attendance_states'])
    : []

  return status
}
