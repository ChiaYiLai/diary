<script setup lang="ts">
const props = defineProps<{
    isBrowserSupport: boolean
    isFileLoaded: boolean
    loadDiary: () => void
    createDiary: () => void
}>()
</script>

<template lang="pug">
.modal.modal-unsupport(v-if="!isBrowserSupport")
    .modal-content
        h2 Oops!
            br
            | Your browser doesn’t support this feature.
            br
            | Please switch to Chrome on desktop or Android.
.modal.modal-init(v-else-if="!props.isFileLoaded")
    .modal-content
        h2 Load or Create Diary
        ul.list-btns
            li
                button(@click="props.loadDiary") Load
            li
                button(@click="props.createDiary") Create
</template>

<style scoped lang="sass"></style>
