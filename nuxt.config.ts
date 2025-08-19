import { createResolver } from "@nuxt/kit";
import vuetify from "vite-plugin-vuetify";
import tailwindcss from "@tailwindcss/vite";

const siteUrl = 'https://aircleanpro.com'
const siteName = 'AirCleanPro'

const { resolve } = createResolver(import.meta.url);

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
    '@nuxtjs/color-mode',
    'nuxt-site-config',
    '@nuxtjs/robots',
  ],

  css: [
    '@/assets/css/tailwind.css',
    'leaflet/dist/leaflet.css'
  ],

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'https://api.example.com',
    },
  },

  typescript: {
    shim: false,
  },

  vite: {
    plugins: [tailwindcss()],
    server: {
     allowedHosts: ['f39b4a10985a.ngrok-free.app'] // set your ngrok or local dev URL here
    }
  },

  build: {
    transpile: ["vuetify", 'vue-sonner'],
  },

  // seo
  app: {
    head: {
      titleTemplate: `%s - ${siteName}`,
      title: 'จองคิวล้างแอร์ออนไลน์',
      htmlAttrs: { lang: 'th' },
      meta: [
        { name: 'description', content: 'บริการล้างแอร์ถึงบ้าน จองคิวออนไลน์ง่ายๆ' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: siteName },
        { property: 'og:type', content: 'website' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.ico' }
      ]
    }
  },
  site: {
    url: siteUrl,
    name: siteName,
    routes: [
      '/',
      '/contact',
      '/about',
      '/services',
    ]
  },
  sitemap: {
    autoI18n: true,
    defaults: {
      changefreq: 'weekly',
      priority: 0.8
    },
    exclude: ['/profile/**'], // หน้า private
  },
  // robots: {
  //   siteUrl
  // },
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
  },

  colorMode: {
    preference: 'light',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storage: 'localStorage',
    storageKey: 'nuxt-color-mode'
  },
  devServerHandlers: [],
  compatibilityDate: "2024-12-04",
});