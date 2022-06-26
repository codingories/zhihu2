<template>
  <global-header :user="currentUser"></global-header>
  <div id="app" class="container">
    <!--    <column-list :list="list"/>-->
<!--    <form>-->
<!--      <div class="mb-3">-->
<!--        <label for="exampleInputEmail1" class="form-label">邮箱地址</label>-->
<!--        <validate-input :rules="emailRules" v-model="emailVal" placeholder="请输入邮箱地址" type="text"></validate-input>-->
<!--      </div>-->
<!--    </form>-->
    <validate-form @form-submit="onFormSubmit">
        <div class="mb-3">
          <label class="form-label">邮箱地址</label>
          <validate-input :rules="emailRules" v-model="emailVal" placeholder="请输入邮箱地址" type="text"></validate-input>
        </div>
      <template #submit>
        <span class="btn btn-danger">Submit</span>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, reactive, ref } from 'vue'
import ColumnList, { ColumnProps } from '@/components/ColumnList.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'

const currentUser: UserProps = {
  isLogin: true,
  name: 'Ories',
  id: 1
}

const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是test1专栏',
    avatar: 'https://pic1.zhimg.com/v2-0373541cb2767c414860c7a73cdd75ae_xs.jpg?source=d16d100b'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是test2专栏这是test2专栏这是test2专栏这是test2专栏',
    avatar: 'https://pic1.zhimg.com/v2-0373541cb2767c414860c7a73cdd75ae_xs.jpg?source=d16d100b'
  },
  {
    id: 3,
    title: 'test3的专栏',
    description: '这是test3专栏这是test3专栏这是test3专栏这是test3专栏这是test3专栏这是test3专栏这是test3专栏这是test3专栏这是test3专栏这是test3专栏这是test3专栏这是test3专栏'
    // avatar: 'https://pic1.zhimg.com/v2-0373541cb2767c414860c7a73cdd75ae_xs.jpg?source=d16d100b'
  },
  {
    id: 4,
    title: 'test2的专栏',
    description: '这是test4专栏这是test4专栏这是test4专栏这是test4专栏这是test4专栏这是test4专栏这是test4专栏',
    avatar: 'https://pic1.zhimg.com/v2-0373541cb2767c414860c7a73cdd75ae_xs.jpg?source=d16d100b'
  }
]

const emailReg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/

const emailRef = reactive({
  val: '',
  error: false,
  message: ''
})

const validateEmail = () => {
  if (emailRef.val.trim() === '') {
    emailRef.error = true
    emailRef.message = 'can not be empty'
  } else if (!emailReg.test(emailRef.val)) {
    emailRef.error = true
    emailRef.message = 'should be valid email'
  }
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

const emailVal = ref('')

const onFormSubmit = (result: boolean) => {
  console.log('1234', result)
}

</script>

<style>

</style>
