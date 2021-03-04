<template>
  <b-container>
    <b-row>
      <b-col sm="12">
        <h1>
          Личный кабинет
        </h1>
        <h2>
          Здравствуйте, {{USER.data.display_name}}
        </h2>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Profile",
  computed: {
    ...mapGetters([
      'USER'
    ]),
  },
}
</script>

<style scoped>

</style>