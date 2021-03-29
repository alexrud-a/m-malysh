<template>
  <b-container class="pt-5 pb-5">
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
      <b-col xl="7" lg="8" md="12" class="mb-5">
        <h1>
          {{ title }}
        </h1>
        <div v-if="content.length > 0" v-html="content" class="mb-4">
        </div>
        <div v-for="(tab, ind) in tabs"
             :key="ind"
             class="tabs-collapse"
        >
          <b-link v-b-toggle="'collapse-'+ind" class="tabs-collapse__link">
            <svg width="10" height="10">
              <use xlink:href="/wp-content/themes/malysh/img/sprite.svg#right-arrow"/>
            </svg>
            <span>
                {{ tab.title }}
              </span>
          </b-link>
          <b-collapse :id="'collapse-'+ind" class="pt-4">
            <div v-html="tab.text"></div>
          </b-collapse>
        </div>
      </b-col>
      <b-col xl="5" lg="4" md="12">
        <Form/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
import Form from "@/components/forms/Form";

export default {
  name: "Info",
  components: {Form},
  data() {
    return {
      title: '',
      content: [],
      tabs: [],
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
      return axios('https://m-malysh.ru/wp-json/wp/v2/pages/66', {
        method: "GET"
      })
          .then((response) => {
            this.title = response.data.title.rendered;
            this.content = response.data.content.rendered;
            this.tabs = response.data.acf.tabs;
            this.meta = response.data.yoast_meta;
            this.metaTitle = response.data.yoast_title;
            this.$emit('loaded', true)
          })
          .catch((error) => {
            console.log(error);
            return error;
          })
    },
  },
  created() {
    this.$emit('loaded', false)
    this.getContent();
  }
}
</script>

<style>

</style>