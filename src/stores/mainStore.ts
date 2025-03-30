import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMainStore = defineStore('main', () => {
    const isSettings = ref(false)
    const isAbout = ref(false)
    const isAge = ref(true)

    return { isSettings, isAbout, isAge }
})
