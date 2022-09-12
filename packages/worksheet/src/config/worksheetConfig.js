export const defaultInputs = [
  {
    name: "Source",
    required: true,
    attributeName: "source",
    data: [],
  },
  {
    name: "Class",
    attributeName: "gradeLevel",
    dependent: "source",
    data: [
      { value: "class1", label: "Class 1" },
      { value: "class2", label: "Class 2" },
      { value: "class3", label: "Class 3" },
      { value: "class4", label: "Class 4" },
      { value: "class5", label: "Class 5" },
      { value: "class6", label: "Class 6" },
      { value: "class7", label: "Class 7" },
      { value: "class8", label: "Class 8" },
      { value: "class9", label: "Class 9" },
      { value: "class10", label: "Class 10" },
    ],
  },
  {
    name: "Subject",
    attributeName: "subject",
    dependent: "gradeLevel",
    urlName: "getSubjectsList",
    data: [],
  },
  {
    name: "Topic",
    attributeName: "topic",
    dependent: "subject",
    urlName: "getTopicsList",
    data: [],
  },
];

export const autoGenerateInputs = [
  {
    name: "number of questions",
    required: true,
    type: "string",
    attributeName: "number_of_questions",
    data: ["10", "20", "30", "40", "50"],
  },
  {
    name: "question type",
    type: "string",
    attributeName: "qType",
    data: ["MCQ", "SA"],
  },
];
