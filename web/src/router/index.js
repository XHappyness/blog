import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from "@/store"

Vue.use(VueRouter)

const router = new VueRouter(
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
            meta: {
              needLogin: true
            },
            name: 'myBlogs',
            component: () => import(/* webpackChunkName: "myBlogs" */ '../views/BlogList.vue')
          },
          {
            path: '/blog/otherBlogs',
            name: 'otherBlogs',
            component: () => import(/* webpackChunkName: "otherBlogs" */ '../views/BlogList.vue')
          },
          {
            path: '/blog/detail/:id',
            name: 'blogDetail',
            component: () => import(/* webpackChunkName: "blogDetail" */ '../views/BlogDetail.vue')
          },
          {
            path: '/blog/new',
            name: 'blogNew',
            component: () => import(/* webpackChunkName: "blogNew" */ '../views/BlogEdit.vue')
          },
          {
            path: '/blog/update/:id',
            name: 'blogUpdate',
            component: () => import(/* webpackChunkName: "blogUpdate" */ '../views/BlogEdit.vue')
          }
        ]
      }
    ]
  }
)

router.beforeEach((to, from, next) => {
  const username = store.getters.userName
  if (to.meta.needLogin && !username) {
    store.commit("upShowLogin", true)
    next(false)
  } else {
    next()
  }
})


export default router;