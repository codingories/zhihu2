<template>
  <div id="app" class="container">
    <global-header :user="currentUser"></global-header>
    <h1 v-if="isLoading">正在读取</h1>
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
import { computed, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'

import store from '@/store'

const currentUser: UserProps = computed(() => store.state.user)
const isLoading = computed(() => store.state.loading)
</script>

<style>

</style>
