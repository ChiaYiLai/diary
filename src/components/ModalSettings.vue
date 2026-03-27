<template>
  <Modal v-model="mainStore.isSettings" :modalTitle="t('settings')" size="sm">
    <ul class="list-settings">
      <li>
        <label>
          <div>{{ t('language') }}</div>
        </label>
        <Tabs v-model="locale" :tabs="Tablangs" />
      </li>
      <li>
        <label>
          <div>{{ t('darkMode') }}</div>
        </label>
        <Tabs
          v-model="isDark"
          :tabs="[
            { label: t('on'), value: true },
            { label: t('off'), value: false },
          ]"
        />
      </li>
      <li v-if="fileInfo">
        <label>
          <div>{{ t('file') }}</div>
        </label>
        <div>
          <span>
            {{ fileInfo.name }}
          </span>
          <small class="ml-1">({{ (fileInfo.size / 1024).toFixed(0) }} KB)</small>
        </div>
      </li>
      <li>
        <label v-if="fileInfo">
          <div>{{ t('fileActions') }}</div>
        </label>
        <div class="flex flex-wrap gap-2">
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
const { fileInfo, isDark } = storeToRefs(mainStore)
const { createFile, switchFile, closeFile } = useFile()

import { useI18n } from 'vue-i18n'
const { t, locale, availableLocales } = useI18n()
watch(locale, val => localStorage.setItem('locale', val))

const Tablangs = computed(() => {
  return availableLocales.map(lang => {
    return { label: t('localeName', {}, { locale: lang }), value: lang }
  })
})
</script>
