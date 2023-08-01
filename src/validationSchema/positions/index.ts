import * as yup from 'yup';

export const positionValidationSchema = yup.object().shape({
  location: yup.string().required(),
  vehicle_id: yup.string().nullable(),
});
