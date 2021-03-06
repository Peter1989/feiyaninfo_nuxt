
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: '新冠肺炎信息共享',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '新冠肺炎信息共享' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/tab',
    '~plugins/axios'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [],
  /*
  ** Nuxt.js modules
  */
  //modules: ['@nuxtjs/proxy', 'nuxt-ssr-cache'],
  //modules: ['@nuxtjs/proxy', ['@nuxtjs/component-cache', { max: 10, maxAge: 1000 * 60 }]],
  modules: ['@nuxtjs/proxy'],
  // cache:{
  //   useHostPrefix: false,
  //   pages: ['/'],
  //   store:{
  //      type: 'memory',
  //      max: 10,
  //      ttl: 10
  //   } 
  // },
  proxy: {
    '/n/': {
      target: 'http://www.suishouji.net',
      changeOrigin: true
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
