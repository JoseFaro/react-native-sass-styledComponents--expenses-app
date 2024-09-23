import React from 'react';
import { ScrollView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { GlobalStyles } from '../../constants/styles';

const MovementCommentsScreen = () => {
   const navigation = useNavigation();

   return (
      <ScrollView contentContainerStyle={GlobalStyles.pageContainer}>
         <Text>Comments</Text>
      </ScrollView>
   );
};

export default MovementCommentsScreen;
