import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useMainStore = defineStore('main', () => {
  const fileHandle = ref<FileSystemFileHandle | null>(null)
  const fileInfo = ref<{ name: string; lastModified: number; size: number } | null>(null)
  const viewMode = ref(localStorage.getItem('viewMode') || 'month')
  const isSettings = ref(false)
  const isAbout = ref(false)
  const isAge = ref(true)
  const isAutoSave = ref(false)
  const diaryTitle = ref(localStorage.getItem('diaryTitle') || 'Diary')
  const isDark = ref(
    localStorage.getItem('dark') !== null ? localStorage.getItem('dark') === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches,
  )

  watch(diaryTitle, newVal => {
    localStorage.setItem('diaryTitle', newVal)
  })
  watch(viewMode, newVal => {
    localStorage.setItem('viewMode', newVal)
  })
  watch(
    isDark,
    newVal => {
      localStorage.setItem('dark', String(newVal))
      document.documentElement.classList.toggle('dark', newVal)
    },
    { immediate: true },
  )

  return { fileHandle, fileInfo, viewMode, isSettings, isAbout, isAge, isAutoSave, diaryTitle, isDark }
})
