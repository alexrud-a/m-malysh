import Vue from 'vue'
import Footer from "@/footer/Footer";
import { BootstrapVue } from 'bootstrap-vue'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
    render: h => h(Footer),
}).$mount('#footer')