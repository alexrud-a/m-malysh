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

import VueMask from 'v-mask'

Vue.use(VueMask);

import {ValidationProvider, ValidationObserver, localize, extend} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

import ru from '@/assets/ru.json';

localize('ru', ru);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
