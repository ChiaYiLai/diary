<script setup lang="ts">
import { ref } from 'vue'
import { useMainStore } from '../stores/mainStore'
</script>

<template lang="pug">
.modal(v-if="useMainStore().isAbout" @click="useMainStore().isAbout = false")
    .modal-content(@click.stop)
        h2 About Local Diary
        ul.list-about
            li
                h3 Privacy
                p Stored locally, no login required
            li
                h3 Fast
                p Minimalist design, loads all diaries at once
            li
                h3 Backup
                p Can export files for backup, import to other devices
            li
                h3 Birthday
                p Can display someone's age on the current day
            li
                h3 History
                p Can display diaries from the same day in other years
</template>

<style scoped lang="sass"></style>
