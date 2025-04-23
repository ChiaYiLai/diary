<script setup lang="ts">
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import { calcAge } from './functions'
import dayjs from 'dayjs'
import Settings from './components/Settings.vue'
import About from './components/About.vue'
import { useMainStore } from './stores/mainStore'

interface Birthday {
    name: string
    birthday: string
}
interface Diary {
    date: string
    diary: string
}

const allDiaries = ref<Diary[]>([])
const dateActive = ref(dayjs(new Date()).format('YYYY-MM-DD'))
const diaryActive = ref(localStorage.getItem(dateActive.value) || '')
const dateRefs = ref(new Map())
const scrollContainer = ref(null)
const isEditBirthday = ref(false)
const isDiaryList = ref(false)
const newBirthday = ref<Birthday>({
    name: '',
    birthday: ''
})
const birthdays = ref<Birthday[]>(
    JSON.parse(localStorage.getItem('birthdays') ?? '[]')
)

let saveTimer: ReturnType<typeof setTimeout> | null = null

watch(dateActive, async (newDate) => {
    await nextTick()
    if (!scrollContainer.value) return
    const targetElement = dateRefs.value.get(newDate)
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
})

const hasDiary = computed(() => !!localStorage.getItem(dateActive.value))
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

const loadDiaries = () => {
    const diaries: Diary[] = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && /^\d{4}-\d{2}-\d{2}$/.test(key)) {
            const diary = localStorage.getItem(key)
            if (diary !== null) {
                diaries.push({ date: key, diary: diary })
            }
        }
    }
    sortDiaries(diaries)
    allDiaries.value = diaries
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
    diaryActive.value = localStorage.getItem(dateActive.value) || ''
}
const saveDiary = () => {
    localStorage.setItem(dateActive.value, diaryActive.value)
    let newAllDiaries = JSON.parse(JSON.stringify(allDiaries.value))
    const target = newAllDiaries.find(
        (item: Diary) => item.date === dateActive.value
    )
    if (target) {
        target.diary = diaryActive.value
    } else {
        newAllDiaries.unshift({
            date: dateActive.value,
            diary: diaryActive.value
        })
    }
    sortDiaries(newAllDiaries)
    allDiaries.value = newAllDiaries
}
const handleSaveDiary = () => {
    if (saveTimer) clearTimeout(saveTimer)
    saveTimer = setTimeout(saveDiary, 500)
}
const deleteDiary = () => {
    const isConfirmed = window.confirm(`Delete ${dateActive.value}？`)
    if (!isConfirmed) return
    localStorage.removeItem(dateActive.value)
    allDiaries.value = allDiaries.value.filter(
        (item) => item.date !== dateActive.value
    )
    dateActive.value = dayjs(new Date()).format('YYYY-MM-DD')
    changeDiary()
}
const addBirthday = () => {
    birthdays.value.push(newBirthday.value)
    saveBirthday()
    newBirthday.value = { name: '', birthday: '' }
}
const saveBirthday = () => {
    localStorage.setItem('birthdays', JSON.stringify(birthdays.value))
}
const finishEditBirthday = () => {
    isEditBirthday.value = false
    saveBirthday()
}

onMounted(() => {
    loadDiaries()
    dateRefs.value = new Map()
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
            textarea.diary-active(placeholder="Write your diary here" @input="handleSaveDiary" v-model="diaryActive")
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
                    img.icon(src="/edit.svg" alt="Edit" :title="Edit")
    footer.footer-main
        a(href="https://chiayilai.github.io/resume/" target="_blank")
            address Developed by Chia Yi Lai
    Settings
    About
</template>

<style scoped lang="sass"></style>
