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

<!--<script lang="ts">-->
<!--import { defineComponent, onUnmounted } from 'vue'-->
<!--import mitt from 'mitt'-->

<!--export const emitter = mitt()-->

<!--type ValidateFunc = () => boolean;-->

<!--export default defineComponent({-->
<!--  name: 'ValidateForm',-->
<!--  emits: ['form-submit'],-->
<!--  setup (props, context) {-->
<!--    let funcArr: ValidateFunc[] = []-->
<!--    const submitForm = () => {-->
<!--      const result = funcArr.map(func => func()).every(result => result)-->
<!--      context.emit('form-submit', result)-->
<!--    }-->
<!--    const callback = (func?: ValidateFunc) => {-->
<!--      if (func) {-->
<!--        funcArr.push(func)-->
<!--      }-->
<!--    }-->
<!--    emitter.on('form-item-created', callback)-->
<!--    onUnmounted(() => {-->
<!--      emitter.off('form-item-created', callback)-->
<!--      funcArr = []-->
<!--    })-->
<!--    return {-->
<!--      submitForm-->
<!--    }-->
<!--  }-->
<!--})-->
<!--</script>-->

<script lang="ts" setup>
import { defineEmits, onUnmounted } from 'vue'
import { emitter } from '@/stores/store'

type ValidateFunc = () => boolean

const emit = defineEmits(['form-submit'])
let funcArr: ValidateFunc[] = []

const callback = (func?: ValidateFunc) => {
  if (func) {
    funcArr.push(func)
  }
}

emitter.on('form-item-created', callback)
onUnmounted(() => {
  emitter.off('form-item-created', callback)
  funcArr = []
})

const submitForm = () => {
  const result = funcArr.map(func => func()).every(result => result)
  emit('form-submit', result)
}
</script>

<style>

</style>
