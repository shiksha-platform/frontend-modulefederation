const { dependencies } = require("./package.json");

module.exports = {
  name: "worksheet",
  exposes: {
    "./App": "./src/App",
    "./QuestionBank": "./src/pages/QuestionBank",
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
