import Vue from 'vue'
import VueRouter from 'vue-router'
import Spage from '@/views/shujufenxi/Spage.vue'
import fHome from '@/views/shujufenxi/fHome.vue'
import p1 from '@/views/shujufenxi/p1.vue'
import p2 from '@/views/shujufenxi/p2.vue'
import p3 from '@/views/shujufenxi/p3.vue'
import PopulationThree from '@/views/shujufenxi/PopulationThree.vue'
import HomeHome from '@/views/shujufenxi/HomeHome.vue'
Vue.use(VueRouter)
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/HomeHome',
  },
  {
    path: '/HomeHome',
    name: 'HomeHome',
    component: HomeHome,
  },
  {
    path: '/Spage',
    name: 'Spage',
    component: Spage,
  },
  {
    path: '/fHome',
    name: 'fHome',
    component: fHome,
  },
  {
    path: '/p1',
    name: 'p1',
    component: p1,
  },
  {
    path: '/p2',
    name: 'p2',
    component: p2,
  },
  {
    path: '/p3',
    name: 'p3',
    component: p3,
  },
  {
    path: '/PopulationThree',
    name: 'PopulationThree',
    component: PopulationThree,
  },
  ]




const router = new VueRouter({
  routes
})

export default router
