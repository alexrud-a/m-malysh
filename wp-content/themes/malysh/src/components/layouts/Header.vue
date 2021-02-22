<template>
  <header id="header"
          class="header"
  >
    <div class="header__top">
      <b-container>
        <b-row>
          <b-col md="8"
                 class="text-right"
          >
            <a href="#"
               class="header__city-link"
            >
              г. Воронеж
            </a>
          </b-col>
          <b-col md="4"
                 class="text-right"
          >
          <span>
            Часы работы: ежедневно с 9.00 до 20.00 (по Мск)
          </span>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <b-container class="pt-2 pb-2">
      <b-row class="align-items-center">
        <b-col md="4">
          <p class="header__slogan mb-0">
            Есть вопросы? - Позвони
          </p>
          <a :href="'tel:'+contacts.phone"
             class="header__phone-link"
          >
            {{ contacts.phone }}
          </a>
        </b-col>
        <b-col md="4" class="text-center">
          <router-link :to="{name: 'Home'}">
            <img :src="siteInfo.logo"
                 class="img-fluid mb-2"
            />
          </router-link>
          <p class="header__desc mb-0">
            {{ siteInfo.desc }}
          </p>
        </b-col>
        <b-col md="4"
               class="d-flex align-items-center justify-content-between"
        >
          <b-form class="header__search-form"
                  @submit.prevent="searching"
          >
            <b-form-row class="flex-nowrap position-relative">
              <b-form-input type="search"
                            placeholder="Поиск по сайту"
                            v-model="searchVal"
              />
              <b-button class="header__search-form-btn bg-transparent border-0"
                        type="submit"
              >
                <svg width="25" height="25">
                  <use xlink:href="/wp-content/themes/malysh/img/sprite.svg#search"/>
                </svg>
              </b-button>
            </b-form-row>
          </b-form>
          <router-link :to="{name: 'Wishlist', params: {wishlist_data: WISHLIST}}"
                       class="header__wishlist"
                       :class="{'header__wishlist--add' : WISHLIST.length}"
          >
            <svg width="25" height="25" v-if="WISHLIST.length">
              <use xlink:href="/wp-content/themes/malysh/img/sprite.svg#like-add"/>
            </svg>
            <svg width="25" height="25" v-else>
              <use xlink:href="/wp-content/themes/malysh/img/sprite.svg#like"/>
            </svg>
          </router-link>
          <router-link class="header__cart"
                       :to="{name: 'Cart', params: {cart_data: CART}}">
            <svg width="25" height="25">
              <use xlink:href="/wp-content/themes/malysh/img/sprite.svg#shopping-bag"/>
            </svg>
            <span class="header__cart-count" v-if="CART.length">
              {{ CART.reduce((s, i) => s = s + i.quantity, 0) }}
            </span>
          </router-link>
        </b-col>
      </b-row>
    </b-container>
    <b-container>
      <b-nav class="border-top border-bottom border-gray header__menu justify-content-around">
        <li class="nav-item header__menu-item"
            v-for="(link, ind) in this.menu"
            :key="ind"
        >
          <router-link
              :to="link.url.replace('https://m-malysh.ru/', '')"
              class="nav-link"
          >
            {{ link.title }}
          </router-link>
        </li>
      </b-nav>
    </b-container>
  </header>
</template>

<script>
import {mapGetters} from "vuex";
import axios from 'axios';

export default {
  name: "Header",
  data() {
    return {
      siteInfo: '',
      menu: [],
      contacts: [],
      searchVal: ''
    }
  },
  computed: {
    ...mapGetters([
      'CART',
      'WISHLIST'
    ]),
  },
  methods: {
    getMenu() {
      return axios('https://m-malysh.ru/wp-json/wp-api-menus/v2/menus/2', {
        method: "GET"
      })
          .then((response) => {
            this.menu = response.data.items;
          })
          .catch((error) => {
            console.log(error);
            return error;
          })
    },
    getContacts() {
      return axios('https://m-malysh.ru/wp-json/wp/v2/pages/35', {
        method: "GET"
      })
          .then((response) => {
            this.contacts = response.data.acf.contacts;
          })
          .catch((error) => {
            console.log(error);
            return error;
          })
    },
    searching() {
      this.$router
          .push({name: 'Search', query: {search: this.searchVal}})
          .catch(() => null);
      this.searchVal = '';
    }
  },
  created() {
    this.siteInfo = window.siteInfo;
    this.getMenu();
    this.getContacts();
  }
}
</script>

<style>
</style>