import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://petstore.swagger.io/v2',
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    screenshotOnRunFailure: true,
    screenshotsFolder: 'screenshots',
    video: true,
    videoCompression: 32,
    videosFolder: 'videos',
    downloadsFolder: 'cypress/downloads',
    testIsolation: false,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
    },
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportDir: 'reports',
    reportFilename: 'e2e-test-report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    overwrite: true,
    html: true,
    json: true,
    timestamp: undefined,
  },
})
