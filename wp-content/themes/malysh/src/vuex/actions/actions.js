import {tokenDadata, WooCommerce} from '../../consts';
import axios from "axios";

export default {
    CHANGE_CITY({commit}, city) {
        return axios('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
            method: "POST",
            mode: "cors",
            data: {
                "query": city,
                "locations": [{
                    "city": city
                }],
                "count": 3
            },
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Accept": "application/json;charset=UTF-8",
                "Authorization": "Token " + tokenDadata
            },
        })
            .then((response) => {
                let res = response.data.suggestions.slice();
                let city = res.slice().filter(item => item.data.city_with_type !== null && item.data.postal_code !== null);
                if (city.length <= 0) {
                    console.log(res);
                    return axios('https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address', {
                        method: "POST",
                        mode: "cors",
                        data: {
                            "lat": res[0].data.geo_lat,
                            "lon": res[0].data.geo_lon,
                            'count': 3
                        },
                        headers: {
                            "Content-Type": "application/json;charset=UTF-8",
                            "Accept": "application/json;charset=UTF-8",
                            "Authorization": "Token " + tokenDadata
                        },
                    })
                        .then(response => {
                            city = response.data.suggestions.slice().filter(item => item.data.city_with_type !== null && item.data.postal_code !== null);
                            commit('SET_USER_CITY', city[0].data);
                            return city;
                        })
                        .catch(error => {
                            console.log(error);
                            return error;
                        })
                } else {
                    commit('SET_USER_CITY', city[0].data);
                }
                return city
            })
            .catch((error) => {
                console.log(error)
                return error;
            })
    },
    GET_CITY_USER({commit}) {
        let coords;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                    coords = {
                        longitude: position.coords.longitude,
                        latitude: position.coords.latitude,
                    };
                    getCityByCoord();
                },
                (error) => {
                    console.log(error)
                    coords = {
                        longitude: 39.200269,
                        latitude: 51.660781,
                    };
                    getCityByCoord();
                }
            );
        } else {
            coords = {
                longitude: 39.200269,
                latitude: 51.660781,
            };
            getCityByCoord();
        }

        function getCityByCoord() {
            return axios('https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address', {
                method: "POST",
                mode: "cors",
                data: {
                    "lat": coords.latitude,
                    "lon": coords.longitude,
                    "count": 3
                },
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Token " + tokenDadata
                },
            })
                .then((response) => {
                    console.log(response);
                    commit('SET_USER_CITY', response.data.suggestions.slice().filter(item => item.data.city_with_type !== null && item.data.postal_code !== null)[0].data);
                    return response
                })
                .catch((error) => {
                    console.log(error)
                    return error;
                })
        }
    },
    GET_PRODUCTS({commit}) {
        return WooCommerce.get('products', {
            status: 'publish'
        })
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
            per_page: 30,
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
        return WooCommerce.get("products/attributes/5/terms", {
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
    ADD_CART({commit}, product) {
        commit('SET_CART', product);
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