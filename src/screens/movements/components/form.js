import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { get } from 'lodash';
import { Input } from 'native-base';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';

import { GlobalStyles } from '../../../constants/styles';

import { ADD_MOVEMENT, UPDATE_MOVEMENT } from '../../../graphql/queries';

import Button from '../../../components/button';
import FormControl from '../../../components/form-control';

const MovementForm = ({ isUpdate, item, onAdd, onUpdate }) => {
   const { currentCompany } = useSelector((state) => state.companies);
   const companyId = currentCompany && currentCompany.id;

   const [addMovement, { data: movementAdded, loading: isAddingMovement }] = useMutation(ADD_MOVEMENT);
   const [updateMovement, { data: movementUpdated, loading: isUpdatingMovement }] = useMutation(UPDATE_MOVEMENT);

   useEffect(() => {
      const movementWasAdded = get(movementAdded, 'addMovement.id');
      if (movementWasAdded) onAdd();
   }, [movementAdded]);

   useEffect(() => {
      const movementWasUpdated = get(movementUpdated, 'updateMovement.id');
      if (movementWasUpdated) onUpdate();
   }, [movementUpdated]);

   const isProcessing = isAddingMovement || isUpdatingMovement;
   const submitLabel = isUpdate ? 'Editar' : 'Agregar';

   const formatFormValues = (values) => {
      const formattedValues = {
         ...values,
         amount: parseFloat(values.amount),
         movementTypeId: parseInt(values.movementTypeId),
      };

      return formattedValues;
   };

   const handleOnSubmit = (values) => {
      if (isUpdate) {
         updateMovement({
            variables: {
               companyId: companyId,
               input: formatFormValues(values),
            },
         });
      } else {
         addMovement({
            variables: {
               companyId: companyId,
               input: formatFormValues(values),
            },
         });
      }
   };

   return (
      <ScrollView contentContainerStyle={GlobalStyles.pageContainer}>
         <KeyboardAvoidingView>
            <Formik
               initialValues={{
                  amount: 0,
                  companyId: companyId,
                  description: '',
                  datetime: '',
                  movementTypeId: 1,
                  title: '',
               }}
               onSubmit={handleOnSubmit}
               validationSchema={Yup.object({
                  amount: Yup.number().required('Este campos es obligatorio'),
                  datetime: Yup.date().required('Este campo es obligatorio'),
                  description: Yup.string(),
                  movementTypeId: Yup.number().required('Este campo es obligatorio'),
                  title: Yup.string().required('Este campo es obligatorio'),
               })}
            >
               {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                  <>
                     <FormControl
                        errorMessage={touched.movementTypeId && errors.movementTypeId}
                        input={
                           <Input
                              type="text"
                              size="xl"
                              onBlur={handleBlur('movementTypeId')}
                              onChangeText={handleChange('movementTypeId')}
                              value={`${values.movementTypeId}`}
                           />
                        }
                        isRequired={true}
                        label="movementTypeId"
                     />

                     <FormControl
                        errorMessage={touched.title && errors.title}
                        input={
                           <Input
                              type="text"
                              size="xl"
                              onBlur={handleBlur('title')}
                              onChangeText={handleChange('title')}
                              value={`${values.title}`}
                           />
                        }
                        isRequired={true}
                        label="title"
                     />

                     <FormControl
                        errorMessage={touched.description && errors.description}
                        input={
                           <Input
                              type="text"
                              size="xl"
                              onBlur={handleBlur('description')}
                              onChangeText={handleChange('description')}
                              value={`${values.description}`}
                           />
                        }
                        isRequired={true}
                        label="description"
                     />

                     <FormControl
                        errorMessage={touched.datetime && errors.datetime}
                        input={
                           <Input
                              type="text"
                              size="xl"
                              onBlur={handleBlur('datetime')}
                              onChangeText={handleChange('datetime')}
                              value={`${values.datetime}`}
                           />
                        }
                        isRequired={true}
                        label="datetime"
                     />

                     <FormControl
                        errorMessage={touched.amount && errors.amount}
                        input={
                           <Input
                              type="text"
                              size="xl"
                              onBlur={handleBlur('amount')}
                              onChangeText={handleChange('amount')}
                              value={`${values.amount}`}
                           />
                        }
                        isRequired={true}
                        label="amount"
                     />

                     <Button isDisabled={isProcessing} isLoading={isProcessing} label={submitLabel} onPress={handleSubmit} />
                  </>
               )}
            </Formik>
         </KeyboardAvoidingView>
      </ScrollView>
   );
};

MovementForm.propTypes = {
   isUpdate: PropTypes.bool,
   item: PropTypes.object,
   onAdd: PropTypes.func,
   onUpdate: PropTypes.func,
};

MovementForm.defaultProps = {
   isUpdate: false,
   item: undefined,
   onAdd: () => {},
   onUpdate: () => {},
};

export default MovementForm;
