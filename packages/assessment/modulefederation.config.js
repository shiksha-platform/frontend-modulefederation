const { dependencies } = require("./package.json");

module.exports = {
  name: "assessment",
  exposes: {
    "./App": "./src/App",
    "./Assessment": "./src/pages",
    "./ExamScores": "./src/pages/ExamScores",
    "./SuccessPublicationReport":
      "./src/components/SpotAssessment/successPublicationReport",
    "./ReportDetails": "./src/components/SpotAssessment/ReportDetails",
    "./SpotAssessmentResult":
      "./src/components/SpotAssessment/SpotAssessmentResult",
    "./SpotAssessmentResult2":
      "./src/components/SpotAssessment/SpotAssessmentResult2",
    "./SpotAssessmentResult3":
      "./src/components/SpotAssessment/SpotAssessmentResult3",
    "./QumlTest": "./src/pages/QumlTest",
    "./QuestionList2": "./src/components/ExamScores/QuestionLIst2",
    "./QuestionList3": "./src/components/ExamScores/QuestionLIst3",
    "./QuestionList4": "./src/components/ExamScores/QuestionLIst4",
    "./QuestionList5": "./src/components/ExamScores/QuestionLIst5",
    "./QuestionList6": "./src/components/ExamScores/QuestionLIst6",
    "./QuestionList7": "./src/components/ExamScores/QuestionLIst7",
  },
  remotes: {
    core: `core@[window.appModules.core.url]/moduleEntry.js`,
  },
  filename: "moduleEntry.js",
  shared: {
    ...dependencies,
    react: {
      singleton: true,
      requiredVersion: dependencies["react"],
    },
    "react-dom": {
      singleton: true,
      requiredVersion: dependencies["react-dom"],
    },
  },
};
