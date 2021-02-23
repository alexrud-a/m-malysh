import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/components/index/Home";
import Company from "@/components/company/Company";
import Info from "@/components/info/Info";
import Support from "@/components/support/Support";
import Shop from "@/components/shop/Shop";
import Category from "@/components/shop/Category";
import Product from "@/components/shop/Product";
import Wishlist from "@/components/shop/Wishlist";
import Checkout from "@/components/shop/Checkout";
import Search from "@/components/search/Search";
import NotFound from "@/components/404/NotFound";
import Cart from "@/components/shop/Cart";

Vue.use(Router);

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/about',
            name: 'Company',
            component: Company
        },
        {
            path: '/info',
            name: 'Info',
            component: Info
        },
        {
            path: '/support',
            name: 'Support',
            component: Support
        },
        {
            path: '/shop',
            name: 'Shop',
            component: Shop
        },
        {
            path: '/category/:slug',
            name: 'Category',
            component: Category,
            props: true,
        },
        {
            path: '/product/:slug',
            name: 'Product',
            component: Product,
            props: true,
        },
        {
            path: '/wishlist',
            name: 'Wishlist',
            component: Wishlist
        },
        {
            path: '/cart',
            name: 'Cart',
            component: Cart
        },
        {
            path: '/checkout',
            name: 'Checkout',
            component: Checkout
        },
        {
            path: '/search',
            name: 'Search',
            component: Search,
        },
        {
            path: "/page-not-found",
            alias: '*',
            component: NotFound,
        },
    ]
});

export default router;