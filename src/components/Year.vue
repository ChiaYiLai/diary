<template>
  <div class="bg-taupe-100 dark:bg-taupe-900 p-16">
    <div class="grid grid-cols-4 gap-16">
      <div v-for="month in 12" :key="month">
        <h4
          class="w-fit mx-auto text-sm mb-2 px-4 py-2 border border-black/10 dark:border-white/15 hover:border-black/20 dark:hover:border-white/25 rounded-full cursor-pointer transition"
          @click="goMonth(`${currentYear}-${String(month).padStart(2, '0')}`)"
        >
          {{ getMonthName(month) }}
        </h4>
        <div class="grid grid-cols-7 gap-0.5">
          <div v-for="day in weekDays" :key="day" class="text-center text-xs text-black/30 dark:text-white/30 my-4">
            {{ day }}
          </div>
          <div
            v-for="(day, i) in getMonthDays(Number(currentYear), month - 1)"
            :key="i"
            class="aspect-square flex items-center justify-center rounded-full text-xs relative"
          >
            <template v-if="day">
              <button
                @click="day && diaryStore.handleEditDiary(day.date)"
                class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-orange-300 dark:hover:bg-orange-400"
                :class="day.hasDiary ? 'bg-black/8 dark:bg-white/8' : ''"
              >
                {{ day.dateNum }}
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
const { locale } = useI18n()
const { weekDays } = useDate()
const mainStore = useMainStore()
const { viewMode } = storeToRefs(mainStore)
const diaryStore = useDiaryStore()
const { diaryMap, currentYear, currentMonth } = storeToRefs(diaryStore)

const goMonth = (month: string) => {
  currentMonth.value = month
  viewMode.value = 'month'
}

function getMonthDays(year: number, month: number) {
  const start = dayjs().year(year).month(month).startOf('month')
  const days = []

  const firstDay = (start.day() + 6) % 7
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push(null)
  }

  for (let i = 1; i <= start.daysInMonth(); i++) {
    const date = start.date(i)
    const dateStr = date.format('YYYY-MM-DD')
    days.push({ date: dateStr, dateNum: i, isCurrentMonth: true, hasDiary: !!diaryMap.value[dateStr] })
  }

  return days
}

function getMonthName(month: number) {
  const date = new Date(2000, month - 1, 1)
  return new Intl.DateTimeFormat(locale.value, { month: 'long' }).format(date)
}
</script>
