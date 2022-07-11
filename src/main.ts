import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/router'
import store from '@/store'
import axios from 'axios'

// async function hello () {
//   const greetings = await Promise.resolve('hello')
//   return greetings
// }
//
// hello().then(value => {
//   console.log('value2', value)
// })

// console.log(hello())

const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')
