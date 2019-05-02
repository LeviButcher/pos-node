const { parsed: localEnv } = require("dotenv").config();

module.exports = {
  publicRuntimeConfig: localEnv
};
