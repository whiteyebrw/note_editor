<template>
  <div class="page">
    <Aside />
    <router-view />
  </div>

</template>

<script setup lang="ts">
import Aside from "@/components/Aside.vue";
</script>

<style scoped lang="scss">
.page {
  display: flex;
  height: 100vh;
  overflow: hidden;
}
</style>