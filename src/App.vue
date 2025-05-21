<script setup lang="ts">
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import { calcAge } from './functions'
import dayjs from 'dayjs'
import Settings from './components/Settings.vue'
import About from './components/About.vue'
import Init from './components/Init.vue'
import { useMainStore } from './stores/mainStore'

const fileTypes = [
    {
        description: 'JSON Files',
        accept: { 'application/json': ['.json'] }
    }
]

interface Birthday {
    name: string
    birthday: string
}
interface Diary {
    date: string
    diary: string
}
interface DiaryData {
    diaries: Diary[]
    birthdays: Birthday[]
}

// 檔案處理相關變數
const isBrowserSupport = ref(false)
const fileHandle = ref<FileSystemFileHandle | null>(null)
const isFileLoaded = ref(false)

// 日記資料
const allDiaries = ref<Diary[]>([])
const dateActive = ref(dayjs(new Date()).format('YYYY-MM-DD'))
const diaryActive = ref('')
const dateRefs = ref(new Map())
const scrollContainer = ref(null)
const isEditBirthday = ref(false)
const isDiaryList = ref(false)
const newBirthday = ref<Birthday>({
    name: '',
    birthday: ''
})
const birthdays = ref<Birthday[]>([])

let saveTimer: ReturnType<typeof setTimeout> | null = null

watch(dateActive, async (newDate) => {
    await nextTick()
    if (!scrollContainer.value) return
    const targetElement = dateRefs.value.get(newDate)
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
})

const hasDiary = computed(() => {
    return allDiaries.value.some((diary) => diary.date === dateActive.value)
})
const prevDay = computed(() => {
    return dayjs(dateActive.value).subtract(1, 'day').format('YYYY-MM-DD')
})
const nextDay = computed(() => {
    return dayjs(dateActive.value).add(1, 'day').format('YYYY-MM-DD')
})
const sameDays = computed(() => {
    return allDiaries.value.filter((item) => {
        const itemDate = dayjs(item.date)
        return (
            item.date !== dateActive.value &&
            itemDate.format('MM-DD') === dayjs(dateActive.value).format('MM-DD')
        )
    })
})
const ages = computed(() => {
    return birthdays.value.map(({ name, birthday }) => {
        const { years, months, days, isNotBorn } = calcAge(
            birthday,
            dateActive.value
        )
        return {
            name,
            years,
            months,
            days,
            isNotBorn
        }
    })
})

const checkBrowser = async () => {
    if ('showOpenFilePicker' in window) isBrowserSupport.value = true
}

const loadDiary = async () => {
    try {
        const [handle] = await window.showOpenFilePicker({
            types: fileTypes,
            excludeAcceptAllOption: true,
            multiple: false
        })
        fileHandle.value = handle
        const file = await fileHandle.value.getFile()
        const contents = await file.text()
        try {
            const data: DiaryData = JSON.parse(contents)
            if (Array.isArray(data.diaries)) {
                sortDiaries(data.diaries)
                allDiaries.value = data.diaries
            } else {
                allDiaries.value = []
            }
            if (Array.isArray(data.birthdays)) {
                birthdays.value = data.birthdays
            } else {
                birthdays.value = []
            }
            changeDiary()
            isFileLoaded.value = true
        } catch (parseErr) {
            console.error('解析 JSON 失敗:', parseErr)
            alert('檔案格式錯誤，無法載入日記資料')
        }
    } catch (err) {
        console.error('開啟檔案失敗:', err)
        alert('開啟檔案失敗，請重新嘗試')
    }
}

const createDiary = async () => {
    try {
        fileHandle.value = await window.showSaveFilePicker({
            types: fileTypes,
            suggestedName: 'diary.json',
            startIn: 'documents'
        })
        const emptyData: DiaryData = {
            diaries: [],
            birthdays: []
        }
        allDiaries.value = []
        birthdays.value = []
        await saveDataToFile(emptyData)
        isFileLoaded.value = true
    } catch (err) {
        console.error('創建新檔案失敗:', err)
    }
}

const saveDataToFile = async (data: DiaryData) => {
    try {
        const writable = await fileHandle.value.createWritable()
        await writable.write(JSON.stringify(data, null, 2))
        await writable.close()
    } catch (err) {
        console.error('寫入檔案失敗:', err)
        alert('儲存失敗，請檢查檔案權限')
    }
}

const sortDiaries = (diaries: Diary[]) => {
    diaries.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
}

const getDay = (date: string) => {
    const locale = navigator.language
    return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(
        new Date(date)
    )
}

const handleDate = (date: string) => {
    dateActive.value = date
    isDiaryList.value = false
    changeDiary()
}

const changeDiary = () => {
    const entry = allDiaries.value.find(
        (item) => item.date === dateActive.value
    )
    diaryActive.value = entry ? entry.diary : ''
}

