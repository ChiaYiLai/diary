<template>
  <div class="flex items-center justify-center gap-2">
    <Btn @click="$emit('prev')" v="none" size="icon">
      <span class="material-symbols-rounded">arrow_back_ios_new</span>
    </Btn>
    <h3 v-if="heading" class="text-center text-xl">{{ heading }}</h3>
    <slot />
    <Btn @click="$emit('next')" v="none" size="icon">
      <span class="material-symbols-rounded">arrow_forward_ios</span>
    </Btn>
  </div>
</template>

<script setup lang="ts">
defineEmits(['prev', 'next'])
const props = defineProps<{ heading?: string }>()
</script>
