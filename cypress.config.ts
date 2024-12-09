import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    
    },
    // Прописываем базовый URl для быстрого доступа
    baseUrl:'http://localhost:4000/',
  },
});
