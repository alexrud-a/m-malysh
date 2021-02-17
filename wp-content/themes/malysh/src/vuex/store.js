import Vue from 'vue'
import Vuex from 'vuex'

import actions from "./actions/actions"
import mutations from "./mutations/mutations"
import getters from "./getters/getters"

Vue.use(Vuex)

let cart_data = [];

if (localStorage.getItem("cart") !== null) {
    cart_data = JSON.parse(localStorage.getItem("cart"));
}

if (cart_data.length < 0) {
    cart_data = [];
    localStorage.setItem("cart", JSON.stringify(cart_data));
}

let store = new Vuex.Store({
    state: {
        products: [],
        categories: [],
        subCategories: [],
        sizes: [],
        height: [],
        cart: cart_data,
    },
    mutations,
    actions,
    getters,
});

export default store;