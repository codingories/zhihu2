<template>
  <teleport to="#back">
    <div class="d-flex justify-content-center align-items-center h-100 loading-container"
         :style="{backgroundColor: background || ''}"
    >
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">{{ text || 'loading' }}</span>
        </div>
        <p v-if="text" class="text-primary small">
          {{ text }}
        </p>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, onUnmounted } from 'vue'

const node = document.createElement('div')
node.id = 'back'
document.body.appendChild(node)

onUnmounted(() => {
  document.body.removeChild(node)
})

defineProps({
  text: {
    type: String
  },
  background: {
    type: String
  }
})
</script>

<style>
.loading-container {
  background: rgba(255, 255, 255, .5);
  z-index: 100;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.loading-content {
  text-align: center;
}
</style>
