import axios from 'axios'
import { Toast } from 'toastify-react-native'
import { useAuthStore } from '@/stores/auth.store'

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use(
  async (request) => {
    try {
      const token = useAuthStore.getState().token
      request.headers.Authorization = `Bearer ${token}`
      return request
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'You are not authorized, please log in again',
        position: 'bottom',
      })
      return Promise.reject(error)
    }
  },
  (errData) => {
    return Promise.reject(errData)
  }
)

axiosInstance.interceptors.response.use(
  (response) => response,
  async (errData) => {
    if (errData?.response?.status === 401) {
      Toast.show({
        type: 'error',
        text1: 'You are not authorized, please log in again',
        position: 'bottom',
      })
    }

    return Promise.reject(errData?.response?.data || errData)
  }
)

export { axiosInstance }
