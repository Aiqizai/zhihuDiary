import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
 
const routes = [
  {
    path: "/",
    name: "Home",
    component:Home
  },
  {
    path: "/detail/:id",
    name: 'Detail',
    props: true,
    component: () => import('../views/article/ArticleDetail.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/Login.vue')
  },
  {
    path: '/detail/:id/comment',
    name: "Comment",
    props: true,
    component: () => import('../views/article/Comments.vue')
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import('../views/Mine.vue')
  },
  {
    path: '/collect',
    name: 'Collect',
    component: () => import('../views/collection/CollectionView.vue'),
    // meta: {
    //   title: '收藏页',
    //   keepAlive: true
    // },
  },
  {
    path: '/search',
    name: 'Search',
    props: true,
    component: () => import('../views/article/SearchArticle.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router