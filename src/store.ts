import { createStore } from 'vuex'
import { PostProps, testData, testPosts } from '@/testData'
import { UserProps } from '@/components/GlobalHeader.vue'
import { ColumnProps } from '@/components/ColumnList.vue'

export interface GlobalDataProps {
  user: UserProps,
  columns: ColumnProps[],
  posts: PostProps[]
}

const store = createStore<GlobalDataProps>({
  state: {
    user: { isLogin: false },
    columns: testData,
    posts: testPosts
  },
  mutations: {
    login (state) {
      state.user = {
        ...state.user,
        isLogin: true,
        name: 'Ories'
      }
    }
  }
})

export default store
