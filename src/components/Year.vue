<template>
  <div :class="`bg-${c}-100`" class="p-16">
    <div class="grid grid-cols-4 gap-16">
      <div v-for="month in 12" :key="month">
        <h4
          class="w-fit mx-auto text-sm mb-2 px-4 py-2 border border-black/10 hover:border-black/20 rounded-full cursor-pointer transition"
          :class="`text-${c}-400 hover:text-${c}-700`"
          @click="goMonth(`${currentYear}-${String(month).padStart(2, '0')}`)"
        >
          {{ month }}月
        </h4>
        <div class="grid grid-cols-7 gap-0.5">
          <div
            v-for="(day, i) in getMonthDays(Number(currentYear), month - 1)"
            :key="i"
            class="aspect-square flex items-center justify-center rounded-full text-xs relative"
            @click="diaryStore.handleEditDiary(day.date)"
          >
            <template v-if="day">
              <button class="w-8 h-8 flex items-center justify-center rounded-full" :class="day.hasDiary ? `bg-${c}-400 text-white` : ''">
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
const mainStore = useMainStore()
const { viewMode } = storeToRefs(mainStore)
const diaryStore = useDiaryStore()
const { diaryMap, currentYear, currentMonth } = storeToRefs(diaryStore)
const themeStore = useThemeStore()
const { primary: c } = storeToRefs(themeStore)

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
</script>
