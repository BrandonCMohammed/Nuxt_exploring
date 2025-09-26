// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-09-26',
  devtools: { enabled: false },
  modules: ['@nuxt/ui', '@nuxt/image',"@prisma/nuxt"],
  css: ['~/assets/css/main.css'],
})