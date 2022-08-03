const { dependencies } = require("./package.json");

module.exports = {
  name: "visits",
  exposes: {
    "./Myvisits": "./src/pages/Myvisits",
    "./Recommendedschools": "./src/pages/Recommended-schools",
    "./Allocatedschools": "./src/pages/Allocated-schools",
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
