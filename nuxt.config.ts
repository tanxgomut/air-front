import { createResolver } from "@nuxt/kit";
import vuetify from "vite-plugin-vuetify";
import tailwindcss from "@tailwindcss/vite";

const { resolve } = createResolver(import.meta.url);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxtjs/leaflet',
    '@nuxtjs/sitemap',
    'vue-sonner/nuxt',
    '@nuxtjs/i18n',
  ],
  css: [
    '@/assets/css/tailwind.css',
    'leaflet/dist/leaflet.css'
  ],
  typescript: {
    shim: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },

  // Vuetify build configuration
  build: {
    transpile: ["vuetify", 'vue-sonner'],
  },

  // seo
  app: {
    head: {
      title: 'จองคิวล้างแอร์ออนไลน์',
      meta: [
        { name: 'description', content: 'บริการล้างแอร์ถึงบ้าน จองคิวออนไลน์ง่ายๆ' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.ico' }
      ]
    }
  },
  site: {
    url: 'https://example.com',
    name: 'My Awesome Website',
    routes: [
      '/',
      '/contact'
    ]
  },
  //

  nitro: {
    serveStatic: true,
  },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'th',
    locales: [
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
      { code: 'th', iso: 'th-TH', name: 'ไทย', file: 'th.json' }
    ],
    lazy: true,
    langDir: 'locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  devServerHandlers: [],
  compatibilityDate: "2024-12-04",
});