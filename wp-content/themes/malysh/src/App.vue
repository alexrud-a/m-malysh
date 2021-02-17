<template>
  <div id="app">
    <Header/>
    <transition>
      <router-view/>
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
#app {
  flex: 1 0 auto;
}
</style>
