import Vue from 'vue'
import Vuex from 'vuex'

import actions from "./actions/actions"
import mutations from "./mutations/mutations"
import getters from "./getters/getters"
import {get_cookie} from "@/utils";

Vue.use(Vuex)

import VueCookie from 'vue-cookie';

Vue.use(VueCookie);

let cart_data = [];

if (localStorage.getItem("m-cart") !== null) {
    cart_data = JSON.parse(localStorage.getItem("m-cart"));
}

if (cart_data.length < 0) {
    cart_data = [];
    localStorage.setItem("m-cart", JSON.stringify(cart_data));
}

let wishlist_data = [];

if (localStorage.getItem("m-wishlist") !== null) {
    wishlist_data = JSON.parse(localStorage.getItem("m-wishlist"));
}

if (wishlist_data.length < 0) {
    wishlist_data = [];
    localStorage.setItem("m-wishlist", JSON.stringify(wishlist_data));
}

let user = [];

if (get_cookie('user') !== null) {
    user = JSON.parse(get_cookie('user'));
}

let store = new Vuex.Store({
    state: {
        products: [],
        categories: [],
        subCategories: [],
        sizes: [],
        height: [],
        cart: cart_data,
        wishlist: wishlist_data,
        user: user,
        userCity: ''
    },
    mutations,
    actions,
    getters,
});

export default store;