import * as yup from 'yup';
import { usernameSchema } from './usernameSchema';
import { passwordSchema } from './passwordSchema';

export const registerSchema = yup.object({
  user: yup.object({
    email: yup.string().email().required(),
    username: usernameSchema,
    password: passwordSchema, 
  })
})

export type RegisterPayload = yup.InferType<typeof registerSchema>
