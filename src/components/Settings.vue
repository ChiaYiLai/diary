<script setup lang="ts">
import { ref } from 'vue'
import { useMainStore } from '../stores/mainStore'
const main = useMainStore()
const fileInput = ref<HTMLInputElement | null>(null)

const themes: string[] = ['dark', 'blue']
const backupLocalStorage = () => {
    const data = JSON.stringify(localStorage, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'diary.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}
const restoreLocalStorage = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
        try {
            const data = JSON.parse(reader.result as string)
            Object.keys(data).forEach((key) => {
                localStorage.setItem(key, data[key])
            })
            location.reload()
        } catch (error) {}
    }
    reader.readAsText(file)
}
const triggerFileInput = () => {
    fileInput.value?.click()
}
const changeTheme = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
}
</script>

<template lang="pug">
.modal(v-if="main.isSettings" @click="main.isSettings = false")
    .modal-content(@click.stop)
        h2.text-gradient Settings
        ul.list-settings
            li
                label Diary Title
                input(v-model="main.diaryTitle")
            li
                label Show Ages
                .switch
                    input(type="checkbox" id="show-age" v-model="main.isAge")
                    label(for="show-age")
            li
                label Read Mode
                .switch
                    input(type="checkbox" id="read-mode" v-model="main.isReadMode")
                    label(for="read-mode")
            li
                label Auto Save
                .switch
                    input(type="checkbox" id="auto-save" v-model="main.isAutoSave")
                    label(for="auto-save")
            li
                label Theme
                ul.list-themes
                    li(v-for="theme in themes" :key="theme" :class="theme")
                        button(@click="changeTheme(theme)")
                        
</template>

<style scoped lang="sass"></style>
