import { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',

  moduleNameMapper: {
    '^@application/(.*)$': '<rootDir>/src/application/$1',
    '^@helpers/(.*)$': '<rootDir>/src/application/helpers/$1',
    '^@infra/(.*)$': '<rootDir>/src/infra/$1',
    '^@test/(.*)$': '<rootDir>/test/$1',
  },
};

export default config;
