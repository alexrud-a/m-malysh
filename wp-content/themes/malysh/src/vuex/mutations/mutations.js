export default {
    SET_PRODUCTS: (state, products) => {
        state.products = products;
    },
    SET_CATEGORIES: (state, categories) => {
        state.categories = categories;
    },
    SET_SUBCATEGORIES: (state, subCategories) => {
        state.subCategories = subCategories;
    },
    SET_SIZES: (state, sizes) => {
        state.sizes = sizes;
    },
    SET_HEIGHT: (state, height) => {
        state.height = height;
    },
    SET_CART: (state, product) => {
        let isProduct = false;
        state.cart.map(function (item) {
            if (item.article === product.article) {
                isProduct = true;
                item.quantity++
            }
        });
        let temp = isProduct || state.cart.push({ ...product, quantity: 1 });
        localStorage.setItem("cart", JSON.stringify(state.cart));
        return temp
    },
    REMOVE_CART: (state, index) => {
        let temp = state.cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(state.cart));
        return temp
    },
    INCREMENT: (state, index) => {
        let temp = state.cart[index].quantity++
        localStorage.setItem("cart", JSON.stringify(state.cart));
        return temp
    },
    DECREMENT: (state, index) => {
        if (state.cart[index].quantity > 1) {
            let temp = state.cart[index].quantity--
            localStorage.setItem("cart", JSON.stringify(state.cart));
            return temp
        }
    },
    CLEAR: (state) => {
        state.cart = [];
        localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    SEARCH: (state, val) => {
        state.searchVal = val
    }
}