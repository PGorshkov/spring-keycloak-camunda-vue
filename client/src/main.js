import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import VueKeyCloak from '@dsb-norge/vue-keycloak-js'

Vue.config.productionTip = false

const initKeyCloak = () => {
  return new Promise(resolve => {
    Vue.use(VueKeyCloak, {
      init: {
        onLoad: 'login-required',
        checkLoginIframe: false
      },
      config: {
        authRealm: 'pavelgor-bpmn',
        authUrl: 'http://localhost:8180/auth',
        authClientId: 'pavelgor-web'
      },
      onReady: async (keycloak) => {
        store.dispatch('directory/loadDirectories')
        await store.dispatch('session/getUserInfo')
        resolve()
      }
    })
  })
}

export default new Vue({
  async mounted () {
    await initKeyCloak()
    this.initSession = true
  },
  data: () => ({
    initSession: false
  }),
  router,
  store,
  // eslint-disable-next-line vue/require-render-return
  render (h) {
    if (this.initSession) {
      return h(App)
    }
  }
}).$mount('#app')
