<script setup lang="ts">
const props = defineProps<{
  v?: 'primary' | 'none'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon'
  disabled?: boolean
}>()

const baseClass = 'cursor-pointer transition whitespace-nowrap leading-none rounded-sm'

const variantClass = computed(
  () =>
    ({
      primary:
        'bg-taupe-200 dark:bg-taupe-700 border border-black/10 dark:border-white/15 text-black/70 dark:text-white/70 hover:bg-taupe-300 dark:hover:bg-taupe-800 hover:border-black/15 dark:hover:border-white/20 hover:text-black/90 dark:hover:text-white/90',
      none: 'bg-transparent border-0 text-black/30 dark:text-white/50 hover:bg-black/5 dark:hover:bg-white/10 hover:text-black/90 dark:hover:text-white/90',
    })[props.v ?? 'primary'],
)

const sizeClass = computed(
  () =>
    ({
      sm: 'px-6 py-3 text-xs',
      md: 'px-6 py-3 text-sm',
      lg: 'px-12 py-4 text-lg',
      xl: 'px-12 py-5 text-xl',
      icon: 'p-0 flex items-center justify-center w-12 h-12 rounded-full!',
    })[props.size ?? 'md'],
)
</script>

<template>
  <button type="button" :disabled="disabled" :class="[baseClass, variantClass, sizeClass]">
    <slot />
  </button>
</template>
