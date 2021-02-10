import Vue from 'vue'
import Header from "@/header/Header";

import { BootstrapVue } from 'bootstrap-vue'

Vue.use(BootstrapVue)

import "@/assets/styles/style.scss";

Vue.config.productionTip = false

new Vue({
    render: h => h(Header),
}).$mount('#header')