const { dependencies } = require("./package.json");

module.exports = {
  name: "content_pages",
  exposes: { "./App": "./src/App", "./ContentPage": "./src/pages/ContentPage" },
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
