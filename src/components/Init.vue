<template>
  <div class="flex items-center justify-center flex-1">
    <div class="p-8 text-center">
      <h1 class="text-4xl mb-4">私人日記，只屬於你</h1>
      <p class="text-2xl mb-8">資料存在你的電腦，不上雲端，不需帳號，完全離線。</p>
      <p v-if="!isBrowserSupport" class="text-rose-700">你的瀏覽器不支援此功能，建議使用 Chrome 桌機版。</p>
      <div v-else class="flex gap-4 justify-center">
        <Btn size="xl" @click="createFile">新日記</Btn>
        <Btn size="xl" @click="loadFile">載入日記</Btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { createFile, loadFile } = useFile()
const isBrowserSupport = ref(false)
const checkBrowser = async () => {
  if ('showOpenFilePicker' in window) isBrowserSupport.value = true
}

onMounted(async () => {
  checkBrowser()
})
</script>
