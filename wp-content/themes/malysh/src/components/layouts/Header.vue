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
              :to="link.url"
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

<style lang="scss">
.header {
  flex: 0 0 auto;

  &__top {
    background-color: #303030;
    color: #fff;
    padding: 10px 0;
    font-size: 12px;
  }

  &__city-link {
    color: #fff;
    text-decoration: none;
    border-bottom: 1px solid #fff;

    &:hover {
      color: #fff;
      text-decoration: none;
    }
  }

  &__slogan {
    font-size: 16px;
  }

  &__phone-link {
    font-size: 20px;
    font-weight: $font-weight-bold;
    color: #000;
    text-decoration: none;

    &:hover {
      color: #000;
      text-decoration: none;
    }
  }

  &__desc {
    color: #aaaaaa;
    font-size: 14px;
    text-align: center;
  }

  &__search-form {
    width: 220px;
  }

  &__search-form-btn {
    position: absolute;
    right: 0;
    box-shadow: none !important;
  }

  &__menu {
    text-align: center;

    &-item {
      a {
        font-size: 18px;
        color: #000;
        position: relative;

        &::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 13px;
          height: 10px;
          background-color: $blue;
          border-radius: 2px;
          transition: all .3s ease-in-out;
          opacity: 0;
          z-index: -1;
        }

        &:hover, &:focus, &:active,
        .router-link-active {
          color: #000;

          &::after,
          .router-link-active::after {
            opacity: 1;
          }
        }
      }
    }
  }

  &__cart {
    text-decoration: none!important;
    position: relative;
    margin-right: 12px;

    &-count {
      position: absolute;
      bottom: -12px;
      right: -12px;
      width: 23px;
      height: 23px;
      border-radius: 50%;
      background: #0abab5;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
    }
  }

  &__wishlist {
    &--add {
      svg {
        fill: $blue;
      }
    }
  }
}
</style>