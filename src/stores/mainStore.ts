import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useMainStore = defineStore('main', () => {
    const isSettings = ref(false)
    const isAbout = ref(false)
    const isAge = ref(true)
    const isReadMode = ref(false)
    const diaryTitle = ref(localStorage.getItem('diaryTitle') || 'Local Diary')

    watch(diaryTitle, (newVal) => {
        localStorage.setItem('diaryTitle', newVal)
    })

    return { isSettings, isAbout, isAge, isReadMode, diaryTitle }
})
