//We are importing defineConfig from the Cypress package.
const { defineConfig } = require("cypress");
//We are exporting the Cypress configuration object.
//Node.js uses module.exports
//Cypress reads this file automatically when you run:

module.exports = defineConfig({
  //This block is for End-to-End testing configuration.
  //e2e → end-to-end tests
  e2e: {
    baseUrl:"https://demoqa.com",
    watchForFileChanges: false, //Disables automatic test re-running on file changes.
    defaultCommandTimeout: 4000, //Sets the default timeout for commands to 8000 milliseconds (8 seconds).
    viewportHeight: 1080, // Resize the screen
    viewportWidth: 1920,
    ///This is a Node.js event setup function.
    //Used when you want to: Listen to Cypress events Add plugins Handle tasks Modify config dynamically
    //on is used to hook into Cypress events.
    //To listen or react to events like: before:run task after:screenshot
    //config contains the current Cypress configuration.
    //You can: Read env variables Change baseUrl dynamically Modify config before tests run
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
