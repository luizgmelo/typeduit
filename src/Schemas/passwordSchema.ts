import * as yup from 'yup';

export const passwordSchema = yup.string()
  .min(8, "Password must have at least 8 chars")
  .max(72, "Password must have at most 72 chars")
  .required();

