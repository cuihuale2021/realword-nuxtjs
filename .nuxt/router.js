import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _33fa9f07 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _12b1ebfc = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _43c3dbec = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _3b63616c = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _7b6e4680 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _282bc54a = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _222da4b9 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _33fa9f07,
    children: [{
      path: "",
      component: _12b1ebfc,
      name: "home"
    }, {
      path: "/login",
      component: _43c3dbec,
      name: "login"
    }, {
      path: "/register",
      component: _43c3dbec,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _3b63616c,
      name: "profile"
    }, {
      path: "/settings",
      component: _7b6e4680,
      name: "settings"
    }, {
      path: "/editor",
      component: _282bc54a,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _222da4b9,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
