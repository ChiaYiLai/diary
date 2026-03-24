<template>
  <div class="flex rounded-full overflow-hidden border border-black/10">
    <button
      v-for="(tab, i) in tabs"
      :key="tab.value"
      class="px-5 py-2 text-sm transition cursor-pointer relative"
      :class="[modelValue === tab.value ? `text-${c}-700` : `text-${c}-400 hover:text-${c}-700`]"
      @click="$emit('update:modelValue', tab.value)"
    >
      <span v-if="i < tabs.length - 1" class="absolute right-0 top-1/2 -translate-y-1/2 w-px h-4 bg-black/10" />
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  tabs: { label: string; value: string }[]
}>()
defineEmits(['update:modelValue'])

const { primary: c } = storeToRefs(useThemeStore())
</script>
