<template>
  <form class="valid-form-container">
    <slot name="default"></slot>
  </form>
  <div class="submit-area" @click.prevent="submitForm">
    <slot name="submit">
      <button type="submit" class="btn btn-primary">提交</button>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'

export const emitter = mitt()

export default defineComponent({
  name: 'ValidateForm',
  emits: ['form-submit'],
  setup (props, context) {
    const submitForm = () => {
      context.emit('form-submit', true)
    }
    const callback = (test?: string) => {
      console.log('test', test)
    }
    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
    })
    return {
      submitForm
    }
  }
})
</script>
<!--<script lang="ts" setup>-->
<!--import { defineEmits } from 'vue'-->

<!--const emit = defineEmits(['form-submit'])-->
<!--const submitForm = () => {-->
<!--  emit('form-submit', true)-->
<!--}-->

<!--</script>-->

<style>

</style>
