<template>
  <aside class="aside">
    <ul class="notes-list">
      <router-link
          v-for="note in notes"
          :to="`/${note.id}`"
          :class="`note-item ${note.id === noteStore?.selectedNote?.id ? 'note-item-active' : ''}`"
      >
        <li>{{ truncate(note.title) }}</li>
      </router-link>
    </ul>
    <button @click="noteStore.createNote" class="btn-create">
      <IconPlus/>
    </button>
  </aside>
</template>

<script setup lang="ts">
import {computed, onMounted} from "vue";
import {useNoteStore} from "@/stores/noteStore";
import {truncate} from "@/utils/truncate";
import IconPlus from "@/components/icons/IconPlus.vue";

const noteStore = useNoteStore();

const notes = computed(() => {
  return noteStore.notes;
});

onMounted(() => {
  noteStore.getNotes();
});
</script>

<style scoped lang="scss">
.aside {
  border-right: 1px solid #ccc;
  width: 100%;
  max-width: 150px;
}

.btn-create {
  cursor: pointer;
  position: fixed;
  bottom: 10px;
  left: 10px;
  z-index: 1;
  border-radius: 50%;
  background-color: #FBBF24;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  padding: 4px;
  border: none;

  &:hover {
    background-color: darken(#FBBF24, 5%);
  }
}

.notes-list {
  overflow-y: auto;
  max-height: 100vh;
}

.note-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 42px;
  border-radius: 4px;

  &:hover {
    background-color: lighten(#FBBF24, 25%)
  }

  &.note-item-active {
    background-color: lighten(#FBBF24, 6%);
  }
}
</style>