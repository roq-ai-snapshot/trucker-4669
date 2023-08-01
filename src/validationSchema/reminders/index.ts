import * as yup from 'yup';

export const reminderValidationSchema = yup.object().shape({
  details: yup.string().required(),
  user_id: yup.string().nullable(),
});
