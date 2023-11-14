module.exports = {
  preset: 'ts-jest/presets/default',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/imageMock.js',
  },
  testMatch: ['**/src/test/**/*.test.(ts|tsx)'],
}