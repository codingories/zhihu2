import { createStore } from 'vuex'
import { PostProps, testData, testPosts } from '@/testData'
import { UserProps } from '@/components/GlobalHeader.vue'
import axios from 'axios'
import { ColumnProps } from '@/types/commonTypes'

export interface GlobalDataProps {
  user: UserProps,
  columns: ColumnProps[],
  posts: PostProps[]
}

const store = createStore<GlobalDataProps>({
  state: {
    user: {
      isLogin: true,
      name: 'Ories',
      columnId: 1
    },
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
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns (state, rawData) {
      state.columns = rawData.data.list
    }
  },
  actions: {
    fetchColumns (context) {
      axios.get('/api/columns?currentPage=1&pageSize=5').then(res => {
        context.commit('fetchColumns', res.data)
      })
    }
  },
  getters: {
    // biggerColumnsLen (state) {
    //   return state.columns.filter(c => c.id > 2).length
    // },
    // getColumnById: (state) => (id: number) => {
    //   return state.columns.find(c => c.id === id)
    // },
    getPostsByCid: (state) => (cid: number) => {
      return state.posts.filter(post => post.columnId === cid)
    }
  }
})

export default store
