import * as yup from 'yup';
import { passwordSchema } from './passwordSchema';

export const loginSchema = yup.object({
  user: yup.object({
    email: yup.string().email().required(),
    password: passwordSchema, 
  })
})

export type LoginPayload = yup.InferType<typeof loginSchema>
