import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { GlobalStyles } from '../../constants/styles';
import MovementForm from './components/form';
import NavPill from '../../components/nav-pill';

const EditMovementScreen = ({ route }) => {
   const navigation = useNavigation();

   const { id } = route.params;

   console.log('id', id);

   handleOnSave = () => {
      console.log('saved');
      navigation.goBack();
   };

   return (
      <ScrollView contentContainerStyle={GlobalStyles.pageContainer}>
         <NavPill label={'Guardar'} onPress={() => handleOnSave()} />
         {/* <MovementForm isUpdate={true} onSave={handleOnSave} /> */}
      </ScrollView>
   );
};

export default EditMovementScreen;
