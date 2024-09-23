import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { GlobalStyles } from '../../constants/styles';
import MovementForm from './components/form';

const AddMovementScreen = () => {
   const navigation = useNavigation();

   return (
      <ScrollView contentContainerStyle={GlobalStyles.pageContainer}>
         <MovementForm onAdd={() => navigation.goBack()} />
      </ScrollView>
   );
};

export default AddMovementScreen;
