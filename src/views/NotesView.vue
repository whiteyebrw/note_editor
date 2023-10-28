<template>
  <div class="container" v-if="noteStore.selectedNote">
    <div class="header">
      <div v-if="!isEditingTitle" class="header-title">
        <h4>{{ noteStore.selectedNote?.title }}</h4>
        <MyButton @click="noteStore.editTitle" color="#FBBF24">Edit</MyButton>
      </div>

      <div v-else class="header-title">
        <input v-model="noteStore.inputTitle" style="height: 24px">
        <div style="display: flex; gap: 4px">
          <MyButton @click="noteStore.saveTitle" color="#A3E635">Save</MyButton>
          <MyButton @click="noteStore.cancelEditTitle" color="#EF4444">Cancel</MyButton>
        </div>
      </div>
    </div>
    <quill-editor
        theme="snow"
        contentType="html"
        toolbar="#my-toolbar"
        v-model:content="noteStore.selectedNote.content"
        @input="debounceSave"
        placeholder="Type a something..."
    >
      <template #toolbar>
        <Toolbar>
          <button @click="noteStore.deleteNote">
            <IconDelete />
          </button>
        </Toolbar>
      </template>
    </quill-editor>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed, onMounted, watch} from "vue";
import {useNoteStore} from "@/stores/noteStore";
import IconDelete from "@/components/icons/IconDelete.vue";
import {QuillEditor} from "@vueup/vue-quill";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import Toolbar from "@/components/Toolbar.vue";
import {debounce} from "@/utils/debounce";
import MyButton from "@/components/MyButton.vue";

const route = useRoute();
const noteStore = useNoteStore();

const noteId = computed(() => {
  return parseInt(route?.params?.id as string);
});

const isEditingTitle = computed(() => {
  return noteStore.isEditingTitle;
});

watch(noteId, () => {
  if (noteId.value) {
    noteStore.selectNote(noteId.value);
  }
});

onMounted(() => {
  if (noteId.value) {
    noteStore.selectNote(noteId.value);
  }
});

const debounceSave = debounce(noteStore.saveNotes, 1000);
</script>

<style scoped lang="scss">
.container {
  width: 100%;
}

.header {
  max-height: 42px;
  height: 100%;
  padding: 8px;

  & .header-title {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    height: 24px;
  }
}

.content {
  overflow-y: auto;
}
</style>