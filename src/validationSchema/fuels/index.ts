import * as yup from 'yup';

export const fuelValidationSchema = yup.object().shape({
  type: yup.string().required(),
  price: yup.number().integer().required(),
  organization_id: yup.string().nullable(),
});
