module.exports = {
  testEnvironment: 'node',
  rootDir: '.',
  moduleDirectories: ['node_modules', '<rootDir>'],
  testMatch: ['<rootDir>/jest-tests/**/*.test.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testTimeout: 10000,
  verbose: true,
  forceExit: true
};
