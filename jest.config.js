module.exports = {
  preset: '@shelf/jest-dynamodb',
  setupFilesAfterEnv: ['./.jest/setup.ts'],
  moduleNameMapper: {
    '@database/?(.*)': '<rootDir>/src/database/$1',
    '@handlers/?(.*)': '<rootDir>/src/handlers/$1',
    '@entities/?(.*)': '<rootDir>/src/entities/$1',
    '@constants/?(.*)': '<rootDir>/src/constants/$1',
    '@utils/?(.*)': '<rootDir>/src/utils/$1',
    '@tests/?(.*)': '<rootDir>/.jest/$1',
    '@seeds/?(.*)': '<rootDir>/.seeds/$1',
  },
}
