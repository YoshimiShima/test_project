// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  modules: ['@nuxtjs/apollo'],

    apollo: {
      clients: {
        default: {
          httpEndpoint: 'https://yoshimi-exam.hasura.app/v1/graphql',
          httpLinkOptions: {
            headers: {
              'X-Hasura-Admin-Secret': 'EvL8VXyXwIEuTfVLlCWXh6azK3YvwHUbjipYlXo8ckIRZSfxa6cHmjiXnSX73svx',
            },
          },
        }
      }
    },
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? [
          'naive-ui',
          'vueuc',
          '@css-render/vue3-ssr',
          '@juggle/resize-observer'
        ]
        : ['@juggle/resize-observer']
  },
  vite: {
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
          : []
    }
  }
})

