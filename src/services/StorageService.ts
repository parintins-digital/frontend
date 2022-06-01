export function clearCookies() {
  document.cookie.split(';').forEach((cookie) => {
    const equalsPosition = cookie.indexOf('=')
    const cookieName =
      equalsPosition > -1 ? cookie.substring(0, equalsPosition) : cookie
    document.cookie = cookieName + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
  })
}

export function clearSessionStorage() {
  sessionStorage.clear()
}

export function verifyIfCookieExists(cookieName: string): boolean {
  let cookieExists = false
  document.cookie.split(';').forEach((cookie) => {
    if (cookie.includes(cookieName)) {
      cookieExists = true
    }
  })
  return cookieExists
}

export function saveSessionStorage(key: string, value: any) {
  sessionStorage.setItem(key, JSON.stringify(value))
}

export function getSessionStorage<T>(key: string): T | undefined {
  const data = sessionStorage.getItem(key)
  if (!data) return
  return JSON.parse(data) as unknown as T
}
