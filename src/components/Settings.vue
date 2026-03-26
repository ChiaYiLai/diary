<template>
  <Modal v-model="mainStore.isSettings" :modalTitle="t('settings')" size="sm">
    <ul class="list-settings">
      <li>
        <label>
          <div>{{ t('theme') }}</div>
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
      <li>
        <label>
          <div>{{ t('language') }}</div>
        </label>
        <ul class="flex flex-wrap justify-end gap-2 max-w-96">
          <li v-for="lang in availableLocales" :key="lang">
            <Btn @click="locale = lang">{{ t('localeName', lang) ? t('localeName', {}, { locale: lang }) : lang }}</Btn>
          </li>
        </ul>
      </li>
      <li>
        <label v-if="fileInfo">
          <div>{{ t('file') }}</div>
          <b>
            {{ fileInfo.name }}
          </b>
          <span class="ml-1">({{ (fileInfo.size / 1024).toFixed(0) }} KB)</span>
        </label>
        <div class="flex flex-wrap gap-3">
          <Btn @click="createFile">{{ t('createFile') }}</Btn>
          <Btn @click="switchFile">{{ t('switchFile') }}</Btn>
          <Btn @click="closeFile">{{ t('closeFile') }}</Btn>
        </div>
      </li>
    </ul>
  </Modal>
</template>

<script setup lang="ts">
const mainStore = useMainStore()
const themeStore = useThemeStore()
const { fileInfo } = storeToRefs(mainStore)
const { createFile, switchFile, closeFile } = useFile()

import { useI18n } from 'vue-i18n'
const { t, locale, availableLocales } = useI18n()
watch(locale, val => localStorage.setItem('locale', val))
</script>
