<template>
  <div class="row">
    <div v-for="column in columnList" :key="column._id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :src="column.avatar.url" :alt="column.title" class="rounded-circle border border-light my-3">
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-start">{{ column.description }}</p>
          <!--          <router-link :to="`/column/${column.id}`" class="btn btn-outline-primary">进入专栏</router-link>-->
          <router-link :to="{name: 'column', params: {id: column._id}}" class="btn btn-outline-primary">进入专栏
          </router-link>
        </div>
      </div>
    </div>
  </div>

</template>
<script lang="ts">

import { computed, defineComponent, PropType } from 'vue'
import { ColumnProps } from '@/types/commonTypes'

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    const columnList = computed(() => {
      return props.list.map(column => {
        if (!column.avatar) {
          column.avatar = { url: require('@/assets/default.png') }
        } else {
          column.avatar.url = column.avatar.url + '?x-oss-process=image/resize,m_pad,h_50,w_50'
        }
        return column
      })
    })
    return {
      columnList
    }
  }
})

</script>
<style scoped>
.card-body img {
  width: 52px;
  height: 50px;
}
</style>
