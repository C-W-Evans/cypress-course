const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    excludeSpecPattern: 'e2e/examples/*.cy.js*',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
