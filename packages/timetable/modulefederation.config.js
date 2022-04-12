const { dependencies } = require("./package.json");

module.exports = {
  name: "timetable",
  exposes: {
    "./App": "./src/App",
    "./TimeTableRoute": "./src/pages/TimeTableRoute/index.js",
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
