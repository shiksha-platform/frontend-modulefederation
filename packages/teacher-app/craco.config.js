const cracoModuleFederation = require("craco-module-federation");

module.exports = {
  devServer: {
    port: 4000,
  },
  plugins: [
    {
      plugin: cracoModuleFederation,
    },
  ],
};
