
/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  clearMocks: true,

  testMatch: ['<rootDir>/tests/**/*.test.ts'],

  moduleFileExtensions: ['ts', 'js', 'json'],

  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.test.json',
      },
    ],
  },
};