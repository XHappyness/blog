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
        redirect: '/taskList',
        children: [
          {
            path: '/taskList',
            name: 'taskList',
            component: () => import(/* webpackChunkName: "taskList" */ '../views/TaskList.vue')
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
