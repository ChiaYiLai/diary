<template>
  <Transition name="fade">
    <div v-if="modelValue" class="bg-black/60 fixed inset-0 flex justify-center items-start z-50" @click.self="modelValue = false">
      <div
        class="max-h-[80vh] min-w-120 max-w-280 p-12 pt-6 mt-12 overflow-y-auto rounded-lg shadow-lg bg-taupe-100 dark:bg-taupe-800 text-black/70 dark:text-white/70"
        :class="widthClass"
      >
        <h2 v-if="modalTitle" class="text-4xl mt-6 mb-12 font-bold">{{ modalTitle }}</h2>
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const modelValue = defineModel<boolean>()
const props = defineProps<{
  modalTitle?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}>()

const widthClass = computed(
  () =>
    ({
      sm: 'w-140',
      md: 'w-[60vw]',
      lg: 'w-[70vw]',
      xl: 'w-[80vw]',
      full: 'w-screen',
    })[props.size ?? 'lg'],
)
</script>
