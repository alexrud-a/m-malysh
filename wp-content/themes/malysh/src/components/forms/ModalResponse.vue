<template>
    <b-container>
      <h4 class="text-center">
        {{ msg }}
      </h4>
    </b-container>
</template>

<script>
export default {
  name: "ModalResponse",
  props: {
    msg: {
      type: String,
      default() {
        return ''
      }
    }
  }
}
</script>

<style scoped>

</style>