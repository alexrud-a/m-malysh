import Vue from 'vue'
import Header from "@/header/Header";


Vue.config.productionTip = false

new Vue({
    render: h => h(Header),
}).$mount('#header')