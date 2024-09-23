import React from 'react';
// import { Divider } from 'native-base';
import { ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { GlobalStyles } from '../constants/styles';
import { logout } from '../redux/actions/authActions';

import NavPill from '../components/nav-pill';

const AccountScreen = () => {
   const { isLoggingOut } = useSelector((state) => state.auth);
   const dispatch = useDispatch();
   const navigation = useNavigation();

   const handleOnLogout = () => {
      dispatch(logout());
   };

   const handleOnOpenPage = (pageName) => {
      navigation.navigate(pageName);
   };

   return (
      <ScrollView contentContainerStyle={GlobalStyles.pageContainer}>
         <NavPill label={'Perfil'} onPress={() => handleOnOpenPage('Profile')} style={styles.pillContainer} />
         <NavPill
            backgroundColor={GlobalStyles.colors.danger['600']}
            isLoading={isLoggingOut}
            label={'Cerrar sesión'}
            onPress={handleOnLogout}
            style={styles.pillContainer}
            textColor="white"
         />
         {/*<Divider style={styles.divider} />*/}
      </ScrollView>
   );
};

export default AccountScreen;

const styles = StyleSheet.create({
   divider: {
      marginBottom: 30,
      marginTop: 15,
   },
   pillContainer: {
      marginBottom: 15,
   },
});
