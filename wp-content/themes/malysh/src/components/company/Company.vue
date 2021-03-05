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
      <b-col xl="7" lg="8" md="12">
        <h1>
          {{ title }}
        </h1>
        <div v-if="content.length > 0" v-html="content">
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
  name: "Company",
  components: {Form},
  data() {
    return {
      title: '',
      content: [],
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
      return axios('https://m-malysh.ru/wp-json/wp/v2/pages/73', {
        method: "GET"
      })
          .then((response) => {
            this.title = response.data.title.rendered;
            this.content = response.data.content.rendered;
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