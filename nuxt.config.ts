import { createResolver } from "@nuxt/kit";
import vuetify from "vite-plugin-vuetify";
import tailwindcss from "@tailwindcss/vite";

const { resolve } = createResolver(import.meta.url);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  css: ['@/assets/css/tailwind.css'],
  typescript: {
    shim: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },

  // Vuetify build configuration
  build: {
    transpile: ["vuetify"],
  },

  modules: ["@pinia/nuxt", "@nuxt/image"],

  app: {
    head: {
      title: "Landingpro Nuxtjs",
    },
  },

  nitro: {
    serveStatic: true,
  },

  devServerHandlers: [],
  compatibilityDate: "2024-12-04",
});