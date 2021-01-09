// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {ServerTable, ClientTable, Event} from 'vue-tables-2'
import VueResource from 'vue-resource'


// vue-tables-2
Vue.use(ClientTable); //Client table
Vue.use(ServerTable); //Server table

Vue.use(VueResource)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
