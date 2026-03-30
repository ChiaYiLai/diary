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
      darkMode: '深色模式',
      on: '開',
      off: '關',
      file: '檔案',
      fileActions: '文件操作',
      createFile: '新日記',
      switchFile: '載入日記',
      closeFile: '關閉日記',

      saved: '儲存成功',
      wordCount: '已寫 {count} 字',
      writeDiaryHere: '寫下今天發生的事，也可以記錄讓你感謝的人事物...',
      writeAnnalsHere: '記錄這一年重要的事，回顧成長與改變...',

      searchPlaceholder: '搜尋日記...',
      search: '搜尋',
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
      darkMode: 'Dark Mode',
      on: 'on',
      off: 'off',
      file: 'File',
      fileActions: 'File Actions',
      createFile: 'New',
      switchFile: 'Load',
      closeFile: 'Close',

      saved: 'Saved',
      wordCount: '{count} chars written',
      writeDiaryHere: 'Write about your day, and what you are grateful for...',
      writeAnnalsHere: 'Record the important events of this year, reflect on your growth...',

      searchPlaceholder: 'Search diary...',
      search: 'Search',
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
      darkMode: '暗色モード',
      on: '有効',
      off: '無効',
      file: 'ファイル',
      fileActions: 'ファイル操作',
      createFile: '新規',
      switchFile: '読み込む',
      closeFile: '閉じる',

      saved: '保存しました',
      wordCount: '{count} 文字を記録',
      writeDiaryHere: '今日の出来事や、感謝していることを書いてください...',
      writeAnnalsHere: '今年の大切な出来事や、成長を振り返って書いてください...',

      searchPlaceholder: '日記を検索...',
      search: '検索',
    },
  },
})
