import { z } from 'zod'

export type UserLoginFormData = z.infer<typeof userLoginFormSchema>

export const userLoginFormSchema = z.object({
  email: z.string().min(1, { message: 'Field is required' }),
  password: z.string().min(8, { message: 'Field is required' })
})
