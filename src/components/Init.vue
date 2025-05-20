<script setup lang="ts">
import { ref } from 'vue'
import { useMainStore } from '../stores/mainStore'
const props = defineProps<{
    isFileLoaded: boolean
    loadDiary: () => void
    createDiary: () => void
}>()
</script>

<template lang="pug">
.modal.modal-init(v-if="!props.isFileLoaded")
    .modal-content
        h2 Load or Create Diary
        ul.list-btns
            li
                button(@click="props.loadDiary") Load
            li
                button(@click="props.createDiary") Create
</template>

<style scoped lang="sass"></style>
