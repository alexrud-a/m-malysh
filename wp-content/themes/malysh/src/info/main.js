import Vue from 'vue'
import Info from "@/info/Info";
import { BootstrapVue } from 'bootstrap-vue'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
    render: h => h(Info),
}).$mount('#app')