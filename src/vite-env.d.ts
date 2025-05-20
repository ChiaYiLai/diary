/// <reference types="vite/client" />

export {}

declare global {
    interface Window {
        showOpenFilePicker?: () => Promise<FileSystemFileHandle[]>
    }
}
