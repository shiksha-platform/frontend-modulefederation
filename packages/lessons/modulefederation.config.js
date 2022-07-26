const { dependencies } = require("./package.json");

module.exports = {
  name: "lessons",
  exposes: {
    "./App": "./src/App",
    "./LessonPlanDetails": "./src/pages/LessonPlanDetails",
    "./Lessonplans": "./src/pages/Lessonplans",
    "./SingleLessonPlan": "./src/pages/SingleLessonPlan",
  },
  remotes: {
    core: `core@[window.appModules.core.url]/moduleEntry.js`
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
