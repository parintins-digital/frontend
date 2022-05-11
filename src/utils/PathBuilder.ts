export class PathBuilder {
  private url = ''

  constructor(defaultURL?: string) {
    if (defaultURL === undefined) return
    this.url = defaultURL
  }

  public addBaseUrl(baseUrl: string): PathBuilder {
    const containProtocolNameInUrl =
      this.url.includes('http://') || this.url.includes('https://')
    if (!containProtocolNameInUrl) {
      const containProtocolNameInBaseUrl =
        baseUrl.includes('http://') || baseUrl.includes('https://')
      if (containProtocolNameInBaseUrl) {
        this.url = baseUrl + this.url
      } else {
        this.url = 'http://' + baseUrl + this.url
      }
    }
    return this
  }

  public addPath(path: string): PathBuilder {
    const cleanPath = path.replace('/', '')
    this.url += `/${cleanPath}`
    return this
  }

  public addQuery(query: string, value: any): PathBuilder {
    if (value === undefined || value === null || value === '') return this

    const cleanQuery = query.replace('&', '')

    const isFirstQuery = !!this.url.includes('?')

    if (isFirstQuery) {
      this.url += `&${cleanQuery}=${value}`
    } else {
      this.url += `?${cleanQuery}=${value}`
    }
    return this
  }

  public build(): string {
    this.url = this.url.replaceAll('//', '/')
    this.url = this.url.replace('http:/', 'http://')
    this.url = this.url.replace('https:/', 'https://')
    return this.url
  }
}
