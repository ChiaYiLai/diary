import dayjs from 'dayjs'

const calcAge = (birthday: string, referenceDate: string) => {
    const birth = dayjs(birthday)
    const reference = dayjs(referenceDate)
    const isNotBorn = reference < birth
    const [start, end] = isNotBorn ? [reference, birth] : [birth, reference]
    let years = end.diff(start, 'year')
    let tempDate = start.add(years, 'year')
    let months = end.diff(tempDate, 'month')
    tempDate = tempDate.add(months, 'month')
    let days = end.diff(tempDate, 'day')
    return {
        years,
        months,
        days,
        isNotBorn
    }
}

export { calcAge }
