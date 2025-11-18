<script setup>
import { BApp } from 'bootstrap-vue-next';

</script>

<template>
  <div style="background-color: black; overflow: scroll;" class="hide-scrollbar">
    <div style="width: 100%; height: 15vh; text-align: center; padding-top: 0.4rem;">
      <img height="100%" src="/5f7961c913263cd7a5d85b93e1c99b8b.jpg" />
    </div>
    <BApp>
      <router-view/>
    </BApp>
  </div>
</template>

<style scoped>
.hide-scrollbar {

    /* Hide scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}
</style>
