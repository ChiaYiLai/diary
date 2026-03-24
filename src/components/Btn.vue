<script setup lang="ts">
const themeStore = useThemeStore()
const { primary: c } = storeToRefs(themeStore)
const props = defineProps<{
  v?: 'primary' | 'warning' | 'danger' | 'light' | 'none' | 'addCost'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon'
  disabled?: boolean
}>()

const baseClass = 'cursor-pointer transition whitespace-nowrap leading-none rounded-sm'

const variantClass = computed(
  () =>
    ({
      primary: `bg-${c.value}-400 hover:bg-${c.value}-500 text-${c.value}-50`,
      warning: 'bg-teal-400 hover:bg-teal-600 text-white',
      danger: 'bg-red-400 hover:bg-red-600 text-white',
      light: 'bg-stone-400 hover:bg-stone-600 text-white',
      none: `bg-transparent border-0 text-${c.value}-300 hover:bg-${c.value}-100 hover:text-${c.value}-500`,
      addCost: 'bg-teal-400 text-white w-14 h-14',
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
