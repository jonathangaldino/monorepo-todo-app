const tsconfig = require('./tsconfig.json')
const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig)

module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testPathIgnorePatterns: ['node_modules', 'build'],
  testEnvironment: './jest.setup.ts',
  modulePaths: ['<rootDir>'],
  moduleNameMapper,
}
