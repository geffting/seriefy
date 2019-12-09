import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _336e5dbf = () => interopDefault(import('../pages/episode-details.vue' /* webpackChunkName: "pages/episode-details" */))
const _6ecfd980 = () => interopDefault(import('../pages/serie-details.vue' /* webpackChunkName: "pages/serie-details" */))
const _58e3c5e1 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/episode-details",
    component: _336e5dbf,
    name: "episode-details"
  }, {
    path: "/serie-details",
    component: _6ecfd980,
    name: "serie-details"
  }, {
    path: "/",
    component: _58e3c5e1,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
