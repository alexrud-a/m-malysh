<template>
  <div id="app">
    <Header/>
    <transition name="fade">
      <router-view class="content"/>
    </transition>
    <Footer/>
  </div>
</template>

<script>

import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

export default {
  name: 'App',
  components: {Footer, Header}
}
</script>

<style lang="scss">
.content {
  flex: 1 0 auto;
}
</style>
