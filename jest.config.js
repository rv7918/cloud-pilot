const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)',
  ],
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
}

const config = createJestConfig(customJestConfig)

config.projects = [
  {
    ...config,
    displayName: 'dom',
    testEnvironment: 'jsdom',
    testMatch: ['**/components/**/__tests__/**/*.test.[jt]s?(x)', '**/lib/**/__tests__/**/*.test.[jt]s?(x)'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  },
  {
    ...config,
    displayName: 'edge',
    testEnvironment: '@edge-runtime/jest-environment',
    testMatch: ['**/api/**/__tests__/**/*.test.[jt]s?(x)'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.node.js'],
  },
]

module.exports = config
