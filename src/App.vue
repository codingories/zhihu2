<template>
  <div id="app" class="container">
    <global-header :user="currentUser"></global-header>
    <!--    <h1 v-if="isLoading">正在读取</h1>-->
    {{ error.message }}
    <my-loader text="拼命加载中" :background="'rgba(0,0,0,0.8)'" v-if="isLoading"></my-loader>
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2020 专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from '@/components/GlobalHeader.vue'

import store from '@/store'
import MyLoader from '@/components/myLoader.vue'
import axios from 'axios'

const currentUser = computed(() => store.state.user)
const isLoading = computed(() => store.state.loading)
const token = computed(() => store.state.token)
const error = computed(() => store.state.error)

onMounted(() => {
  if (!currentUser.value.isLogin && token.value) {
    axios.defaults.headers.common.Authorization = `Bearer ${token.value}`
    store.dispatch('fetchCurrentUser')
  }
})
</script>

<style>

</style>
