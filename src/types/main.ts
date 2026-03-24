export interface Birthday {
  name: string
  birthday: string
}
export interface Diary {
  date: string
  diary: string
}
export interface Annals {
  year: string
  content: string
}
export interface DiaryData {
  diaries: Diary[]
  birthdays: Birthday[]
  annals: Annals[]
}
