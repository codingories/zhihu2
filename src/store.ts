import { Commit, createStore } from 'vuex'
import { UserProps } from '@/components/GlobalHeader.vue'
import axios from 'axios'
import { ColumnProps, PostProps } from '@/types/commonTypes'

export interface GlobalDataProps {
  loading: boolean,
  user: UserProps,
  columns: ColumnProps[],
  posts: PostProps[],
  token: string
}

const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
}
const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
  return data
}

const store = createStore<GlobalDataProps>({
  state: {
    token: '',
    loading: false,
    user: {
      isLogin: false,
      name: 'Ories',
      columnId: 1
    },
    columns: [],
    posts: []
  },
  mutations: {
    // login (state) {
    //   state.user = {
    //     ...state.user,
    //     isLogin: true,
    //     name: 'Ories'
    //   }
    // },
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
    },
    setLoading (state, status) {
      state.loading = status
    },
    login (state, rawData) {
      state.token = rawData.data.token
    }
  },
  actions: {
    fetchColumns ({ commit }) {
      getAndCommit('/api/columns?currentPage=1&pageSize=5', 'fetchColumns', commit)
    },
    fetchColumn ({ commit }, cid) {
      getAndCommit(`/api/columns/${cid}`, 'fetchColumn', commit)
    },
    fetchPosts ({ commit }, cid) {
      getAndCommit(`/api/columns/${cid}/posts?currentPage=${1}&pageSize=${5}`, 'fetchPosts', commit)
    },
    login ({ commit }, payload) {
      return postAndCommit('/api/user/login', 'login', commit, payload)
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
