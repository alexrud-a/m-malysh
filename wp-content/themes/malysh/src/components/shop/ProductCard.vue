<template>
  <div class="product-card">
    <router-link :to="{name: 'Product', params: {slug: product.slug}}">
      <b-img v-if="product.images.length > 0"
             :src="product.images[0].src"
             :alt="product.images[0].alt"
             class="product-card__img"
      />
      <b-img v-else
             src="/wp-content/plugins/woocommerce/assets/images/placeholder.png"
             class="product-card__img"
      />
      <b-badge v-if="product.on_sale" variant="danger" class="product-card__badge">
        Акция
      </b-badge>
    </router-link>
    <div v-if="product.sku.length"
         class="product-card__article"
    >
      Код товара: {{ product.sku }}
    </div>
    <router-link :to="{name: 'Product', params: {slug: product.slug}}"
                 class="product-card__title"
    >
      {{ product.name }}
    </router-link>
    <div class="product-card__price"
         v-html="price()">
    </div>
    <b-btn class="btn-transparent product-card__wishlist"
           :class="{'product-card__wishlist--add' : isWishList}"
           @click="changeWishList"
    >
      <svg width="15" height="15" v-if="!isWishList">
        <use xlink:href="/wp-content/themes/malysh/img/sprite.svg#like"></use>
      </svg>
      <svg width="15" height="15" v-else>
        <use xlink:href="/wp-content/themes/malysh/img/sprite.svg#like-add"></use>
      </svg>
    </b-btn>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {formattedPrice} from "@/utils";
import {WooCommerce} from "@/consts";

export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      variations: []
    }
  },
  filters: {
    formattedPrice
  },
  computed: {
    ...mapGetters([
      'WISHLIST',
      'USER'
    ]),
    isWishList() {
      return [...this.WISHLIST].find(item => item.id === this.product.id) !== undefined ? true : false;
    },
  },
  methods: {
    changeWishList() {
      this.$emit('changeWishList', this.product);
    },
    price() {
      let price;
      if (this.USER.ID && this.USER.roles.findIndex(role => role === 'opt_customer') !== -1) {
        if (this.product.type === 'variable') {
          if(this.product.meta_data.findIndex(item => item.key === 'wholesale_customer_variations_with_wholesale_price') !== -1) {
            let priceMin = Math.min(...this.variations.slice().map(product => product.meta_data.filter(meta => meta.key === 'wholesale_customer_wholesale_price')[0].value));
            let priceMax = Math.max(...this.variations.slice().map(product => product.meta_data.filter(meta => meta.key === 'wholesale_customer_wholesale_price')[0].value));
            if (priceMin && priceMax) {
              if(priceMin !== priceMax) {
                price = formattedPrice(priceMin) + ' ₽ – ' + formattedPrice(priceMax)+ ' ₽';
              } else {
                price = formattedPrice(priceMin) + ' ₽';
              }
            }
          } else {
            price = this.product.price_html;
          }
        } else {
          if (this.product.meta_data.findIndex(item => item.key === 'wholesale_customer_wholesale_price') !== -1) {
            price = formattedPrice(
                this.product.meta_data
                    .filter(item => item.key === 'wholesale_customer_wholesale_price')[0].value
            ) + ' ₽';
          } else {
            price = this.product.price_html;
          }
        }

      } else {
        price = this.product.price_html;
      }

      return price
    }
  },
  created() {
    if(this.product.type === 'variable') {
      WooCommerce.get('products/' + this.product.id + '/variations')
          .then((response) => {
            this.variations = response.data;
            return response;
          })
          .catch((error) => {
            console.log(error);
            return error;
          });
    }
  }
}
</script>

<style lang="scss">
.product-card {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 40px;
  position: relative;

  &__badge {
    position: absolute;
    top: 15px;
    left: 15px;
  }

  &__img {
    width: 100%;
    height: 280px;
    object-fit: cover;
    object-position: center;
    margin-bottom: 25px;
  }

  &__article {
    width: 100%;
    color: #aaaaaa;
    font-size: 16px;
    margin-bottom: 10px;
  }

  &__title {
    width: 100%;
    color: #000;
    font-size: 20px;
    font-weight: $font-weight-bold;

    &:hover {
      color: $blue;
      text-decoration: none;
    }
  }

  &__price {
    font-size: 16px;
    font-weight: $font-weight-bold;
    font-family: sans-serif;
  }

  &__wishlist {
    background-color: transparent;
    padding: 0;
    border: none;

    &:hover, &:focus, &:active {
      box-shadow: none;
      background-color: transparent;
    }

    &--add {
      svg {
        fill: $blue;
      }
    }
  }
}
</style>