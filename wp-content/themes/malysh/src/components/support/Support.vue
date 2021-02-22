<template>
  <b-container class="pt-5 pb-5">
    <b-row>
      <b-col md="12">
        <b-breadcrumb>
          <b-breadcrumb-item href="/">
            Главная
          </b-breadcrumb-item>
          <b-breadcrumb-item active>
            {{ title }}
          </b-breadcrumb-item>
        </b-breadcrumb>
      </b-col>
      <b-col sm="12" class="mb-2">
        <h1>
          {{ title }}
        </h1>
      </b-col>
      <b-col lg="6" class="support">
        <Form/>
      </b-col>
      <b-col lg="6">
        <div v-if="content.length > 0" v-html="content" class="mb-4">
        </div>
      </b-col>
      <b-col sm="12">
        <h2>
          Возврат товара
        </h2>
        <p>
          Пожалуйста, заполните форму на возврат товара
        </p>
        <b-btn class="btn btn-blue mb-4"
               v-b-toggle="'collapse-form'"
        >
          Вернуть товар
        </b-btn>
        <b-collapse id="collapse-form" class="collapse-form">
          <b-row>
            <b-col lg="6">
              <FormRefund/>
            </b-col>
          </b-row>
        </b-collapse>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
import Form from "@/components/forms/Form";
import FormRefund from "@/components/forms/FormRefund";

export default {
  name: "Support",
  components: {FormRefund, Form},
  data() {
    return {
      title: '',
      content: [],
    }
  },
  metaInfo() {
    return {
      title: this.title,
    }
  },
  methods: {
    getContent() {
      return axios('https://m-malysh.ru/wp-json/wp/v2/pages/70', {
        method: "GET"
      })
          .then((response) => {
            this.title = response.data.title.rendered;
            this.content = response.data.content.rendered;
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

<style>

</style>