<script setup lang="ts">
const mainStore = useMainStore()
const themeStore = useThemeStore()
const { fileInfo } = storeToRefs(mainStore)
const { createFile, switchFile, closeFile } = useFile()
</script>

<template>
  <Modal v-model="mainStore.isSettings" modalTitle="Settings" size="sm">
    <ul class="flex flex-col gap-12">
      <li class="flex justify-between items-center gap-6">
        <label>
          Theme:
          <b class="capitalize">{{ themeStore.primary }}</b>
        </label>
        <ul class="flex flex-wrap justify-end gap-2 max-w-96">
          <li
            v-for="color in themeStore.colors"
            :key="color"
            class="w-8 h-8 cursor-pointer flex items-center justify-center"
            :class="`bg-${color}-400`"
            @click="themeStore.setColor(color)"
            :title="color"
          >
            <span v-if="themeStore.primary === color" class="material-symbols-rounded text-white text-base">check</span>
          </li>
        </ul>
      </li>
      <li class="flex justify-between items-center gap-6">
        <label v-if="fileInfo">
          File:
          <b>
            {{ fileInfo.name }}
          </b>

          <span class="ml-1">({{ (fileInfo.size / 1024).toFixed(0) }} KB)</span>
        </label>
        <div class="flex flex-wrap gap-3">
          <Btn @click="createFile">新日記</Btn>
          <Btn @click="switchFile">載入其他日記</Btn>
          <Btn @click="closeFile">關閉當前日記</Btn>
        </div>
      </li>
    </ul>
  </Modal>
</template>
