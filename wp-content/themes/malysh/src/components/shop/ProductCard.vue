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
             class="product__img"
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
    <div class="product-card__price" v-html="product.price_html"></div>
    <b-btn class="product-card__wishlist">
      <svg width="15" height="15">
        <use xlink:href="/wp-content/themes/malysh/img/sprite.svg#like"></use>
      </svg>
    </b-btn>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>

</style>