<template>
  <Transition name="fade">
    <div v-if="modelValue" class="bg-black/60 fixed inset-0 flex justify-center items-start z-50" @click.self="modelValue = false">
      <div class="`max-h-[80vh] max-w-240 p-8 mt-8 overflow-y-auto rounded-lg shadow-lg`" :class="`${widthClass} bg-${c}-50 text-${c}-500`">
        <h2 v-if="modalTitle" class="text-4xl mb-12 font-bold">{{ modalTitle }}</h2>
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const themeStore = useThemeStore()
const { primary: c } = storeToRefs(themeStore)
const modelValue = defineModel<boolean>()
const props = defineProps<{
  modalTitle?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}>()

const widthClass = computed(
  () =>
    ({
      sm: 'w-[40vw]',
      md: 'w-[60vw]',
      lg: 'w-[70vw]',
      xl: 'w-[80vw]',
      full: 'w-screen',
    })[props.size ?? 'lg'],
)
</script>
