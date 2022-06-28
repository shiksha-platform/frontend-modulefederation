const { dependencies } = require("./package.json");

module.exports = {
  name: "announcements",
  exposes: {
    "./App": "./src/App",
    "./Announcements": "./src/pages/Announcements",
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
