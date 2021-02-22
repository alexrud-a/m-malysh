import {WooCommerce} from '../../consts';

export default {
    GET_PRODUCTS({commit}) {
        return WooCommerce.get('products')
            .then((response) => {
                commit('SET_PRODUCTS', response.data);
                return response;
            })
            .catch((error) => {
                console.log(error);
                return error;
            });
    },
    GET_CATEGORIES({commit}) {
        return WooCommerce.get('products/categories', {
            orderby: 'name',
            hide_empty: true,
        })
            .then((response) => {
                commit('SET_CATEGORIES', response.data);
                return response;
            })
            .catch((error) => {
                console.log(error);
                return error;
            });
    },
    GET_SUBCATEGORIES({commit}) {
        return WooCommerce.get("products/attributes/1/terms", {
            hide_empty: true
        })
            .then((response) => {
                commit('SET_SUBCATEGORIES', response.data);
                return response;
            })
            .catch((error) => {
                console.log(error.response.data);
                return error;
            });
    },
    GET_SIZES({commit}) {
        return WooCommerce.get("products/attributes/2/terms", {
            hide_empty: true
        })
            .then((response) => {
                commit('SET_SIZES', response.data);
                return response;
            })
            .catch((error) => {
                return error;
            });
    },
    GET_HEIGHT({commit}) {
        return WooCommerce.get("products/attributes/3/terms", {
            hide_empty: true
        })
            .then((response) => {
                commit('SET_HEIGHT', response.data);
                return response;
            })
            .catch((error) => {
                console.log(error.response.data);
                return error;
            });
    },
    GET_COLORS({commit}) {
        return WooCommerce.get("products/attributes/4/terms", {
            hide_empty: true
        })
            .then((response) => {
                commit('SET_COLORS', response.data);
                return response;
            })
            .catch((error) => {
                console.log(error.response.data);
                return error;
            });
    },
    ADD_CART({commit}, product) {
        commit('SET_CART', product);
    },
    DELETE_CART({commit}, index) {
        commit('REMOVE_CART', index)
    },
    INCREMENT_CART_ITEM({commit}, index) {
        commit('INCREMENT', index)
    },
    DECREMENT_CART_ITEM({commit}, index) {
        commit('DECREMENT', index)
    },
    CLEAR_CART({commit}) {
        commit('CLEAR')
    },
    CHANGE_WISHLIST({commit}, product) {
        commit('SET_WISHLIST', product);
    },
}