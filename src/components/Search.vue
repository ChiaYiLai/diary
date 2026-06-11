<template>
  <div class="bg-taupe-100 dark:bg-taupe-900 p-16">
    <div class="flex items-center justify-center mb-8">
      <input
        v-model="keyword"
        :placeholder="t('searchPlaceholder')"
        class="px-4 py-2 text-xl/8 border bg-taupe-200 dark:bg-taupe-700 border-black/10 dark:border-white/15 text-black/70 dark:text-white/70 outline-0 rounded-sm"
      />
    </div>
    <div class="grid grid-cols-2 gap-8">
      <div>
        <h4 v-if="results.diariesFilter.length" class="text-2xl mb-8">共有 {{ results.diariesFilter.length }} 筆符合日記</h4>
        <ul class="flex flex-col gap-8 divide-y divide-black/10 dark:divide-white/15">
          <li v-for="item in results.diariesFilter" :key="item.date" @click="diaryStore.handleEditDiary(item.date)" class="pb-8 cursor-pointer">
            <Card :diary="item" />
          </li>
        </ul>
      </div>
      <div>
        <h4 v-if="results.annalsFilter.length" class="text-2xl mb-8">共有 {{ results.annalsFilter.length }} 筆符合年記</h4>
        <ul class="flex flex-col gap-8 divide-y divide-black/10 dark:divide-white/15">
          <li v-for="item in results.annalsFilter" :key="item.year" @click="diaryStore.handleEditAnnals(item.year)" class="pb-8 cursor-pointer">
            <h5 class="text-xl">{{ item.year }}</h5>
            <p>{{ excerpt(item.content, keyword) }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const diaryStore = useDiaryStore()
const { diaries, annals } = storeToRefs(diaryStore)
const keyword = ref('')

const results = computed(() => {
  if (!keyword.value.trim()) return { diariesFilter: [], annalsFilter: [] }
  const k = keyword.value.toLowerCase()
  return {
    diariesFilter: diaries.value.filter(d => d.diary.toLowerCase().includes(k)).sort((a, b) => b.date.localeCompare(a.date)),
    annalsFilter: annals.value.filter(item => item.content.toLowerCase().includes(k)).sort((a, b) => b.year.localeCompare(a.year)),
  }
})

function excerpt(text: string, keyword: string, padding = 50) {
  const index = text.toLowerCase().indexOf(keyword.toLowerCase())
  if (index === -1) return text.slice(0, padding * 2)
  const start = Math.max(0, index - padding)
  const end = Math.min(text.length, index + keyword.length + padding)
  const result = text.slice(start, end)
  return (start > 0 ? '...' : '') + result + (end < text.length ? '...' : '')
}
</script>
