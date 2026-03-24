import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const colors = [
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
    'slate',
    'gray',
    'zinc',
    'neutral',
    'stone',
    'taupe',
    'mauve',
    'mist',
    'olive',
  ]

  const primary = ref(localStorage.getItem('primary') ?? 'taupe')

  watch(primary, color => {
    localStorage.setItem('primary', color)
  })

  const setColor = (color: string) => {
    if (colors.includes(color)) {
      primary.value = color
    }
  }

  return { colors, primary, setColor }
})
