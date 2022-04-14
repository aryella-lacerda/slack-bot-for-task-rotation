module.exports = {
  preset: '@shelf/jest-dynamodb',
  setupFilesAfterEnv: ['./.jest/setup.ts'],
  moduleNameMapper: {
    '@database/?(.*)': '<rootDir>/database/$1',
    '@handlers/?(.*)': '<rootDir>/handlers/$1',
    '@entities/?(.*)': '<rootDir>/entities/$1',
    '@utils/?(.*)': '<rootDir>/utils/$1',
    '@tests/?(.*)': '<rootDir>/.jest/$1',
    '@seeds/?(.*)': '<rootDir>/.seeds/$1',
  },
}
