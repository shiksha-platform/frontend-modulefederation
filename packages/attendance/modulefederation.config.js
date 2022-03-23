const { dependencies } = require("./package.json");

module.exports = {
  name: "attendance",
  exposes: {
    "./App": "./src/App",
    "./Attendance": "./src/pages/Attendance",
  },
  remotes:{
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
