import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { GlobalStyles } from '../constants/styles';

const ProfileScreen = () => {
   return (
      <ScrollView contentContainerStyle={GlobalStyles.pageContainer}>
         <Text>Profile screen</Text>
      </ScrollView>
   );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
