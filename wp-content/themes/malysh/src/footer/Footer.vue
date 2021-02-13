<template>
  <footer id="footer" class="footer">
    <div class="footer__top">
      <b-container>
        <b-row>
          <b-col md="4">
            <b-link href="/">
              <img :src="siteInfo.logo"
                   class="img-fluid mb-2"
                   width="220"
              />
            </b-link>
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
            <b-link
                href="/support"
                class="btn btn-blue-outline"
            >
              Служба поддержки
            </b-link>
          </b-col>
          <b-col md="4" class="align-self-center">
            <b-nav vertical class="footer__menu">
              <b-nav-item
                  v-for="(link, ind) in this.menu"
                  :key="ind"
                  :href="link.url"
                  class="footer__menu-item"
              >
                {{ link.title }}
              </b-nav-item>
            </b-nav>
          </b-col>
          <b-col md="4">
            <h3>
              Мы в INSTAGRAM
            </h3>
            <b-row>
              <b-col md="3" class="mb-2">
                <b-img thumbnail src="https://picsum.photos/125/125/?image=58"/>
              </b-col>
              <b-col md="3" class="mb-2">
                <b-img thumbnail src="https://picsum.photos/125/125/?image=58"/>
              </b-col>
              <b-col md="3" class="mb-2">
                <b-img thumbnail src="https://picsum.photos/125/125/?image=58"/>
              </b-col>
              <b-col md="3" class="mb-2">
                <b-img thumbnail src="https://picsum.photos/125/125/?image=58"/>
              </b-col>
              <b-col md="3" class="mb-2">
                <b-img thumbnail src="https://picsum.photos/125/125/?image=58"/>
              </b-col>
              <b-col md="3" class="mb-2">
                <b-img thumbnail src="https://picsum.photos/125/125/?image=58"/>
              </b-col>
              <b-col md="3" class="mb-2">
                <b-img thumbnail src="https://picsum.photos/125/125/?image=58"/>
              </b-col>
              <b-col md="3" class="mb-2">
                <b-img thumbnail src="https://picsum.photos/125/125/?image=58"/>
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
$blue: #0abab5;
.footer {
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
    &-item {
      padding: 0;

      a {
        color: #000;

        &:hover {
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