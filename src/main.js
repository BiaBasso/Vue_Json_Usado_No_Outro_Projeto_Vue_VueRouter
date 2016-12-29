import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import List from './list.vue'
import Add from './add.vue'

Vue.use(VueResource)

new Vue({  
  el: 'body',
  components: { App }
})

// Vue.use(VueRouter)

// const routes = [
//   { 
//     path: '/app', 
//     component: App,
//       children: [
//         { path: 'list', component: List },
//         { path: 'add', component: Add }
//     ]
//   }
// ]

// const router = new VueRouter({
//   routes
// })

// const app = new Vue({
//   router
// }).$mount('#container')