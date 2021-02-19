const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

export const WooCommerce = new WooCommerceRestApi({
    url: 'https://m-malysh.ru/',
    consumerKey: 'ck_882f64624ce39da4e32ba6797db5c14368f82a02', // Your consumer key
    consumerSecret: 'cs_abf9fc9ebef7255c861e493beb3363bcb31a2407', // Your consumer secret
    version: 'wc/v3' // WooCommerce WP REST API version
});
