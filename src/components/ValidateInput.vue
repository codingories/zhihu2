<template>
  <div class="validate-input-container pb-3">

    <!--    v-model="emailRef.val"-->
    <!--    @blur="validateEmail"-->
    <!--    is-valid"-->
    <!--    {{ inputRef }}-->
    <!--    {{ inputRef.error }}-->

    <input
      class="form-control"
      :class="{'is-invalid': inputRef.error}"
      @blur="validateInput"
      :value="inputRef.val"
      @input="updateValue"
      v-bind="$attrs"
    >
    <!--    <span v-if="inputRef.error" class="invalid-feedback">-->
    <!--&lt;!&ndash;      {{ inputRef.message }}&ndash;&gt;-->
    <!--      12334-->
    <!--    </span>-->
    <span v-if="inputRef.error" class="invalid-feedback">{{ inputRef.message }}</span>

  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, PropType, reactive } from 'vue'

const emailReg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/

interface RuleProp {
  type: 'required' | 'email';
  message: string;
}

export type RulesProp = RuleProp[]

const props = defineProps({
  rules: Array as PropType<RulesProp>,
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const inputRef = reactive({
  val: props.modelValue || '',
  error: false,
  message: ''
})

const updateValue = (e: KeyboardEvent) => {
  console.log('ee', e.target)
  console.log('e.target.nodeValue', (e.target as HTMLInputElement).value)
  const targetValue = (e.target as HTMLInputElement).value as string
  inputRef.val = targetValue
  emit('update:modelValue', targetValue)
}

const validateInput = () => {
  if (props.rules) {
    const allPassed = props.rules.every(rule => {
      let passed = true
      inputRef.message = rule.message
      switch (rule.type) {
        case 'required':
          console.log('inputRef.val', inputRef.val)
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
  }
}

</script>
<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
<style>

</style>