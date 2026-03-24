import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useMainStore = defineStore('main', () => {
  const fileHandle = ref<FileSystemFileHandle | null>(null)
  const fileInfo = ref<{ name: string; lastModified: number; size: number } | null>(null)
  const isFileLoaded = ref(false)
  const viewMode = ref(localStorage.getItem('viewMode') || 'Month')
  const isSettings = ref(false)
  const isAbout = ref(false)
  const isAge = ref(true)
  const isAutoSave = ref(false)
  const diaryTitle = ref(localStorage.getItem('diaryTitle') || 'Diary')

  watch(diaryTitle, newVal => {
    localStorage.setItem('diaryTitle', newVal)
  })
  watch(viewMode, newVal => {
    localStorage.setItem('viewMode', newVal)
  })

  return { fileHandle, fileInfo, isFileLoaded, viewMode, isSettings, isAbout, isAge, isAutoSave, diaryTitle }
})
