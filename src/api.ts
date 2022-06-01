import axios from 'axios'
import {API_URL} from './Constants'

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

export default api
