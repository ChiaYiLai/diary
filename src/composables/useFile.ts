import { get, set, del } from 'idb-keyval'
import { debounce } from 'lodash-es'
const IDB_KEY = 'diaryFileHandle'

export function useFile() {
  const diaryStore = useDiaryStore()
  const mainStore = useMainStore()
  const { fileHandle, isFileLoaded, fileInfo } = storeToRefs(mainStore)
  const fileTypes: FilePickerAcceptType[] = [
    {
      description: 'JSON',
      accept: { 'application/json': ['.json'] },
    },
  ]

  // --- IndexedDB handle 持久化 ---
  async function saveHandle(handle: FileSystemFileHandle) {
    await set(IDB_KEY, handle)
  }

  async function clearHandle() {
    await del(IDB_KEY)
  }

  async function restoreHandle(): Promise<FileSystemFileHandle | null> {
    try {
      const handle = await get<FileSystemFileHandle>(IDB_KEY)
      if (!handle) return null
      const permission = await handle.requestPermission({ mode: 'readwrite' })
      return permission === 'granted' ? handle : null
    } catch {
      return null
    }
  }

  async function updateFileInfo(handle: FileSystemFileHandle) {
    const file = await handle.getFile()
    fileInfo.value = {
      name: file.name,
      lastModified: file.lastModified,
      size: file.size,
    }
  }

  // --- 檔案讀寫 ---
  async function readFile(handle: FileSystemFileHandle) {
    updateFileInfo(handle)
    const file = await handle.getFile()
    const text = await file.text()
    try {
      const data: DiaryData = JSON.parse(text)
      diaryStore.loadFromJson(data)
      isFileLoaded.value = true
    } catch {
      alert('檔案格式錯誤，無法載入日記資料')
    }
  }

  async function loadFile() {
    try {
      const [handle] = await window.showOpenFilePicker({
        types: fileTypes,
        excludeAcceptAllOption: true,
        multiple: false,
      })
      fileHandle.value = handle
      console.log(fileHandle.value)
      await saveHandle(handle)
      await readFile(handle)
      startWatch()
    } catch (err) {
      console.error('開啟檔案失敗:', err)
    }
  }

  async function createFile() {
    try {
      const handle = await window.showSaveFilePicker({
        types: fileTypes,
        suggestedName: 'diary.json',
        startIn: 'documents',
      })
      fileHandle.value = handle
      await saveHandle(handle)
      diaryStore.loadFromJson({ diaries: [], annals: [] })
      await saveFile()
      updateFileInfo(handle)
      isFileLoaded.value = true
      startWatch()
      mainStore.isSettings = false
    } catch (err) {
      console.error('創建新檔案失敗:', err)
    }
  }

  async function saveFile() {
    if (!fileHandle.value) {
      alert('請先選擇一個檔案')
      return
    }
    try {
      const writable = await fileHandle.value.createWritable()
      await writable.write(JSON.stringify(diaryStore.exportJson(), null, 2))
      await writable.close()
    } catch (err) {
      console.error('寫入檔案失敗:', err)
      alert('儲存失敗，請檢查檔案權限')
    }
  }

  // 啟動時自動恢復上次的檔案
  async function tryRestoreFile() {
    const handle = await restoreHandle()
    if (!handle) return
    fileHandle.value = handle
    await readFile(handle)
    startWatch()
  }

  async function closeFile() {
    await clearHandle()
    fileHandle.value = null
    isFileLoaded.value = false
    diaryStore.loadFromJson({ diaries: [], annals: [] })
    mainStore.isSettings = false
  }

  async function switchFile() {
    await closeFile()
    await loadFile()
  }

  let watchStarted = false
  function startWatch() {
    if (watchStarted) return
    const diaryStore = useDiaryStore()
    const { diaries, annals } = storeToRefs(diaryStore)
    watchStarted = true
    watch(
      [diaries, annals],
      debounce(() => {
        if (!isFileLoaded.value) return
        saveFile()
      }, 1000),
      { deep: true },
    )
  }

  return {
    fileHandle,
    fileInfo,
    isFileLoaded,
    loadFile,
    createFile,
    saveFile,
    tryRestoreFile,
    clearHandle,
    closeFile,
    switchFile,
  }
}
