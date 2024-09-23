import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { GlobalStyles } from '../constants/styles';

const UsersScreen = () => {
   return (
      <ScrollView contentContainerStyle={GlobalStyles.pageContainer}>
         <Text>Users screen</Text>
      </ScrollView>
   );
};

export default UsersScreen;

const styles = StyleSheet.create({});
