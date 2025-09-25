import { axiosInstance } from '@/api'
import { LoginUserResponse } from './index.types'
import { UserLoginFormData } from '@/app/(auth)/models/userLoginFormSchema.model'

export const loginUser = async (data: UserLoginFormData): Promise<LoginUserResponse> => {
  const res = await axiosInstance({
    method: 'POST',
    url: '/auth/login',
    data
  })

  return res?.data
}