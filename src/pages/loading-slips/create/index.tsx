import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createLoadingSlip } from 'apiSdk/loading-slips';
import { loadingSlipValidationSchema } from 'validationSchema/loading-slips';
import { TripInterface } from 'interfaces/trip';
import { getTrips } from 'apiSdk/trips';
import { LoadingSlipInterface } from 'interfaces/loading-slip';

function LoadingSlipCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: LoadingSlipInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createLoadingSlip(values);
      resetForm();
      router.push('/loading-slips');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<LoadingSlipInterface>({
    initialValues: {
      details: '',
      trip_id: (router.query.trip_id as string) ?? null,
    },
    validationSchema: loadingSlipValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Loading Slips',
              link: '/loading-slips',
            },
            {
              label: 'Create Loading Slip',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Loading Slip
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.details}
            label={'Details'}
            props={{
              name: 'details',
              placeholder: 'Details',
              value: formik.values?.details,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<TripInterface>
            formik={formik}
            name={'trip_id'}
            label={'Select Trip'}
            placeholder={'Select Trip'}
            fetcher={getTrips}
            labelField={'cost'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/loading-slips')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'loading_slip',
    operation: AccessOperationEnum.CREATE,
  }),
)(LoadingSlipCreatePage);
