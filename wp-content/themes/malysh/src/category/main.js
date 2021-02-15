import Vue from 'vue'
import Category from "@/category/Category";

import { BootstrapVue } from 'bootstrap-vue'

Vue.use(BootstrapVue)


Vue.config.productionTip = false

new Vue({
    render: h => h(Category),
}).$mount('#app')