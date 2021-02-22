<template>
  <div class="w-100">
    <b-link v-b-modal.tabel-size class="modal-sizes">
      Таблица размеров
    </b-link>
    <b-modal id="tabel-size" size="xl" centered hide-footer title="Таблица размеров">
      <b-container>
        <div v-html="content"></div>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TableSize",
  data() {
    return {
      content: null
    }
  },
  methods: {
    getContent() {
      return axios('https://m-malysh.ru/wp-json/wp/v2/pages/28', {
        method: "GET"
      })
          .then((response) => {
            this.content = response.data.acf.table_sizes;
          })
          .catch((error) => {
            console.log(error);
            return error;
          })
    },
  },
  created() {
    this.getContent()
  }
}
</script>

<style scoped>

</style>