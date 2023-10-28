import {defineStore} from "pinia";
import type {Ref} from "vue";
import {ref} from "vue";
import {useRouter} from "vue-router";
import type {Note} from "./models/Note";

export const useNoteStore = defineStore('noteStore', () => {
    const router = useRouter();

    const notes: Ref<Note[]> = ref([{id: 1, title: 'Example title', content: 'example content'}]);
    const selectedNote: Ref<Note | null> = ref(null);
    const isEditingTitle = ref(false);
    const inputTitle = ref('');

    const getNotes = () => {
        const localNotes = localStorage.getItem('notes');
        if (localNotes && JSON.parse(localNotes).length > 0) {
            notes.value = JSON.parse(localNotes);
        }
    };

    const selectNote = (id: number) => {
        try {
            // I'm used to using for, because it's obviously faster than the better-read find
            for (let i = 0; notes.value; i++) {
                if (notes.value[i].id === id) {
                    selectedNote.value = notes.value[i];
                    break;
                }
            }
        } catch (e) {
            router.push('/');
        }
    };

    const createNote = () => {
        const note = {
            id: Date.now(),
            title: 'Title',
            content: ' '
        };

        notes.value.push(note);

        saveNotes();

        router.push(`/${note.id}`);
    };

    const deleteNote = () => {
        notes.value = notes.value.filter(note => note.id !== selectedNote?.value?.id);
        selectedNote.value = null;
        saveNotes();
        router.push('/');
    };

    const saveNotes = () => {
        localStorage.setItem('notes', JSON.stringify(notes.value));
    };

    const editTitle = () => {
        if (selectedNote.value) {
            inputTitle.value = selectedNote.value.title;
            changeEditingTitle();
        }
    };

    const cancelEditTitle = () => {
      inputTitle.value = '';
      changeEditingTitle();
    };

    const changeEditingTitle = () => {
        isEditingTitle.value = !isEditingTitle.value;
    };

    const saveTitle = () => {
        if (selectedNote.value) {
            selectedNote.value.title = inputTitle.value;
            changeEditingTitle();
            saveNotes();
        }
    };

    return {
        notes,
        selectedNote,
        selectNote,
        createNote,
        deleteNote,
        getNotes,
        saveNotes,
        isEditingTitle,
        saveTitle,
        inputTitle,
        cancelEditTitle,
        editTitle
    }
});
