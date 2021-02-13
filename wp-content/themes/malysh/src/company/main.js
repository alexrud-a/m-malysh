import Vue from 'vue'
import Company from "@/company/Company";
import { BootstrapVue } from 'bootstrap-vue'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
    render: h => h(Company),
}).$mount('#app')