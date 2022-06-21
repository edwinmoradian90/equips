import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['src/__tests__/seed.ts', 'src/__tests__/data'],
};

export default config;
