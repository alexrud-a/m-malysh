import Vue from 'vue'
import Footer from "@/footer/Footer";


Vue.config.productionTip = false

new Vue({
    render: h => h(Footer),
}).$mount('#footer')