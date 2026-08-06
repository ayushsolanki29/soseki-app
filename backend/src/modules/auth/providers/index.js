// src/modules/auth/providers/index.js
const providerFactory = require("./provider.factory");
const GoogleProvider = require("./google.provider");

providerFactory.register("GOOGLE", GoogleProvider);
// Future providers will be registered here (e.g., GITHUB, MICROSOFT)

module.exports = providerFactory;
