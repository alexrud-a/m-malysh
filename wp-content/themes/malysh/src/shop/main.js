import Vue from 'vue'
import Shop from "@/shop/Shop";

Vue.config.productionTip = false

new Vue({
    render: h => h(Shop),
}).$mount('#app')