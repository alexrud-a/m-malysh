import Vue from 'vue'
import Sales from "@/sales/Sales";
import { BootstrapVue } from 'bootstrap-vue'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
    render: h => h(Sales),
}).$mount('#app')