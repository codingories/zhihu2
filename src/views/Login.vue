<template>
  <div class="login-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">登录到者也</h5>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          :rules="emailRules" v-model="emailVal"
          placeholder="请输入邮箱地址"
          type="text"
          ref="inputRef"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          type="password"
          placeholder="请输入密码"
          :rules="passwordRules"
          v-model="passwordVal"
        />
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary btn-block btn-large">登录</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ValidateInput from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import { RulesProp } from '@/types/commonTypes'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'

const store = useStore<GlobalDataProps>()

const emailVal = ref('')
const emailRules: RulesProp = [
  {
    type: 'required',
    message: '电子邮箱地址不能为空'
  },
  {
    type: 'email',
    message: '请输入正确的电子邮箱格式'
  }
]
const passwordVal = ref('')
const passwordRules: RulesProp = [
  {
    type: 'required',
    message: '密码不能为空'
  }
]
// route 用于获取路由信息
// router 定义一系列行为
const router = useRouter()
const onFormSubmit = (result: boolean) => {
  if (result) {
    const payload = {
      email: emailVal.value,
      password: passwordVal.value
    }
    // store.dispatch('login', payload).then(
    //   data => {
    //     console.log('data fuck', data)
    //     store.dispatch('fetchCurrentUser')
    //     router.push('/')
    //   }
    // )
    store.dispatch('loginAndFetch', payload).then(
      data => {
        console.log('data fuck', data)
        router.push('/')
      }
    ).catch(e => {
      console.log('fuck 222', e)
    })
  }
}
</script>
<script lang="ts">
export default {
  name: 'myLogin'
}
</script>
