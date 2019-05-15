module.exports = function () {
  return {
    files: ['src/**/*.js', 'tests/setup.js', 'jest.config.js'],

    tests: ['tests/**/*test.js'],
    testFramework: 'jest',
    env: {
      type: 'node',
      runner: 'node',
    },
  };
};
