const cracoModuleFederation = require("craco-module-federation");

module.exports = {
  devServer: {
    port: 3002,
  },
  plugins: [
    {
      plugin: cracoModuleFederation,
    },
  ],
};
