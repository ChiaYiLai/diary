<template>
  <Modal v-model="isModalYear">
    <div class="flex gap-4">
      <div class="flex-1">
        <DateControl class="mb-2" @prev="changeYear(-1)" @next="changeYear(1)" :heading="currentYear" />

        <textarea
          :class="`p-6 text-2xl h-[60vh] w-full border border-black/8 bg-${c}-100 text-${c}-700 outline-0 rounded-lg mb-3`"
          placeholder="Write your annals here"
          v-model="currentDiary"
        ></textarea>
        <div class="flex justify-between items-center">
          <span>字數：{{ currentDiary.length }}</span>
          <Btn size="lg" @click="diaryStore.setAnnals(currentYear, currentDiary)">儲存</Btn>
        </div>
      </div>
    </div>
  </Modal>
</template>
<script setup lang="ts">
const diaryStore = useDiaryStore()
const { currentYear, isModalYear } = storeToRefs(diaryStore)
const themeStore = useThemeStore()
const { primary: c } = storeToRefs(themeStore)
const currentDiary = ref('')
watch(
  currentYear,
  year => {
    currentDiary.value = diaryStore.getAnnals(year)
  },
  { immediate: true },
)

const changeYear = num => {
  currentYear.value = String(Number(currentYear.value) + num)
}
</script>
