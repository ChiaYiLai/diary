<template>
  <div class="relative" ref="container">
    <button class="text-xl" @click="isOpen = !isOpen">
      {{ modelValue }}
    </button>

    <div
      v-if="isOpen"
      class="absolute z-99 top-full left-1/2 -translate-x-1/2 mt-1 bg-white rounded-xl shadow-lg p-4 w-80 border"
      :class="`border-taupe-300`"
      @click.stop
    >
      <DateControl @prev="changeYear(-1)" @next="changeYear(1)" :heading="String(year)" />
      <div class="grid grid-cols-3 gap-2 mt-3">
        <button
          v-for="(m, i) in months"
          :key="i"
          class="py-3 rounded-full transition"
          :class="isSelected(i) ? `bg-taupe-400 text-white` : `hover:bg-taupe-100`"
          @click="selectMonth(i)"
        >
          {{ m }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { onClickOutside } from '@vueuse/core'
const props = defineProps<{ modelValue: string }>() // 'YYYY-MM'
const emit = defineEmits(['update:modelValue'])
const container = ref(null)

const isOpen = ref(false)
const current = computed(() => dayjs(props.modelValue))
const year = computed(() => current.value.year())

const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

function isSelected(monthIndex: number) {
  return current.value.month() === monthIndex
}

function changeYear(dir: 1 | -1) {
  emit('update:modelValue', current.value.add(dir, 'year').format('YYYY-MM'))
}

function selectMonth(monthIndex: number) {
  emit('update:modelValue', current.value.month(monthIndex).format('YYYY-MM'))
  isOpen.value = false
}

onClickOutside(container, () => (isOpen.value = false))
</script>
