const cracoModuleFederation = require("craco-module-federation");

module.exports = {
  devServer: {
    port: 3005,
  },
  plugins: [
    {
      plugin: cracoModuleFederation,
    },
  ],
};