const saveDiary = async () => {
    let updated = false
    for (let i = 0; i < allDiaries.value.length; i++) {
        if (allDiaries.value[i].date === dateActive.value) {
            allDiaries.value[i].diary = diaryActive.value
            updated = true
            break
        }
    }

    if (!updated) {
        allDiaries.value.push({
            date: dateActive.value,
            diary: diaryActive.value
        })
        sortDiaries(allDiaries.value)
    }

    const dataToSave: DiaryData = {
        diaries: allDiaries.value,
        birthdays: birthdays.value
    }

    await saveDataToFile(dataToSave)
}

const handleSaveDiary = () => {
    if (saveTimer) clearTimeout(saveTimer)
    saveTimer = setTimeout(saveDiary, 500)
}

const deleteDiary = async () => {
    const isConfirmed = window.confirm(
        `確定要刪除 ${dateActive.value} 的日記嗎？`
    )
    if (!isConfirmed) return

    allDiaries.value = allDiaries.value.filter(
        (item) => item.date !== dateActive.value
    )

    dateActive.value = dayjs(new Date()).format('YYYY-MM-DD')
    changeDiary()

    const dataToSave: DiaryData = {
        diaries: allDiaries.value,
        birthdays: birthdays.value
    }

    await saveDataToFile(dataToSave)
}

const addBirthday = async () => {
    birthdays.value.push(newBirthday.value)
    await saveBirthday()
    newBirthday.value = { name: '', birthday: '' }
}

const saveBirthday = async () => {
    const dataToSave: DiaryData = {
        diaries: allDiaries.value,
        birthdays: birthdays.value
    }

    await saveDataToFile(dataToSave)
}

const finishEditBirthday = async () => {
    isEditBirthday.value = false
    await saveBirthday()
}

onMounted(() => {
    dateRefs.value = new Map()
    checkBrowser()
})
</script>

<template lang="pug">
    header.header-main
        .left(@click="isDiaryList = !isDiaryList")
            img.icon(src="/menu.svg" alt="Diary List" title="Diary List")
        h1(@click="useMainStore().isAbout = true")
            img(src="/favicon.svg" alt="Diary Logo")
            span Local Diary
        .right(@click="useMainStore().isSettings = true")
            img.icon(src="/settings.svg" alt="Settings" title="Settings")
    main.main-main
        .left(ref="scrollContainer" :class="{ 'active': isDiaryList }")
            ul.list-diaries
                li(v-for="item in allDiaries" :key="item.date" @click="handleDate(item.date)" :class="{ active: item.date === dateActive }")
                    h3(:ref="el => dateRefs.set(item.date, el)" :data-date="item.date") {{ item.date }} {{ getDay(item.date) }}
                    p {{ item.diary }}
        .center
            .date
                .prev-day(@click="handleDate(prevDay)" :title="prevDay")
                    img(src="/left.svg" alt="Previous Day")
                input.date-active(type="date" v-model="dateActive" @change="changeDiary")
                .day-active {{ getDay(dateActive) }}
                .next-day(@click="handleDate(nextDay)" :title="nextDay")
                    img(src="/left.svg" alt="Next Day")
                img.icon(src="/delete.svg" alt="delete" title="delete" @click="deleteDiary" v-if="hasDiary")   
            textarea.diary-active(placeholder="Write your diary here" @input="handleSaveDiary" v-model="diaryActive" :disabled="!isFileLoaded")
            ul.list-same-days
                li(v-for="item in sameDays" :key="item.date" @click="handleDate(item.date)")
                    h3 {{ item.date }} {{ getDay(item.date) }}
                    p {{ item.diary }}
            .box-ages(v-if="useMainStore().isAge")
                ul.list-birthdays(v-if="isEditBirthday")
                    li(v-for="item in birthdays" :key="item.name")
                        input(v-model="item.name")
                        input(type="date" v-model="item.birthday")
                    li
                        input(v-model="newBirthday.name" placeholder="Name")
                        input(type="date" v-model="newBirthday.birthday")
                        button(type="button" @click="addBirthday") Add
                ul.list-ages(v-else)
                    li(v-for="item in ages" :key="item.name")
                        h3 {{ item.name }}
                        p(v-if="item.isNotBorn") -{{ item.years }}y{{ item.months }}m{{ item.days }}d
                        p(v-else) {{ item.years }}y{{ item.months }}m{{ item.days }}d 
                button(v-if="isEditBirthday" type="button" @click="finishEditBirthday()") Done
                div(v-else @click="isEditBirthday = true")
                    img.icon(src="/edit.svg" alt="Edit" title="Edit")
    footer.footer-main
        a(href="https://chiayilai.github.io/resume/" target="_blank")
            address Developed by Chia Yi Lai
    Settings
    About
    Init(:isFileLoaded="isFileLoaded" :createDiary="createDiary" :loadDiary="loadDiary" :isBrowserSupport="isBrowserSupport")
</template>

<style scoped lang="sass"></style>
