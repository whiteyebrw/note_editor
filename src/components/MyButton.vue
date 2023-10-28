<template>
  <button :style="{ backgroundColor: color }" class="btn">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    required: true
  }
});
</script>

<style scoped lang="scss">
.btn {
  border: none;
  border-radius: 4px;
  width: 100%;
  max-width: 80px;
  color: #FFFFFF;
}
</style>