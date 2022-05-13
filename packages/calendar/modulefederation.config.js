const { dependencies } = require("./package.json");

module.exports = {
  name: "calendar",
  exposes: {
    "./App": "./src/App",
    "./TimeTableRoute": "./src/pages/TimeTableRoute/index.js",
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
