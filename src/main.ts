import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/router'
import store from '@/store'
import axios from 'axios'

axios.interceptors.request.use(function (config) {
  store.commit('setLoading', true)
  return config
})
axios.interceptors.response.use(function (response) {
  store.commit('setLoading', false)
  return response
})

const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')
