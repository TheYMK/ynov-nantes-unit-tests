const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');

const { cwd } = require('process');

setHeadlessWhen(process.env.HEADLESS);
setCommonPlugins();

exports.config = {
  tests: './tests/e2e/*_test.js',
  output: 'dist',
  include: {
    I: './steps_file.js'
  },
  helpers: {
    Playwright: {
      waitForTimeout: 20000,
      show: process.env.HEADLESS === 'true' ? false : true,
      timeout: 20000,

    },
    REST: {}
  },
  bootstrap: null,
  mocha: {},
  name: 'integrations-e2e',
  plugin: {
    coverage: {
      enabled: true
    }
  }

}