<template>
  <div class="preloader-wrap" :class="{'d-none' : isLoad}">
    <BreedingRhombusSpinner
        :animation-duration="1000"
        :size="60"
        :color="'#0abab5'"
    />
  </div>
</template>

<script>
import {BreedingRhombusSpinner} from 'epic-spinners';

export default {
  name: "Preloader",
  props: {
    isLoad: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  components: {
    BreedingRhombusSpinner
  }
}
</script>

<style>
.preloader-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  z-index: 99999;
  overflow: hidden;
}
</style>