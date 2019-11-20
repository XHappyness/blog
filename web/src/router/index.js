import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

export default new VueRouter(
  {
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home,
        redirect: '/allBlogs',
        children: [
          {
            path: '/allBlogs',
            name: 'allBlogs',
            meta: { pageName: "博客列表" },
            component: () => import(/* webpackChunkName: "allBlogs" */ '../views/AllBlogs.vue')
          },
          {
            path: '/config',
            name: 'config',
            meta: { pageName: "配置页面" },
            component: () => import(/* webpackChunkName: "config" */ '../views/Config.vue')
          }
        ]
      }
    ]
  }
)
