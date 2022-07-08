import { createStore } from 'vuex'
import { UserProps } from '@/components/GlobalHeader.vue'
import axios from 'axios'
import { ColumnProps, PostProps } from '@/types/commonTypes'

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
    columns: [],
    posts: []
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
    },
    fetchColumn (state, rawData) {
      state.columns = [rawData.data]
    },
    fetchPosts (state, rawData) {
      state.posts = rawData.data.list
    }
  },
  actions: {
    fetchColumns (context) {
      axios.get('/api/columns?currentPage=1&pageSize=5').then(res => {
        context.commit('fetchColumns', res.data)
      })
    },
    fetchColumn ({ commit }, cid) {
      axios.get(`/api/columns/${cid}`).then(res => {
        commit('fetchColumn', res.data)
      })
    },
    fetchPosts ({ commit }, cid) {
      axios.get(`/api/columns/${cid}/posts?currentPage=${1}&pageSize=${5}`).then(res => {
        commit('fetchPosts', res.data)
      })
    }
  },
  getters: {
    getColumnById: (state) => (id: string) => {
      return state.columns.find(c => c._id === id)
    },
    getPostsByCid: (state) => (cid: string) => {
      return state.posts.filter(post => post.column === cid)
    }
  }
})

export default store
