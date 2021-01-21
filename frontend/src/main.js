import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueRouter from 'vue-router'
import Routes from './Routes/Routes'
import store from './store'
import VeeValidate from 'vee-validate';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import moment from 'moment'

Vue.config.productionTip = false
Vue.use(VeeValidate);
Vue.use(VueRouter)


Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY HH:mm')
  }
});

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})

new Vue({
  router,
  store,
  render: h => h(App)
  }).$mount('#app')
