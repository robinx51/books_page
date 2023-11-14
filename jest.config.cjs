module.exports = {
  preset: "ts-jest",
  testMatch: ["**/*.test.(ts|tsx)"],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
    '\\.(png|jpg|jpeg|gif|svg)$': 'jest-transform-stub',
  },
  testEnvironment: 'jsdom',
};