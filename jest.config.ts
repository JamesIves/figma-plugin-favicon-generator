import type {Config} from 'jest'

const config: Config = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'jsdom'
}

export default config
