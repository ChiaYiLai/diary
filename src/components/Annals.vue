<template>
  <div v-if="annals.length" class="grid grid-cols-4 gap-8 px-8 pb-8">
    <div
      v-for="item in sortAnnals"
      :key="item.year"
      class="flex flex-col rounded-xl overflow-hidden border cursor-pointer"
      :class="`bg-${c}-100  border-${c}-300 hover:bg-${c}-50`"
      @click="diaryStore.handleEditYear(item.year)"
    >
      <header :class="`bg-${c}-200 border-${c}-300 border-b text-center py-2`">{{ item.year }}</header>
      <div class="flex-1 transition p-8 overflow-hidden min-h-50 max-h-100 whitespace-pre-wrap break-all">
        {{ item.content }}
      </div>
    </div>
  </div>
  <div v-else class="m-8 text-center"><Btn @click="diaryStore.handleEditYear()">Write Annals</Btn></div>
</template>

<script setup lang="ts">
const diaryStore = useDiaryStore()
const { annals } = storeToRefs(diaryStore)
const themeStore = useThemeStore()
const { primary: c } = storeToRefs(themeStore)

const sortAnnals = computed(() => {
  return [...annals.value].sort((a, b) => b.year.localeCompare(a.year))
})
</script>
