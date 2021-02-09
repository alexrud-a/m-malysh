import Vue from 'vue'
import Company from "@/company/Company";

Vue.config.productionTip = false

new Vue({
    render: h => h(Company),
}).$mount('#company')