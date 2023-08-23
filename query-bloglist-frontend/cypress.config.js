const { defineConfig } = require("cypress")

module.exports = defineConfig({
  "video": false,
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: "http://localhost:3000",
  },
  env: {

    BACKEND: "http://localhost:3003/api",
    FRONTEND: "http://localhost:3000",
  }
})