export function useDate() {
  const { locale } = useI18n()

  const weekDays = computed(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = `1970-01-${12 + i}`
      return getDay(date)
    })
  })

  function getDay(date: string) {
    return new Intl.DateTimeFormat(locale.value, { weekday: 'short' }).format(new Date(date))
  }

  return { weekDays, getDay }
}
