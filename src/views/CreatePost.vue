<template>
  <div class="create-post-page">
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input
          :rules="titleRules" v-model="titleVal"
          placeholder="请输入文章标题"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input
          rows="10"
          tag="textarea"
          placeholder="请输入文章详情"
          :rules="contentRules"
          v-model="contentVal"
        />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">发表文章
        </button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts" setup>
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput from '@/components/ValidateInput.vue'
import { RulesProp } from '@/types/commonTypes'
import { ref } from 'vue'
import { PostProps } from '@/testData'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'
import { router } from '@/router'

const titleRules: RulesProp = [
  {
    type: 'required',
    message: '文章标题不能为空'
  }
]
const titleVal = ref('')
const contentRules: RulesProp = [
  {
    type: 'required',
    message: '文章详情不能为空'
  }
]
const store = useStore<GlobalDataProps>()

const contentVal = ref('')

const onFormSubmit = (result: boolean) => {
  const { columnId } = store.state.user
  if (result) {
    if (columnId) {
      const newPost: PostProps = {
        id: new Date().getTime(),
        title: titleVal.value,
        content: contentVal.value,
        columnId,
        createdAt: new Date().toDateString()
      }
      store.commit('createPost', newPost)
      router.push({
        name: 'column',
        params: { id: columnId }
      })
    }
  }
}
</script>

<script lang="ts">
export default {
  name: 'CreatePost'
}
</script>
<style>

</style>

<style>

</style>
