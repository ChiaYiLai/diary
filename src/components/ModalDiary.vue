<template>
  <Modal v-model="isModalDiary">
    <DateControl class="mb-4" @prev="changeDay(-1)" @next="changeDay(1)" :heading="`${currentDay} ${getDay(currentDay)}`" />
    <div class="flex gap-8">
      <div class="flex-1">
        <ul class="flex flex-col gap-4">
          <li v-for="item in sameDays" :key="item.date" @click="diaryStore.handleEditDiary(item.date)">
            <Card :diary="item" />
          </li>
        </ul>
      </div>
      <div class="flex-1">
        <textarea
          :class="`p-6 text-xl/8 h-150 w-full border border-${c}-200 bg-${c}-100 text-${c}-500 outline-0 rounded-lg mb-3`"
          placeholder="Write your diary here"
          v-model="currentDiary"
        ></textarea>
        <div class="flex justify-between items-center">
          <span>字數：{{ currentDiary.length }}</span>
          <Btn size="lg" @click="diaryStore.setDiary(currentDay, currentDiary)">儲存</Btn>
        </div>
      </div>
    </div>
  </Modal>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import { getDay } from '../utils/date'
const diaryStore = useDiaryStore()
const { currentDay, isModalDiary, diaries } = storeToRefs(diaryStore)
const themeStore = useThemeStore()
const { primary: c } = storeToRefs(themeStore)
const currentDiary = ref('')
watch(
  currentDay,
  date => {
    currentDiary.value = diaryStore.getDiary(date)
  },
  { immediate: true },
)
const sameDays = computed(() => {
  const target = diaries.value.filter(item => {
    return item.date !== currentDay.value && dayjs(item.date).format('MM-DD') === dayjs(currentDay.value).format('MM-DD')
  })
  return target.sort((a, b) => b.date.localeCompare(a.date))
})

const changeDay = (dir: 1 | -1) => {
  currentDay.value = dayjs(currentDay.value).add(dir, 'day').format('YYYY-MM-DD')
}
</script>
