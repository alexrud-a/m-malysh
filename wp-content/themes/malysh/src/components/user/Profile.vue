<template>
  <b-container>
    <b-row>
      <b-col sm="12">
        <b-breadcrumb>
          <b-breadcrumb-item href="/">
            Главная
          </b-breadcrumb-item>
          <b-breadcrumb-item active>
            Личный кабинет
          </b-breadcrumb-item>
        </b-breadcrumb>
      </b-col>
    </b-row>
    <b-row v-if="USER.ID">
      <b-col sm="12">
        <h1>
          Личный кабинет
        </h1>
      </b-col>
      <b-col sm="12">
        <h2>
          Здравствуйте, {{USER.data.display_name}}
        </h2>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col md="6" sm="12">
        <Authorization/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {mapGetters} from "vuex";
import Authorization from "@/components/forms/Authorization";

export default {
  name: "Profile",
  components: {Authorization},
  computed: {
    ...mapGetters([
      'USER'
    ]),
  },
}
</script>

<style scoped>

</style>