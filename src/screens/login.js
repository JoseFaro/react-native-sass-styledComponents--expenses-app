import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Input } from 'native-base';
import { Formik } from 'formik';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { clearValuesForLogin } from '../redux/reducers/auth';
import { GlobalStyles } from '../constants/styles';
import { login } from '../redux/actions/authActions';

import Button from '../components/button';
import FormControl from '../components/form-control';
import FormError from '../components/form-error';

const LoginScreen = () => {
   const dispatch = useDispatch();
   const { isAttemptingLogin, loginAttempted } = useSelector((state) => state.auth);

   useEffect(() => {
      dispatch(clearValuesForLogin());
   }, []);

   const handleOnSubmit = (values) => {
      dispatch(login(values));
   };

   return (
      <ScrollView contentContainerStyle={[GlobalStyles.pageContainer, styles.container]}>
         <KeyboardAvoidingView>
            <Text style={[GlobalStyles.heading, GlobalStyles.heading1]}>Iniciar sesión</Text>

            <Formik
               initialValues={{ email: '', password: '' }}
               onSubmit={handleOnSubmit}
               validationSchema={Yup.object({
                  email: Yup.string().email('Correo inválido').required('Este campo es obligatorio'),
                  password: Yup.string().required('Este campo es obligatorio'),
               })}
            >
               {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                  <>
                     <FormControl
                        errorMessage={touched.email && errors.email}
                        input={
                           <Input
                              type="text"
                              size="xl"
                              onBlur={handleBlur('email')}
                              onChangeText={handleChange('email')}
                              value={values.email}
                           />
                        }
                        isRequired={true}
                        label="Correo electrónico"
                     />

                     <FormControl
                        errorMessage={touched.password && errors.password}
                        input={
                           <Input
                              type="password"
                              size="xl"
                              onBlur={handleBlur('password')}
                              onChangeText={handleChange('password')}
                              value={values.password}
                           />
                        }
                        isRequired={true}
                        label="Contraseña"
                     />

                     {loginAttempted ? <FormError label="Correo o contraseña incorrectos" /> : null}

                     <Button
                        backgroundColor={GlobalStyles.appColors.primary}
                        isDisabled={isAttemptingLogin}
                        isLoading={isAttemptingLogin}
                        label="Iniciar sesión"
                        onPress={handleSubmit}
                        size="lg"
                     />
                  </>
               )}
            </Formik>
         </KeyboardAvoidingView>
      </ScrollView>
   );
};

export default LoginScreen;

const styles = StyleSheet.create({
   container: {
      alignContent: 'center',
      flex: 1,
      justifyContent: 'center',
   },
});
