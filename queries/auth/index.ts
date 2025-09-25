import { loginUser } from '@/api/auth'
import { useMutation } from '@tanstack/react-query'

export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUser,
  })
}