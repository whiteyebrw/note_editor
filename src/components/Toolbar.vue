<template>
  <div id="my-toolbar">
    <select class="ql-font">
      <option value="sans-serif" selected></option>
      <option value="serif"></option>
      <option value="monospace"></option>
    </select>

    <select class="ql-size">
      <option value="small"></option>
      <option selected></option>
      <option value="large"></option>
      <option value="huge"></option>
    </select>

    <button class="ql-bold"></button>
    <button class="ql-italic"></button>
    <button class="ql-image"></button>

    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css';
</script>



