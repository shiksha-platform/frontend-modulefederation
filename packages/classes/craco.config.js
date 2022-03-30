const cracoModuleFederation = require("craco-module-federation");

module.exports = {
  devServer: {
    port: 3003,
  },
  plugins: [
    {
      plugin: cracoModuleFederation,
    },
  ],
};
