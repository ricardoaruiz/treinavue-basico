import Vue from 'vue'
import App from './App.vue'
import TempoAgora from '@/components/TempoAgora.vue';

Vue.config.productionTip = false

Vue.component("TempoAgora", TempoAgora);

new Vue({
  render: h => h(App),
}).$mount('#app')
