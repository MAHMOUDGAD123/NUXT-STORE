import { defineNuxtConfig } from 'nuxt/config';
import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-12-11',

  devtools: { enabled: false },

  devServer: {
    port: 5555,
    host: '0.0.0.0',
  },

  typescript: {
    typeCheck: false,
    tsConfig: {
      compilerOptions: {
        skipLibCheck: true,
        strict: false,
      },
    },
  },

  app: {
    pageTransition: {
      appear: true,
      mode: 'out-in',
      type: 'transition',
      name: 'fade',
    },
    head: {
      // script: [{ src: '/scripts/logs.js', type: 'module', defer: true }],
    },
  },

  sourcemap: {
    server: false,
    client: false,
  },

  css: ['./app/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/ui',
    '@nuxt/icon',
    '@nuxt/image',
    // 'nuxt-typed-router',
  ],

  icon: {
    serverBundle: {
      collections: [
        'qlementine-icons',
        'simple-icons',
        'ph',
        'bi',
        'fa',
        'mi',
        'mdi',
        'ant-design',
        'teenyicons',
        'fa6-solid',
        'fa7-solid',
        'fa7-regular',
        'fa-regular',
        'material-symbols',
        'line-md',
        'lucide',
        'carbon',
        'streamline-plump',
      ],
      remote: false,
    },
    mode: 'css',
  },

  image: {},

  ui: {},

  // nuxtTypedRouter: {},
});
