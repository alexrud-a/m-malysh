<template>
  <b-container>
    <b-row>
      <b-col sm="12">
        <b-breadcrumb>
          <b-breadcrumb-item href="/">
            Главная
          </b-breadcrumb-item>
          <b-breadcrumb-item active>
            {{ title }}
          </b-breadcrumb-item>
        </b-breadcrumb>
      </b-col>
      <b-col sm="12" class="mb-4">
        <h1>
          {{ title }}
        </h1>
        <div v-if="content.length > 0" v-html="content" class="mb-4"></div>
      </b-col>
    </b-row>
  </b-container>
  <div class="sale">
    <b-container>
      <b-row>
        <b-col md="6"
               v-for="(sale, ind) in sales"
               :key="ind"
        >
          <div class="sale-card" :style="'background-image: url(' + sale.img +')'">
            <p class="sale-card__title">
              {{ sale.title }}
            </p>
            <b-link :href="sale.link"
                    class="btn btn-blue">
              Смотреть
            </b-link>
            <span v-if="sale.date"
                  class="sale-card__date"
            >
              {{ sale.date }}
            </span>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Sales",
  data() {
    return {
      title: '',
      content: [],
      sales: [],
      meta: [],
      metaTitle: '',
    }
  },
  metaInfo() {
    return {
      title: this.metaTitle,
      meta: this.meta,
    }
  },
  methods: {
    getContent() {
      return axios('https://m-malysh.ru/wp-json/wp/v2/pages/75', {
        method: "GET"
      })
          .then((response) => {
            this.title = response.data.title.rendered;
            this.content = response.data.content.rendered;
            this.sales = response.data.acf.sales;
            this.meta = response.data.yoast_meta;
            this.metaTitle = response.data.yoast_title;
          })
          .catch((error) => {
            console.log(error);
            return error;
          })
    },
  },
  created() {
    this.getContent();
  }
}
</script>

<style scoped>

</style>