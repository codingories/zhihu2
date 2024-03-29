<template>
  <div class="validate-input-container pb-3">
    <input
      v-if="tag!=='textarea'"
      class="form-control"
      :class="{'is-invalid': inputRef.error}"
      @blur="validateInput"
      :value="inputRef.val"
      @input="updateValue"
      v-bind="$attrs"
    >
    <textarea
      v-else
      type="text"
      class="form-control"
      :class="{'is-invalid': inputRef.error}"
      @blur="validateInput"
      :value="inputRef.val"
      @input="updateValue"
      v-bind="$attrs"
    ></textarea>

    <span v-if="inputRef.error" class="invalid-feedback">{{ inputRef.message }}</span>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, PropType, reactive, defineExpose, onMounted } from 'vue'
import { emitter } from '@/stores/store'
import { RulesProp } from '@/types/commonTypes'

const emailReg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/

type TagType = 'input' | 'textarea'
const props = defineProps({
  rules: Array as PropType<RulesProp>,
  modelValue: String,
  tag: {
    type: String as PropType<TagType>,
    default: 'input'
  }
})

const emit = defineEmits(['update:modelValue'])

const inputRef = reactive({
  val: props.modelValue || '',
  error: false,
  message: ''
})

const updateValue = (e: KeyboardEvent) => {
  const targetValue = (e.target as HTMLInputElement).value as string
  inputRef.val = targetValue
  emit('update:modelValue', targetValue)
}

onMounted(() => {
  emitter.emit('form-item-created', validateInput)
})

const validateInput = () => {
  if (props.rules) {
    const allPassed = props.rules.every(rule => {
      let passed = true
      inputRef.message = rule.message
      switch (rule.type) {
        case 'required':
          passed = (inputRef.val.trim() !== '')
          break
        case 'email':
          passed = emailReg.test(inputRef.val)
          break
        default:
          break
      }
      return passed
    })
    inputRef.error = !allPassed
    return allPassed
  }
  return true
}

defineExpose({
  validateInput
})

</script>
<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
<style>

</style>
