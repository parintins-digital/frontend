export function dateTimeFrom(date: Date): string {
  const time = timeFrom(date)
  const day = dateFrom(date)
  return `${time}, ${day}`
}

export function dateFrom(date: Date): string {
  return date.toLocaleDateString('pt-br', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function timeFrom(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  })
}
