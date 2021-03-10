<template>
  <header id="header"
          class="header"
  >
    <div class="header__top">
      <b-container>
        <b-row>
          <b-col lg="8"
                 md="6"
                 class="text-right"
          >
            <a href="#"
               class="header__city-link"
               @click.prevent="$bvToast.show('city-toast')"
            >
              <template v-if="USER_CITY.city_with_type !== null">
                {{ USER_CITY.city_with_type }}
              </template>
              <template v-else>
                {{ USER_CITY.area_with_type }}
              </template>
            </a>
            <b-toast id="city-toast" title="Ваш город">
              <b-form @submit.prevent="changeCity">
                <b-form-row>
                  <b-col sm="8">
                    <b-input type="text" v-model="city"/>
                  </b-col>
                  <b-col sm="4">
                    <b-btn type="submit" class="btn btn-blue" @click="$bvToast.hide('city-toast')">
                      ОК
                    </b-btn>
                  </b-col>
                </b-form-row>
              </b-form>
            </b-toast>
          </b-col>
          <b-col lg="4"
                 md="6"
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
        <b-col md="4" class="w-sm-60">
          <p class="header__slogan mb-0">
            Есть вопросы? - Позвони
          </p>
          <a :href="'tel:'+contacts.phone"
             class="header__phone-link"
          >
            {{ contacts.phone }}
          </a>
        </b-col>
        <b-col md="4" class="text-right text-md-center d-none d-sm-block">
          <router-link :to="{name: 'Home'}">
            <picture>
              <source media="(min-width: 768px)" :srcset="siteInfo.logo">
              <img :src="siteInfo.logoMin"
                   class="img-fluid mb-2"
              />
            </picture>
          </router-link>
          <p class="header__desc mb-0 d-md-block d-none">
            {{ siteInfo.desc }}
          </p>
        </b-col>
        <b-col md="4" class="d-flex d-xl-none justify-content-end w-sm-40">
          <div class="menu-toggle" :class="{'menu-toggle--active' : isOpen}" @click="toggleMenu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </b-col>
        <b-col md="4"
               class="d-xl-flex align-items-center justify-content-between d-none"
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
          <router-link :to="{name: 'Profile'}" v-if="USER.ID" class="header__user">
            <svg width="25" height="25">
              <use xlink:href="/wp-content/themes/malysh/img/sprite.svg#user"/>
            </svg>
          </router-link>
          <b-link v-else v-b-modal.authorization class="header__user">
            <svg width="25" height="25">
              <use xlink:href="/wp-content/themes/malysh/img/sprite.svg#user"/>
            </svg>
          </b-link>
          <b-modal id="authorization" centered hide-footer title="Авторизация">
            <Authorization/>
          </b-modal>
        </b-col>
      </b-row>
    </b-container>
    <b-container class="d-xl-block header__menu-wrap" :class="{'header__menu-wrap--active' : isOpen}">
      <div class="d-xl-none d-flex flex-column w-100 p-3">
        <router-link :to="{name: 'Home'}" @click.native="toggleMenu">
          <picture>
            <source media="(min-width: 768px)" :srcset="siteInfo.logo">
            <img :src="siteInfo.logoMin"
                 class="img-fluid mb-2"
            />
          </picture>
        </router-link>
        <router-link :to="{name: 'Wishlist', params: {wishlist_data: WISHLIST}}"
                     class="header__wishlist d-block mb-3"
                     :class="{'header__wishlist--add' : WISHLIST.length}"
                     @click.native="toggleMenu"
        >
          <svg width="25" height="25" v-if="WISHLIST.length">
            <use xlink:href="/wp-content/themes/malysh/img/sprite.svg#like-add"/>
          </svg>
          <svg width="25" height="25" v-else>
            <use xlink:href="/wp-content/themes/malysh/img/sprite.svg#like"/>
          </svg>
          <span>
            Избранное
          </span>
        </router-link>
        <router-link class="header__cart d-block mb-3" @click.native="toggleMenu"
                     :to="{name: 'Cart', params: {cart_data: CART}}">
          <svg width="25" height="25">
            <use xlink:href="/wp-content/themes/malysh/img/sprite.svg#shopping-bag"/>
          </svg>
          <span class="header__cart-count" v-if="CART.length">
            {{ CART.reduce((s, i) => s = s + i.quantity, 0) }}
          </span>
          <span>
            Корзина
          </span>
        </router-link>
        <router-link :to="{name: 'Profile'}" v-if="USER.ID" class="header__user d-block mb-3" @click.native="toggleMenu">
          <svg width="25" height="25">
            <use xlink:href="/wp-content/themes/malysh/img/sprite.svg#user"/>
          </svg>
          <span>
            Личный кабинет
          </span>
        </router-link>
        <b-link v-else v-b-modal.authorization class="header__user d-block mb-3">
          <svg width="25" height="25">
            <use xlink:href="/wp-content/themes/malysh/img/sprite.svg#user"/>
          </svg>
          <span>
            Войти
          </span>
        </b-link>
      </div>

      <b-nav class="border-top border-bottom border-gray header__menu justify-content-start justify-content-xl-around">
        <li class="nav-item header__menu-item"
            v-for="(link, ind) in this.menu"
            :key="ind"
        >
          <router-link
              :to="link.url"
              class="nav-link"
              @click.native="toggleMenu"
          >
            {{ link.title }}
          </router-link>
        </li>
      </b-nav>
    </b-container>
  </header>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import axios from 'axios';
