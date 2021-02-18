<template>
  <b-container class="d-flex flex-column justify-content-center align-items-center">
    <h1 class="h1-404">404</h1>
    <p class="msg-404">
      Страница не найдена
    </p>
    <router-link :to="{name: 'Home'}">
      Вернуться на главную
    </router-link>
  </b-container>
</template>

<script>
export default {
  name: "NotFound"
}
</script>

<style>
.h1-404 {
  font-size: 65px;
}
.msg-404 {
  font-size: 30px;
}
</style>