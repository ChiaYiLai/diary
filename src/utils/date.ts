export const getDay = (date: string) => {
  const locale = navigator.language
  return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(new Date(date))
}
