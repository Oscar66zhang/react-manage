import axios, { AxiosError } from 'axios'
import { hideLoading, showLoading } from './loading'
import storage from './storage'
import env from '@/config'
import { message } from './AntdGlobal'
import { Result } from '@/types/api'

//创建实例
const instance = axios.create({
  // baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000,
  timeoutErrorMessage: '请求超时，请稍后再试',
  withCredentials: true,
  headers: {
    icode: 'A7EEA094EA44'
  }
})

//请求拦截器
instance.interceptors.request.use(
  config => {
    if (config.showLoading) showLoading()
    const token = storage.get('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    if (env.mock) {
      config.baseURL = env.mockApi
    } else {
      config.baseURL = env.baseApi
    }

    return {
      ...config
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

//响应拦截器
instance.interceptors.response.use(
  response => {
    const data: Result = response.data
    hideLoading()
    if (data.code == 401) {
      localStorage.removeItem('token')
      storage.remove('token')
      location.href = '/login?callback=' + encodeURIComponent(location.href)
      return Promise.reject(data)
    }

    if (data.code == 200) {
      return data.data
    }
    message.error(data.message || '请求失败')
    return Promise.reject(data)
  },
  error => {
    hideLoading()
    message.error(error.message || '请求失败，请稍后再试')
    return Promise.reject(error)
  }
)

interface IConfig {
  showLoading: boolean
  showError: boolean
}

export default {
  get<T>(url: string, params?: object, options: IConfig = { showLoading: true, showError: true }): Promise<T> {
    return instance.get(url, { params, ...options })
  },
  post<T>(url: string, params?: object, options: IConfig = { showLoading: true, showError: true }): Promise<T> {
    return instance.post(url, params, options)
  },
  downloadFile(url: string, data: any, fileName = 'fileName.xlsx') {
    instance({
      url,
      data,
      method: 'post',
      responseType: 'blob'
    }).then(response => {
      const blob = new Blob([response.data], {
        type: response.data.type
      })
	  debugger
    })
  }
}
