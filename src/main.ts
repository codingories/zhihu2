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
}, e => {
  const { error } = e.response.data
  store.commit('setError', {
    status: true,
    message: error
  })
  store.commit('setLoading', false)
  return Promise.reject(error)
})

const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')
