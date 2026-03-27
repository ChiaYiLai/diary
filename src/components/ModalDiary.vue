<template>
  <Modal v-model="isModalDiary">
    <DateControl class="mb-4" @prev="changeDay(-1)" @next="changeDay(1)">
      <h3 class="flex items-center justify-center gap-2 text-xl">
        {{ currentDay }}
        <small>{{ getDay(currentDay) }}</small>
      </h3>
    </DateControl>
    <div class="flex gap-8">
      <div class="flex-1">
        <ul class="flex flex-col gap-8 divide-y divide-black/10 dark:divide-white/15">
          <li v-for="item in sameDays" :key="item.date" @click="diaryStore.handleEditDiary(item.date)" class="pb-8 px-2">
            <Card :diary="item" />
          </li>
        </ul>
      </div>
      <div class="flex-1">
        <textarea
          class="p-6 text-xl/8 h-150 w-full border bg-taupe-200 dark:bg-taupe-700 border-black/10 dark:border-white/15 text-black/70 dark:text-white/70 outline-0 rounded-lg mb-3"
          :placeholder="t('writeDiaryHere')"
          v-model="currentDiary"
        ></textarea>
        <div class="flex justify-between items-center">
          <Btn size="lg" @click="saveDiary">{{ t('save') }}</Btn>
          <div v-if="currentDiary.length" class="px-3 py-1 border rounded-sm text-xs text-taupe-400 border-black/10 dark:border-white/15">
            {{ t('wordCount', { count: currentDiary.length }) }}
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
const { getDay } = useDate()
import DateControl from './DateControl.vue'
const { t } = useI18n()
const toast = useToast()
const diaryStore = useDiaryStore()
const { currentDay, isModalDiary, diaries } = storeToRefs(diaryStore)
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

const saveDiary = () => {
  diaryStore.setDiary(currentDay.value, currentDiary.value)
  toast.success(t('saved'))
}
</script>
