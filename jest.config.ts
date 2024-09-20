import type { Config } from 'jest'

const config: Config = {
  clearMocks: true,
  coverageProvider: 'v8',
  transform: {
    '^.+.(t|j)sx?$': '@swc/jest',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  moduleNameMapper: {
    '^@shared/(.*)$': '<rootDir>/src/domain/@shared/$1',
    '^@checkout/(.*)$': '<rootDir>/src/domain/checkout/$1',
    '^@customer/(.*)$': '<rootDir>/src/domain/customer/$1',
    '^@product/(.*)$': '<rootDir>/src/domain/product/$1',
    '^@infra/(.*)$': '<rootDir>/src/infra/$1',
  },
}

export default config
