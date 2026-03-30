<template>
  <div class="bg-taupe-100 dark:bg-taupe-900 p-16">
    <div class="flex items-center mb-8">
      <input
        v-model="keyword"
        :placeholder="t('searchPlaceholder')"
        class="px-4 py-2 text-xl/8 border bg-taupe-200 dark:bg-taupe-700 border-black/10 dark:border-white/15 text-black/70 dark:text-white/70 outline-0 rounded-sm"
      />
      <span v-if="results.length" class="ml-4">共有 {{ results.length }} 筆符合日記</span>
    </div>
    <ul class="flex flex-col gap-8 divide-y divide-black/10 dark:divide-white/15">
      <li v-for="item in results" :key="item.date" @click="diaryStore.handleEditDiary(item.date)" class="pb-8 px-2 cursor-pointer">
        <Card :diary="item" :keyword="keyword" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { keyword, results } = useSearch()
const { t } = useI18n()
const diaryStore = useDiaryStore()
</script>
