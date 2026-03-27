<template>
  <div class="bg-taupe-100 dark:bg-taupe-800 border-taupe-300 dark:border-taupe-600 text-black/60 dark:text-white/70 border-t">
    <div class="bg-taupe-100 dark:bg-taupe-900 grid grid-cols-7">
      <div v-for="day in weekDays" :key="day" class="py-1 text-center text-sm border-b border-r border-taupe-300 dark:border-taupe-600">
        {{ day }}
      </div>
    </div>

    <div class="grid grid-cols-7">
      <div
        v-for="(item, index) in calendarDays"
        :key="index"
        class="border-taupe-300 dark:border-taupe-600 aspect-square relative cursor-pointer transition hover:bg-taupe-50 dark:hover:bg-taupe-700 border-b border-r p-4 overflow-hidden"
        @click="diaryStore.handleEditDiary(item.date)"
      >
        <div :class="!item.isCurrentMonth ? 'opacity-50' : ''">
          <h6
            v-if="item.dateNum"
            class="text-sm w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2"
            :class="[item.isToday ? 'text-white bg-orange-300 dark:bg-orange-700' : '']"
          >
            {{ item.dateNum }}
          </h6>
          <p class="line-clamp-6 text-lg">{{ item.diary }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { storeToRefs } from 'pinia'
const diaryStore = useDiaryStore()
const { diaryMap, currentMonth } = storeToRefs(diaryStore)
const { locale } = useI18n()
const { weekDays } = useDate()

const calendarDays = computed(() => {
  const startOfMonth = dayjs(currentMonth.value).startOf('month')
  const daysInMonth = startOfMonth.daysInMonth()
  const endOfMonth = dayjs(currentMonth.value).endOf('month')

  const firstDay = startOfMonth.day()
  const lastMonthDays = (firstDay + 6) % 7
  const days = []

  // 上個月
  const prevMonthEnd = startOfMonth.subtract(1, 'day')
  const prevMonthLastDay = prevMonthEnd.date()
  for (let i = lastMonthDays - 1; i >= 0; i--) {
    const date = prevMonthEnd.date(prevMonthLastDay - i)
    const dateStr = date.format('YYYY-MM-DD')
    days.push({
      date: dateStr,
      diary: diaryMap.value[dateStr] ?? '',
      dateNum: date.date(),
      isCurrentMonth: false,
      isToday: false,
    })
  }

  // 本月
  for (let i = 1; i <= daysInMonth; i++) {
    const date = startOfMonth.date(i)
    const dateStr = date.format('YYYY-MM-DD')
    days.push({
      date: dateStr,
      diary: diaryMap.value[dateStr] ?? '',
      dateNum: i,
      isCurrentMonth: true,
      isToday: date.isSame(dayjs(), 'day'),
    })
  }

  // 下個月
  const remainingSlots = 42 - days.length
  const nextMonthStart = endOfMonth.add(1, 'day')
  for (let i = 0; i < remainingSlots; i++) {
    const date = nextMonthStart.add(i, 'day')
    const dateStr = date.format('YYYY-MM-DD')
    days.push({
      date: dateStr,
      diary: diaryMap.value[dateStr] ?? '',
      dateNum: date.date(),
      isCurrentMonth: false,
      isToday: false,
    })
  }

  return days
})
</script>
