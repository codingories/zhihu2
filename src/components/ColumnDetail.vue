<template>
  <h1>ColumnDetail</h1>
  <pre>
    {{ route }}
  </pre>
</template>

<script lang="ts" setup>

import { useRoute } from 'vue-router'

const route = useRoute()

</script>

<script lang="ts">
export default {
  name: 'ColumnDetail'
}
</script>
