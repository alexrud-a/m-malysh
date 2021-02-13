import Vue from 'vue'
import Product from "@/product/Product";

Vue.config.productionTip = false

new Vue({
    render: h => h(Product),
}).$mount('#app')