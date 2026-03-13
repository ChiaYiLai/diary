import { get, set, del } from 'idb-keyval'

const HANDLE_KEY = 'diaryFileHandle'

export const useFileHandle = () => {
    // 儲存 handle
    const saveHandle = async (handle: FileSystemFileHandle) => {
        await set(HANDLE_KEY, handle)
    }

    // 讀取上次的 handle
    const getSavedHandle = async (): Promise<FileSystemFileHandle | null> => {
        try {
            const handle = await get<FileSystemFileHandle>(HANDLE_KEY)
            if (!handle) return null

            // 重新請求權限
            const permission = await handle.requestPermission({
                mode: 'readwrite'
            })
            if (permission === 'granted') return handle

            return null
        } catch {
            return null
        }
    }

    // 清除 handle（登出或換檔案用）
    const clearHandle = async () => {
        await del(HANDLE_KEY)
    }

    return { saveHandle, getSavedHandle, clearHandle }
}
