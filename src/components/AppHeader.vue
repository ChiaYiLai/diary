<template>
  <header class="bg-white relative flex gap-4 items-center justify-between pl-2 pr-4 py-2 relative z-9" :class="`text-${c}-500`">
    <div class="flex items-center">
      <Btn v="none" size="icon">
        <span class="material-symbols-rounded" @click="mainStore.isSettings = true">notes</span>
      </Btn>
      <h1 v-if="fileInfo" class="text-xl capitalize ml-2">{{ fileInfo.name.replace(/\.[^.]+$/, '') }}</h1>
    </div>
    <div class="absolute left-1/2 top-1/2 -translate-1/2 flex items-center justify-center">
      <DateControl v-if="viewMode === 'month'" @prev="changeMonth(-1)" @next="changeMonth(1)">
        <MonthPicker v-model="currentMonth" />
      </DateControl>
      <DateControl v-if="viewMode === 'year'" @prev="changeYear(-1)" @next="changeYear(1)" :heading="currentYear" />
      <h1 v-if="viewMode === 'annals'" class="text-xl">{{ t('annals') }}</h1>
    </div>

    <Tabs
      v-model="viewMode"
      :tabs="[
        { label: t('monthly'), value: 'month' },
        { label: t('yearly'), value: 'year' },
        { label: t('annals'), value: 'annals' },
      ]"
    />
  </header>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import DateControl from './DateControl.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const mainStore = useMainStore()
const { fileInfo, viewMode } = storeToRefs(mainStore)
const diaryStore = useDiaryStore()
const { currentMonth, currentYear, isModalDiary } = storeToRefs(diaryStore)
const themeStore = useThemeStore()
const { primary: c } = storeToRefs(themeStore)

const changeMonth = (dir: 1 | -1) => {
  currentMonth.value = dayjs(currentMonth.value).add(dir, 'month').format('YYYY-MM')
}
const changeYear = (num: number) => {
  currentYear.value = String(Number(currentYear.value) + num)
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))

const handleKeydown = (e: KeyboardEvent) => {
  if (isModalDiary.value) return
  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
  if (e.key === 'ArrowLeft') changeMonth(-1)
  if (e.key === 'ArrowRight') changeMonth(1)
}
</script>
