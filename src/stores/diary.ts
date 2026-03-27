import dayjs from 'dayjs'
export const useDiaryStore = defineStore('diary', () => {
  const diaries = ref<Diary[]>([])
  const annals = ref<Annals[]>([])
  const isModalDiary = ref<boolean>(false)
  const isModalAnnals = ref<boolean>(false)
  const currentMonth = ref<string>(dayjs().format('YYYY-MM'))
  const currentYear = ref<string>(dayjs().format('YYYY'))
  const currentAnnals = ref('')
  const currentDay = ref<string>('')

  function loadFromJson(data: DiaryData) {
    diaries.value = data.diaries ?? []
    annals.value = data.annals ?? []
  }

  function exportJson(): DiaryData {
    return {
      diaries: diaries.value,
      annals: annals.value,
    }
  }

  // --- Diary ---
  function getDiary(date: string) {
    return diaries.value.find(d => d.date === date)?.diary ?? ''
  }

  function setDiary(date: string, content: string) {
    const index = diaries.value.findIndex(d => d.date === date)
    if (content.trim() === '') {
      if (index !== -1) diaries.value.splice(index, 1)
    } else if (index !== -1) {
      diaries.value[index].diary = content
    } else {
      diaries.value.push({ date, diary: content })
    }
    isModalDiary.value = false
  }
  const diaryMap = computed(() => Object.fromEntries(diaries.value.map(d => [d.date, d.diary])))
  const sortedDiaries = computed(() => [...diaries.value].sort((a, b) => b.date.localeCompare(a.date)))

  // --- Annals ---
  function getAnnals(year: string) {
    return annals.value.find(a => a.year === year)?.content ?? ''
  }

  function setAnnals(year: string, content: string) {
    const index = annals.value.findIndex(a => a.year === year)
    if (content.trim() === '') {
      if (index !== -1) annals.value.splice(index, 1)
    } else if (index !== -1) {
      annals.value[index].content = content
    } else {
      annals.value.push({ year, content })
    }
    isModalAnnals.value = false
  }

  const sortedAnnals = computed(() => [...annals.value].sort((a, b) => b.year.localeCompare(a.year)))

  const handleEditDiary = (date: string = dayjs().format('YYYY-MM-DD')) => {
    currentDay.value = date
    isModalDiary.value = true
  }
  const handleEditAnnals = (year: string = dayjs().format('YYYY')) => {
    currentAnnals.value = year
    isModalAnnals.value = true
  }
  const randomDiary = () => {
    if (!diaries.value.length) return
    const index = Math.floor(Math.random() * diaries.value.length)
    handleEditDiary(diaries.value[index].date)
  }

  return {
    diaries,
    annals,
    loadFromJson,
    exportJson,
    getDiary,
    setDiary,
    sortedDiaries,
    getAnnals,
    setAnnals,
    sortedAnnals,
    diaryMap,
    handleEditDiary,
    handleEditAnnals,
    currentDay,
    currentMonth,
    currentYear,
    currentAnnals,
    isModalDiary,
    isModalAnnals,
    randomDiary,
  }
})
