import Vue from 'vue'
import Support from "@/support/Support";
import { BootstrapVue } from 'bootstrap-vue'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
    render: h => h(Support),
}).$mount('#app')