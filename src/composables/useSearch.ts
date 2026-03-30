export function useSearch() {
  const { diaries } = storeToRefs(useDiaryStore())

  const keyword = ref('')

  const results = computed(() => {
    if (!keyword.value.trim()) return []
    const k = keyword.value.toLowerCase()
    return diaries.value.filter(d => d.diary.toLowerCase().includes(k)).sort((a, b) => b.date.localeCompare(a.date))
  })

  return { keyword, results }
}
