<template>
  <global-header :user="currentUser"></global-header>
  <div id="app" class="container">
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input :rules="emailRules" v-model="emailVal" placeholder="请输入邮箱地址" type="text"
                        ref="inputRef"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input :rules="passwordRules" v-model="passwordVal" placeholder="请输入密码" type="password"
                        ref="inputRef"
        ></validate-input>
      </div>
      <template #submit>
        <span class="btn btn-danger">Submit</span>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'

import ValidateForm from '@/components/ValidateForm.vue'

const inputRef = ref<never>()

const currentUser: UserProps = {
  isLogin: true,
  name: 'Ories',
  id: 1
}

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
