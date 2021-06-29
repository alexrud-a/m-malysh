<template>
  <footer id="footer" class="footer">
    <div class="footer__top">
      <b-container>
        <b-row>
          <b-col md="4">
            <router-link :to="{name: 'Home'}">
              <img :src="siteInfo.logo"
                   class="img-fluid mb-2"
                   width="220"
              />
            </router-link>
            <div class="contacts">
              <div class="contacts__item">
                <a :href="'tel:'+contacts.phone">
                  <svg width="20" height="20">
                    <use xlink:href="/wp-content/themes/malysh/img/sprite.svg#phone-call"/>
                  </svg>
                  {{ contacts.phone }}
                </a>
              </div>
              <div class="contacts__item">
                <a :href="'mailto:'+contacts.email">
                  <svg width="20" height="20">
                    <use xlink:href="/wp-content/themes/malysh/img/sprite.svg#mail"/>
                  </svg>
                  {{ contacts.email }}
                </a>
              </div>
              <div class="contacts__item">
                <span>
                  <svg width="20" height="20">
                    <use xlink:href="/wp-content/themes/malysh/img/sprite.svg#time"/>
                  </svg>
                  {{ contacts.time }}
                </span>
              </div>
            </div>
            <router-link
                :to="{name: 'Support'}"
                class="btn btn-blue-outline"
            >
              Служба поддержки
            </router-link>
          </b-col>
          <b-col md="4" class="align-self-center">
            <b-nav vertical class="footer__menu">
              <li v-for="(link, ind) in this.menu"
                  :key="ind"
                  class="nav-item footer__menu-item"
              >
                <router-link
                    :to="link.url"
                    class="nav-link"
                >
                  {{link.title}}
                </router-link>
              </li>
            </b-nav>
          </b-col>
          <b-col md="4">
            <h3>
              Оплата
            </h3>
            <b-row>
              <b-col lg="6" md="6" sm="6" class="mb-2 w-sm-50">
                <b-img src="/wp-content/themes/malysh/img/pay.png"/>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="footer__copyright">
      <b-container>
        (C) 2014-{{ date.getFullYear() }}. Моему малышу
      </b-container>
    </div>
  </footer>
</template>

<script>
import axios from "axios";

export default {
  name: "Footer",
  data() {
    return {
      siteInfo: '',
      contacts: [],
      menu: [],
      date: new Date(),
    }
  },
  methods: {
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
    getMenu() {
      return axios('https://m-malysh.ru/wp-json/wp-api-menus/v2/menus/22', {
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
  },
  created() {
    this.siteInfo = window.siteInfo;
    this.getContacts();
    this.getMenu();
  }
}
</script>

<style lang="scss">
.footer {
  flex: 0 0 auto;
  background-color: #e6e6e6;

  &__top {
    padding: 60px 0 40px;
  }

  .contacts {
    margin: 20px 0;

    &__item {
      margin-bottom: 15px;

      a, span {
        display: flex;
        align-items: center;
        color: #303030;
        text-decoration: none;

        svg {
          fill: #303030;
          margin-right: 15px;
        }

        &:hover {
          color: $blue;
          text-decoration: none;

          svg {
            fill: $blue;
          }
        }
      }
    }
  }

  &__menu {

    @media screen and (max-width: 768px) {
      margin: 20px 0;
    }

    &-item {
      padding: 0;

      a {
        color: #000;

        @media screen and (max-width: 768px) {
          padding: .5rem 0;
        }

        &:hover,
        .router-link-active {
          color: #aaaaaa;
          text-decoration: underline;
        }
      }
    }
  }

  &__copyright {
    background-color: #303030;
    color: #fff;
    padding: 10px 0;
  }
}
</style>