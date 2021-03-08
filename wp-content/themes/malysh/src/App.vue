<template>
  <div id="app">
    <Preloader :isLoad="isLoad"/>
    <Header/>
    <transition name="slide">
      <keep-alive>
        <router-view class="content"/>
      </keep-alive>
    </transition>
    <Footer/>
  </div>
</template>

<script>

import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import Preloader from "@/components/layouts/Preloader";
import imagesLoaded from 'vue-images-loaded';

export default {
  name: 'App',
  directives: {
    imagesLoaded
  },
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
