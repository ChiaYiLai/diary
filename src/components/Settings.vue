<script setup lang="ts">
import { ref } from 'vue'
import { useMainStore } from '../stores/mainStore'

const fileInput = ref<HTMLInputElement | null>(null)

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
        } catch (error) {}
    }
    reader.readAsText(file)
}
const triggerFileInput = () => {
    fileInput.value?.click()
}
</script>

<template lang="pug">
.modal(v-if="useMainStore().isSettings" @click="useMainStore().isSettings = false")
    .modal-content(@click.stop)
        h2 Settings
        ul.list-settings
            li
                label Backup
                button(@click="backupLocalStorage") Backup
            li
                label Import
                button(@click="triggerFileInput") Import
                input(type="file" ref="fileInput" @change="restoreLocalStorage" accept="application/json" style="display: none")
            li
                label Show Ages
                button(@click="useMainStore().isAge = !useMainStore().isAge") {{ useMainStore().isAge ? 'Close' : 'Open' }}
</template>

<style scoped lang="sass"></style>
