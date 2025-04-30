module.exports = {
  testEnvironment: 'node',
  rootDir: '.',
  moduleDirectories: ['node_modules', '<rootDir>'],
  testMatch: ['<rootDir>/jest-tests/**/*.test.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  }
};
