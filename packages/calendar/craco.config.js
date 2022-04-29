const cracoModuleFederation = require("craco-module-federation");

module.exports = {
  devServer: {
    port: 3004,
  },
  plugins: [
    {
      plugin: cracoModuleFederation,
    },
  ],
};
