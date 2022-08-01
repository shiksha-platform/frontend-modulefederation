export const defaultInputs = [
  {
    name: "Subject",
    attributeName: "subject",
    data: [
      "Social Science",
      "Science",
      "Mathematics",
      "Hindi",
      "English",
      "History",
      "Geography",
    ],
  },
  {
    name: "Class",
    attributeName: "gradeLevel",
    data: [
      "Class 1",
      "Class 2",
      "Class 3",
      "Class 4",
      "Class 5",
      "Class 6",
      "Class 7",
      "Class 8",
      "Class 9",
      "Class 10",
    ],
  },
  {
    name: "Topic",
    attributeName: "topic",
    data: [
      "भोजन के घटक",
      "भोजन: यह कहाँ से आता है?",
      "तंतु से वस्त्र तक",
      "संसाधन",
      "समानता",
      "संश्लेशित रेशे  और प्लास्टिक",
      "आखेट-खाद्य संग्राहक से भोजन उत्पादन तक",
    ],
  },
  {
    name: "Source",
    required: true,
    attributeName: "source",
    data: ["source 1", "source 2"],
  },
];

export const autoGenerateInputs = [
  {
    name: "Number of Questions",
    required: true,
    type: "string",
    attributeName: "number_of_questions",
    data: ["10", "20", "30", "40", "50"],
  },
  {
    name: "Add Question type",
    type: "string",
    attributeName: "qType",
    data: ["MCQ", "SA"],
  },
];
