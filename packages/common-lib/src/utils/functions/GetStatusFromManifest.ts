export const GetStatusFromManifest = (manifest) => {
  const status = Array.isArray(
    manifest?.['attendance.default_attendance_states']
  )
    ? manifest?.['attendance.default_attendance_states']
    : manifest?.['attendance.default_attendance_states']
    ? JSON.parse(manifest?.['attendance.default_attendance_states'])
    : []

  return status
}
