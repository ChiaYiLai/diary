<script setup lang="ts">
const mainStore = useMainStore()
const { viewMode } = storeToRefs(mainStore)
const { tryRestoreFile, fileHandle } = useFile()

onMounted(async () => {
  tryRestoreFile()
})
</script>

<template>
  <div v-if="fileHandle">
    <AppHeader />
    <Month v-if="viewMode === 'month'" />
    <Year v-if="viewMode === 'year'" />
    <Annals v-if="viewMode === 'annals'" />
  </div>
  <Init v-else />
  <Settings />
  <About />
  <ModalDiary />
  <ModalYear />
  <AppToast />
</template>
