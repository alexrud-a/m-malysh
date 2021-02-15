import Vue from 'vue'
import Shop from "@/shop/Shop";

import { BootstrapVue } from 'bootstrap-vue'

Vue.use(BootstrapVue)


Vue.config.productionTip = false

new Vue({
    render: h => h(Shop),
}).$mount('#app')