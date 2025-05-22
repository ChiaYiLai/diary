<script setup lang="ts">
import { ref } from 'vue'
import { useMainStore } from '../stores/mainStore'
const main = useMainStore()
</script>

<template lang="pug">
.modal.modal-about(v-if="main.isAbout" @click="main.isAbout = false")
    .modal-content(@click.stop)
        h2.text-gradient About Local Diary
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
        footer.footer-about
            a(href="https://chiayilai.github.io/resume/" target="_blank")
                address Developed by Chia Yi Lai
</template>

<style scoped lang="sass"></style>
