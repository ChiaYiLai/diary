<script setup lang="ts">
import { ref } from 'vue'
import { useMainStore } from '../stores/mainStore'
</script>

<template lang="pug">
.modal.modal-about(v-if="useMainStore().isAbout" @click="useMainStore().isAbout = false")
    .modal-content(@click.stop)
        h2#text-logo About Local Diary
        ul.list-about
            li
                h3 Privacy
                p Saved to your local file
                p No login required
            li
                h3 Fast
                p Minimalist design
                p Loads all diaries at once
            li
                h3 Birthday
                p Show someone's age on the current day
            li
                h3 History
                p Show diaries from the same day in other years
</template>

<style scoped lang="sass"></style>
