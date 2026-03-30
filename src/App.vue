<script setup lang="ts">
const mainStore = useMainStore()
const { viewMode } = storeToRefs(mainStore)
const { tryRestoreFile, fileHandle } = useFile()

onMounted(async () => {
  tryRestoreFile()
})
</script>

<template>
  <div class="text-black/70 dark:text-white/70 bg-taupe-100 dark:bg-taupe-900 min-h-screen flex flex-col">
    <div v-if="fileHandle" class="flex-1">
      <AppHeader />
      <Month v-if="viewMode === 'month'" />
      <Year v-if="viewMode === 'year'" />
      <Annals v-if="viewMode === 'annals'" />
      <Search v-if="viewMode === 'search'" />
    </div>
    <Init v-else />
    <AppFooter />
    <ModalSettings />
    <ModalDiary />
    <ModalAnnals />
    <AppToast />
  </div>
</template>
