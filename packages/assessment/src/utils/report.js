export default function report(
  studentData,
  trackData,
  type = "Written Assessment",
  jsonData = false
) {
  const presentStudents = studentData.filter(
    (stu) =>
      trackData.filter(
        (track) => stu.id === track.studentId && track.type === type
      ).length
  );
  const presentCount = presentStudents.length;
  const absentCount = Math.max(0, studentData.length - presentCount);
  const data = [
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
  if (jsonData === "data") {
    return { presentStudents, presentCount, absentCount, data };
  } else if (jsonData) {
    return { presentCount, absentCount, data };
  } else {
    return data;
  }
}

export const getTotalAvarage = (data) => {
  let total = 0,
    score = 0;

  data.forEach((track) => {
    if (track.totalScore) total += parseInt(track.totalScore);
    if (track.score) score += parseInt(track.score);
  });
  let add = total > 0 ? (100 * score) / total : 0;
  score = Math.round(add);
  return { total: 100, score, add };
};

export const achiever = (students, trackData, limit) => {
  return students.filter(
    (item, index) =>
      trackData.filter(
        (track) =>
          track.score === track.totalScore && track.studentId === item.id
      ).length && index < limit
  );
};

export const getMaxScore = (trackData) => {
  return trackData.reduce(
    (newData, old) => (newData < old.score ? old.score : newData),
    0
  );
};
