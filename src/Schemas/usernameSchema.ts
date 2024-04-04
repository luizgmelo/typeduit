import * as yup from 'yup';

export const usernameSchema = yup.string()
  .min(5, "Username must have at least 5 chars")
  .max(255, "Username must have at most 255 chars")
  .required();
