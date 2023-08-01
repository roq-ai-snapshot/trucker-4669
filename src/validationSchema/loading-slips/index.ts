import * as yup from 'yup';

export const loadingSlipValidationSchema = yup.object().shape({
  details: yup.string().required(),
  trip_id: yup.string().nullable(),
});
