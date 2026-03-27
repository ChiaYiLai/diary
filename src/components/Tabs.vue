<template>
  <div class="flex rounded-full overflow-hidden border border-black/10 dark:border-white/15">
    <button
      v-for="(tab, i) in tabs"
      :key="tab.label"
      class="px-5 py-2 text-sm transition cursor-pointer relative"
      :class="[modelValue === tab.value ? 'text-orange-400' : 'text-taupe-400 hover:text-taupe-600 dark:hover:text-taupe-300']"
      @click="$emit('update:modelValue', tab.value)"
    >
      <span v-if="i < tabs.length - 1" class="absolute right-0 top-1/2 -translate-y-1/2 w-px h-4 bg-black/10 dark:bg-white/15" />
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
const modelValue = defineModel<string | boolean>()
const props = defineProps<{
  tabs: { label: string; value: string | boolean }[]
}>()
</script>
