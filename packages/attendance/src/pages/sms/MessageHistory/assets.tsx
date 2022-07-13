import moment from "moment";

export const sms = (student) => {
  return [
    {
      status: "Send",
      type: "Present",
      date: moment().add(-1, "days").format("Y-MM-DD"),
      message:
        "Hello Mr. " +
        student.fathersName +
        ", this is to inform you that your ward " +
        student.firstName +
        " is present in school on Wednesday, 12th of January 2022.",
    },
    {
      status: "Failed",
      type: "Present",
      date: moment().add(-2, "days").format("Y-MM-DD"),
      message:
        "Hello Mr. " +
        student.fathersName +
        ", this is to inform you that your ward " +
        student.firstName +
        " is absent in school on Wednesday, 12th of January 2022.",
    },
    {
      status: "Failed",
      type: "Absent",
      date: moment().add(-3, "days").format("Y-MM-DD"),
      message:
        "Hello Mr. " +
        student.fathersName +
        ", this is to inform you that your ward " +
        student.firstName +
        " is absent in school on Wednesday, 12th of January 2022.",
    },
    {
      status: "Send",
      type: "Absent",
      date: moment().add(-6, "days").format("Y-MM-DD"),
      message:
        "Hello Mr. " +
        student.fathersName +
        ", this is to inform you that your ward " +
        student.firstName +
        " is present in school on Wednesday, 12th of January 2022.",
    },
  ];
};
