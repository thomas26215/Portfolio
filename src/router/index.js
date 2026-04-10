import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/',         name: 'about',    component: () => import('@/pages/about/index.vue') },
    { path: '/projets',  name: 'projets',  component: () => import('@/pages/projets/index.vue') },
    { path: '/projets/:id', name: 'projet-detail', component: () => import('@/pages/projets/detail.vue') },
    { path: '/parcours', name: 'parcours', component: () => import('@/pages/parcours/index.vue') },
    { path: '/contact',  name: 'contact',  component: () => import('@/pages/contact/index.vue') },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
