import axios from 'axios'
import {API_URL, DOMAIN} from './Constants'
import {PathBuilder} from './utils/PathBuilder'

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

api.interceptors.response.use(async (config) => {
  if (config.status === 403) {
    window.open(new PathBuilder(DOMAIN).build(), '_self')
  }
})

export default api
