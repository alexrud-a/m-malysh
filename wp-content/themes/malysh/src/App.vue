<template>
  <div id="app">
    <Preloader :isLoad="isLoad"/>
    <Header/>
    <transition name="slide">
      <router-view class="content"/>
    </transition>
    <Footer/>
  </div>
</template>

<script>

import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import Preloader from "@/components/layouts/Preloader";

export default {
  name: 'App',
  data() {
    return {
      isLoad: false,
    }
  },
  components: {Preloader, Footer, Header},
  created() {
    this.isLoad = true;
  }
}
</script>

<style lang="scss">
.content {
  flex: 1 0 auto;
}
</style>
