<template>
  <div id="app" class="container">
    <global-header :user="currentUser"></global-header>
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
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'

import ValidateForm from '@/components/ValidateForm.vue'
import store from '@/store'

const inputRef = ref<never>()

const currentUser: UserProps = computed(() => store.state.user)

const emailRules: RulesProp = [
  {
    type: 'required',
    message: '电子邮箱不能为空'
  },
  {
    type: 'email',
    message: '请输入正确的电子邮箱格式'
  }
]

const passwordRules: RulesProp = [
  {
    type: 'required',
    message: '密码不能为空'
  }
]

const emailVal = ref('')
const passwordVal = ref('')

const onFormSubmit = (result: boolean) => {
  console.log(result)
}

</script>

<style>

</style>
