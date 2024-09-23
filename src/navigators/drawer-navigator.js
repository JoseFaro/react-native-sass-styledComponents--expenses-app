import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import Avatar from '../components/avatar';
import IconButton from '../components/icon-button';

import AccountScreen from '../screens/account';
import UsersScreen from '../screens/users';

import CompaniesScreen from '../screens/companies/index';
import MovementsScreen from '../screens/movements/index';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
   const { currentCompany } = useSelector((state) => state.companies);
   const { color, name } = currentCompany || {};

   const navigation = useNavigation();

   const addMovement = () => {
      navigation.navigate('AddMovement');
   };

   const addUser = () => {
      console.log('addUser');
   };

   return (
      <Drawer.Navigator>
         <Drawer.Screen
            name="Dashboard"
            component={MovementsScreen}
            options={{
               drawerIcon: ({ color }) => <FontAwesome5 name="list" size={20} color={color} />,
               headerRight: () => (
                  <>
                     {currentCompany ? (
                        <View style={styles.headingItemsContainer}>
                           <IconButton icon="add" onPress={() => addMovement()} size={24} />
                           <Avatar backgroundColor={color} name={name} containerStyle={styles.headerAvatar} />
                        </View>
                     ) : null}
                  </>
               ),
            }}
         />
         <Drawer.Screen
            name="Users"
            component={UsersScreen}
            options={{
               title: 'Usuarios',
               drawerIcon: ({ color }) => <Feather name="users" size={20} color={color} />,
               headerRight: () => (
                  <>
                     {currentCompany ? (
                        <View style={styles.headingItemsContainer}>
                           <IconButton icon="add" onPress={() => addUser()} size={24} />
                           <Avatar backgroundColor={color} name={name} containerStyle={styles.headerAvatar} />
                        </View>
                     ) : null}
                  </>
               ),
            }}
         />
         <Drawer.Screen
            name="Companies"
            component={CompaniesScreen}
            options={{
               title: 'Compañías',
               drawerIcon: ({ color }) => <MaterialIcons name="workspaces-outline" size={20} color={color} />,
            }}
         />
         <Drawer.Screen
            name="Account"
            component={AccountScreen}
            options={{
               title: 'Cuenta',
               drawerIcon: ({ color }) => <Feather name="settings" size={20} color={color} />,
            }}
         />
      </Drawer.Navigator>
   );
};

export default DrawerNavigator;

const styles = StyleSheet.create({
   headerAvatar: {
      marginRight: 15,
   },
   headingItemsContainer: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
   },
});
