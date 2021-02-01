import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import TrafficLight from './views/TrafficLight.vue'



Vue.use(Router)

new Vue({
  el: '#app',
  render: h => h(App),
  router:  new Router({
    mode: 'history',
    routes: [
        
            { path: '/', redirect: '/red'},
            { path: '/red', component: TrafficLight},
            { path: '/yellow', component: TrafficLight},
            { path: '/green', component: TrafficLight}
        
    ]
}),

})



