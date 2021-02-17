import Vue from 'vue'
import App from './App.vue'
import router from "@/router/router";
import store from "./vuex/store";
import {BootstrapVue} from 'bootstrap-vue'
import VueMeta from 'vue-meta'

Vue.use(BootstrapVue)

Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
