import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import ToDo from '@/views/ToDo'
import Other1 from '@/views/Other1'
import Other2 from '@/views/Other2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/todo',
      name: 'ToDo',
      component: ToDo
    },
    {
      path: '/other1',
      name: 'Other1',
      component: Other1
    },
    {
      path: '/other2',
      name: 'Other2',
      component: Other2
    },
  ]
})
