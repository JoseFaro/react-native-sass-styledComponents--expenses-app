import React from 'react';
import { ScrollView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { GlobalStyles } from '../../constants/styles';

const MovementHistoryScreen = () => {
   const navigation = useNavigation();

   return (
      <ScrollView contentContainerStyle={GlobalStyles.pageContainer}>
         <Text>History</Text>
      </ScrollView>
   );
};

export default MovementHistoryScreen;
