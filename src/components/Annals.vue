<template>
  <div v-if="annals.length" class="grid grid-cols-4 gap-8 p-8 bg-taupe-100 dark:bg-taupe-900">
    <div
      v-for="item in sortAnnals"
      :key="item.year"
      class="p-8 flex flex-col rounded-xl overflow-hidden border cursor-pointer border-black/10 hover:border-black/20 bg-taupe-50 dark:bg-taupe-800 dark:border-white/15 dark:hover:border-white/25"
      @click="diaryStore.handleEditAnnals(item.year)"
    >
      <header class="text-5xl text-black/20 dark:text-white/30 mb-6">{{ item.year }}</header>
      <div class="flex-1 transition overflow-hidden min-h-50 max-h-100 whitespace-pre-wrap break-all">
        {{ item.content }}
      </div>
    </div>
  </div>
  <div v-else class="m-8 text-center"><Btn @click="diaryStore.handleEditAnnals()">Write Annals</Btn></div>
</template>

<script setup lang="ts">
const diaryStore = useDiaryStore()
const { annals } = storeToRefs(diaryStore)

const sortAnnals = computed(() => {
  return [...annals.value].sort((a, b) => b.year.localeCompare(a.year))
})
</script>
