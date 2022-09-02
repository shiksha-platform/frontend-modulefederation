export default function report(
  studentData,
  trackData,
  type = "Written Assessment"
) {
  const presentCount = studentData.filter(
    (stu) =>
      trackData.filter(
        (track) => stu.id === track.studentId && track.type === type
      ).length
  ).length;
  const absentCount = Math.max(0, studentData.length - presentCount);
  return [
    {
      name: `${presentCount} Assessed`,
      color: "assessment.success",
      value: presentCount,
    },
    {
      name: `${absentCount} pending`,
      color: "assessment.lightGray2",
      value: absentCount,
      _legendType: { color: "assessment.gray" },
    },
  ];
}
