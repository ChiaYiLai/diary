<template>
  <Modal v-model="isModalYear">
    <div class="flex gap-4">
      <div class="flex-1">
        <DateControl class="mb-2" @prev="changeYear(-1)" @next="changeYear(1)" :heading="currentYear" />

        <textarea
          :class="`p-6 text-2xl h-[60vh] w-full border border-black/8 bg-${c}-100 text-${c}-700 outline-0 rounded-lg mb-3`"
          placeholder="Write your annals here"
          v-model="currentAnnals"
        ></textarea>
        <div class="flex justify-between items-center">
          <div class="px-4 py-1 border rounded-lg text-xs" :class="`text-${c}-400 border-${c}-200`">
            {{ currentAnnals.length }} {{ t('wordCount') }}
          </div>
          <Btn size="lg" @click="saveAnnals">{{ t('save') }}</Btn>
        </div>
      </div>
    </div>
  </Modal>
</template>
<script setup lang="ts">
const { t } = useI18n()
const toast = useToast()
const diaryStore = useDiaryStore()
const { currentYear, isModalYear } = storeToRefs(diaryStore)
const themeStore = useThemeStore()
const { primary: c } = storeToRefs(themeStore)
const currentAnnals = ref('')
watch(
  currentYear,
  year => {
    currentAnnals.value = diaryStore.getAnnals(year)
  },
  { immediate: true },
)

const changeYear = (num: number) => {
  currentYear.value = String(Number(currentYear.value) + num)
}

const saveAnnals = () => {
  diaryStore.setAnnals(currentYear.value, currentAnnals.value)
  toast.success(t('saved'))
}
</script>
