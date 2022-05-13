const { dependencies } = require("./package.json");

module.exports = {
  name: "worksheet",
  exposes: {
    "./App": "./src/App",   
    "./TeachingDetail": "./src/pages/TeachingDetail",
    "./QuestionBank": "./src/pages/QuestionBank",
    "./WorksheetQuestionBank": "./src/pages/WorksheetQuestionBank",
    "./CreateWorksheet": "./src/pages/CreateWorksheet",
    "./Teaching": "./src/pages/Teaching",
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
