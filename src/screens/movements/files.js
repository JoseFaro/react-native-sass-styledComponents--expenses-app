import React from 'react';
import { ScrollView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { GlobalStyles } from '../../constants/styles';

const MovementFilesScreen = () => {
   const navigation = useNavigation();

   return (
      <ScrollView contentContainerStyle={GlobalStyles.pageContainer}>
         <Text>Files</Text>
      </ScrollView>
   );
};

export default MovementFilesScreen;
