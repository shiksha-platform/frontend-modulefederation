const { dependencies } = require("./package.json");

module.exports = {
  name: "lessonplans",
  exposes: {
    "./App": "./src/App",
    "./LessonPlansDetails": "./src/pages/LessonPlansDetails",
    "./Lessonplans": "./src/pages/Lessonplans",
    "./SingleLessonPlan": "./src/pages/SingleLessonPlan",
  },
  remotes: {
    core: `core@[window.appModules.core.url]/moduleEntry.js`,
    students: `students@[window.appModules.students.url]/moduleEntry.js`,
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
