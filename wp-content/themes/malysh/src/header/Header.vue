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
          <a href="#"
             class="header__phone-link"
          >
            +7 (961) 109-00-39
          </a>
        </b-col>
        <b-col md="4" class="text-center">
          <b-link href="/">
            <img :src="siteInfo.logo"
                 class="img-fluid mb-2"
                 width="300"
            />
          </b-link>
          <p class="header__desc mb-0">
            {{siteInfo.desc}}
          </p>
        </b-col>
        <b-col md="4"
               class="d-flex align-items-center justify-content-between"
        >
          <b-form class="header__search-form"
                  role="search"
                  method="get"
                  action="https://m-malysh.ru/"
          >
            <b-form-row class="flex-nowrap position-relative">
              <b-form-input type="search"
                            placeholder="Поиск по сайту"
                            name="s"
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
          <b-link href="#"
             class="header__wishlist"
          >
            <svg width="25" height="25">
              <use xlink:href="/wp-content/themes/malysh/img/sprite.svg#like"/>
            </svg>
          </b-link>
          <b-link href="#"
             class="header__cart"
          >
            <svg width="25" height="25">
              <use xlink:href="/wp-content/themes/malysh/img/sprite.svg#shopping-bag"/>
            </svg>
          </b-link>
        </b-col>
      </b-row>
    </b-container>
    <b-container>
      <b-nav class="border-top border-bottom border-gray header__menu justify-content-around">
        <b-nav-item
            v-for="(link, ind) in this.menu"
            :key="ind"
            :href="link.url"
            class="header__menu-item"
        >
          {{link.title}}
        </b-nav-item>
      </b-nav>
    </b-container>
  </header>
</template>

<script>
import axios from 'axios';

export default {
  name: "Header",
  data() {
    return {
      siteInfo: '',
      menu: [],
    }
  },
  methods: {
    getContent() {
      return axios('https://m-malysh.ru/wp-json/wp-api-menus/v2/menus/2', {
        method: "GET"
      })
          .then((response) => {
            console.log(response)
            this.menu = response.data.items;
          })
          .catch((error) => {
            console.log(error);
            return error;
          })
    },
  },
  created() {
    this.siteInfo = window.siteInfo;
    this.getContent();
  }
}
</script>

<style lang="scss">
.header {
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
    font-weight: bold;
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
    box-shadow: none!important;
  }

  &__menu {
    text-align: center;

    &-item {
      a {
        font-size: 18px;
        color: #000;
      }
    }
  }
}
</style>