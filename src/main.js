import Vue from 'vue'
import App from './App'
import store from './store'

// Register service worker

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
