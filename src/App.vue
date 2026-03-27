<script setup lang="ts">
const mainStore = useMainStore()
const { viewMode } = storeToRefs(mainStore)
const { tryRestoreFile, fileHandle } = useFile()

onMounted(async () => {
  tryRestoreFile()
})
</script>

<template>
  <div class="text-black/70 dark:text-white/70">
    <div v-if="fileHandle">
      <AppHeader />
      <Month v-if="viewMode === 'month'" />
      <Year v-if="viewMode === 'year'" />
      <Annals v-if="viewMode === 'annals'" />
    </div>
    <Init v-else />
    <AppFooter />
    <ModalSettings />
    <ModalDiary />
    <ModalAnnals />
    <AppToast />
  </div>
</template>
