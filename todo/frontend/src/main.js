import Vue from 'vue'
import App from './App.vue'
import router from './router'

import TodoButton from '@/components/TodoButton';
import Message from '@/components/Message';

import "font-awesome/css/font-awesome.css";

Vue.config.productionTip = false

Vue.component('TodoButton', TodoButton);
Vue.component('Message', Message);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
