import index from './views/index.vue'

export default {
  MN: 'blog',
  BR: '/module/blog',
  icon: 'el-icon-folder',
  store: {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {},
    getters: {}
  },
  routes: [
    {
      path: '/module/blog',
      name: 'module-blog-index',
      meta: {
        hidden: false,
        title: 'blog'
      },
      component: index,
      children: []
    }
  ]
}
