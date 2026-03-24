<template>
  <div class="p-6 border rounded-lg" :class="`bg-${c}-100 border-${c}-200`">
    <h3 class="flex gap-2 mb-2 text-sm">
      <span>{{ diary.date }}</span>
      <span>{{ getDay(diary.date) }}</span>
    </h3>
    <p class="whitespace-pre-wrap break-all">{{ diary.diary }}</p>
  </div>
</template>

<script setup lang="ts">
import { getDay } from '../utils/date'
const themeStore = useThemeStore()
const { primary: c } = storeToRefs(themeStore)
const props = defineProps<{
  diary: object
}>()
</script>
