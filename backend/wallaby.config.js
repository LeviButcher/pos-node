module.exports = function(wallaby) {
  return {
    files: ["src/**/*.js"],

    tests: ["tests/**/*test.js"],
    testFramework: "jest",
    env: {
      type: "node",
      runner: "node"
    },
    setup: function(wallaby) {
      require("dotenv").config();
    }
  };
};
