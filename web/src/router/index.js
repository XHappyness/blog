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
            component: () => import(/* webpackChunkName: "allBlogs" */ '../views/BlogList.vue')
          },
          {
            path: '/blog/myBlogs',
            name: 'myBlogs',
            component: () => import(/* webpackChunkName: "myBlogs" */ '../views/BlogList.vue')
          },
          {
            path: '/blog/otherBlogs',
            name: 'otherBlogs',
            component: () => import(/* webpackChunkName: "otherBlogs" */ '../views/BlogList.vue')
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
