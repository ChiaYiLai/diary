import { createI18n } from 'vue-i18n'

function getDefaultLocale() {
  const locale = localStorage.getItem('locale')
  if (locale) return locale
  const lang = navigator.language
  if (lang.startsWith('zh')) return 'zh-TW'
  if (lang.startsWith('ja')) return 'ja'
  return 'en'
}

export const i18n = createI18n({
  legacy: false,
  locale: getDefaultLocale(),
  fallbackLocale: 'en',
  messages: {
    'zh-TW': {
      language: '語言',
      localeName: '繁體中文',
      diary: '日記',
      annals: '年記',
      monthly: '月覽',
      yearly: '年覽',
      save: '儲存',
      settings: '設定',
      theme: '主題',
      file: '檔案',
      createFile: '新日記',
      switchFile: '載入日記',
      closeFile: '關閉日記',

      saved: '儲存成功',
      wordCount: '字',
    },
    en: {
      language: 'Language',
      localeName: 'English',
      diary: 'Diary',
      annals: 'Annals',
      monthly: 'Monthly',
      yearly: 'Yearly',
      save: 'Save',
      settings: 'Settings',
      theme: 'Theme',
      file: 'File',
      createFile: 'New',
      switchFile: 'Load',
      closeFile: 'Close',

      saved: 'Saved',
      wordCount: 'Characters',
    },
    ja: {
      language: '言語',
      localeName: '日本語',
      diary: '日記',
      annals: '年記',
      monthly: '月間',
      yearly: '年間',
      save: '保存',
      settings: '設定',
      theme: 'テーマ',
      file: 'ファイル',
      createFile: '新規',
      switchFile: '読み込む',
      closeFile: '閉じる',

      saved: '保存しました',
      wordCount: '文字',
    },
  },
})
