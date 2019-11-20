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
        redirect: '/blog/allBlogs',
        children: [
          {
            path: '/blog/allBlogs',
            name: 'allBlogs',
            component: () => import(/* webpackChunkName: "allBlogs" */ '../views/AllBlogs.vue')
          },
          {
            path: '/blog/myblogs',
            name: 'myblogs',
            component: () => import(/* webpackChunkName: "myblogs" */ '../views/AllBlogs.vue')
          },
          {
            path: '/config',
            name: 'config',
            component: () => import(/* webpackChunkName: "config" */ '../views/Config.vue')
          }
        ]
      }
    ]
  }
)
