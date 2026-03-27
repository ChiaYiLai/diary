<template>
  <div>
    <h3 class="flex items-center gap-2 mb-2 text-sm text-black/50 dark:text-white/50">
      <span>{{ diary.date }}</span>
      <small>{{ getDay(diary.date) }}</small>
    </h3>
    <p class="whitespace-pre-wrap break-all">{{ diary.diary }}</p>
  </div>
</template>

<script setup lang="ts">
const { getDay } = useDate()
const props = defineProps<{
  diary: Diary
}>()
</script>