import Authorization from "@/components/forms/Authorization";

export default {
  name: "Header",
  components: {Authorization},
  data() {
    return {
      siteInfo: '',
      menu: [],
      contacts: [],
      searchVal: '',
      city: '',
      isOpen: false,
    }
  },
  computed: {
    ...mapGetters([
      'CART',
      'WISHLIST',
      'USER_CITY',
      'USER'
    ]),
  },
  methods: {
    ...mapActions([
      'GET_CITY_USER',
      'CHANGE_CITY',
    ]),
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    changeCity() {
      this.CHANGE_CITY(this.city);
      this.city = '';
    },
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
    this.GET_CITY_USER();
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
    text-align: left;

    @media screen and (min-width: 1200px) {
      text-align: center;
    }

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
    text-decoration: none !important;
    position: relative;
    margin-right: 12px;

    span {
      color: #000;
      margin-left: 15px;
    }

    &-count {
      position: absolute;
      bottom: -12px;
      left: -3px;
      width: 23px;
      height: 23px;
      border-radius: 50%;
      background: #0abab5;
      color: #fff!important;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
    }

    &:hover {
      text-decoration: none;
      color: $blue;
    }
  }

  &__wishlist {

    span {
      color: #000;
      margin-left: 15px;
    }

    &--add {
      svg {
        fill: $blue;
      }
    }

    &:hover {
      text-decoration: none;
      color: $blue;
    }
  }

  &__user {
    span {
      color: #000;
      margin-left: 15px;
    }

    svg {
      fill: #000;
    }

    &:hover {
      text-decoration: none;
      color: $blue;

      svg {
        fill: $blue;
      }
    }
  }

  .menu-toggle {
    background-color: #303030;
    width: 40px;
    height: 40px;
    position: relative;
    cursor: pointer;

    span {
      position: absolute;
      width: calc(100% - 20px);
      height: 1px;
      background-color: #fff;
      left: 10px;
      right: 10px;
      transition: $transition-base;

      &:first-child {
        top: 12px;
      }

      &:nth-child(2) {
        top: calc(50% - 1px);
      }

      &:last-child {
        bottom: 12px;
      }
    }

    &--active {
      span {
        &:first-child {
          top: calc(50% - 1px);
          transform: rotate(45deg);
        }

        &:nth-child(2) {
          opacity: 0;
        }

        &:last-child {
          bottom: calc(50% - 1px);
          transform: rotate(-45deg);
        }
      }
    }
  }

  &__menu-wrap {
    @media screen and (max-width: 1200px) {
      position: fixed;
      top: 0;
      bottom: 0;
      left: -100%;
      width: 100%;
      max-width: 250px!important;
      transition: $transition-base;
      z-index: 99;
      background-color: #efefef;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &--active {
        left: 0;
      }
    }
  }
}

</style>