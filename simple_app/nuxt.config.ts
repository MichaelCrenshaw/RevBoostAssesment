// https://nuxt.com/docs/api/configuration/nuxt-config
import {fileURLToPath} from "node:url";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  alias: {
    '@types': fileURLToPath(new URL('./types', import.meta.url)),
  },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ]
})
