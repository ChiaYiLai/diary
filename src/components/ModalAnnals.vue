<template>
  <Modal v-model="isModalAnnals">
    <div class="flex gap-4">
      <div class="flex-1">
        <DateControl class="mb-2" @prev="changeAnnals(-1)" @next="changeAnnals(1)" :heading="currentAnnals" />
        <textarea
          class="p-6 text-xl/8 h-150 w-full border bg-taupe-200 dark:bg-taupe-700 border-black/10 dark:border-white/15 text-black/70 dark:text-white/70 outline-0 rounded-lg mb-3"
          :placeholder="t('writeAnnalsHere')"
          v-model="annalsContent"
        ></textarea>
        <div class="flex justify-between items-center">
          <Btn size="lg" @click="saveAnnals">{{ t('save') }}</Btn>
          <div v-if="annalsContent.length" class="px-3 py-1 border rounded-sm text-xs text-taupe-400 border-black/10 dark:border-white/15">
            {{ t('wordCount', { count: annalsContent.length }) }}
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>
<script setup lang="ts">
const { t } = useI18n()
const toast = useToast()
const diaryStore = useDiaryStore()
const { currentAnnals, isModalAnnals } = storeToRefs(diaryStore)
const annalsContent = ref('')
watch(
  currentAnnals,
  year => {
    annalsContent.value = diaryStore.getAnnals(year)
  },
  { immediate: true },
)

const changeAnnals = (num: number) => {
  currentAnnals.value = String(Number(currentAnnals.value) + num)
}

const saveAnnals = () => {
  diaryStore.setAnnals(currentAnnals.value, annalsContent.value)
  toast.success(t('saved'))
}
</script>
