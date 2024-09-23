import React, { useEffect } from 'react';
import { APP_ABLY_KEY } from '@env';
import { configureAbly } from '@ably-labs/react-hooks';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { getCompanies } from '../redux/actions/companiesActions';

import DrawerNavigator from '../navigators/drawer-navigator';

import AddMovementScreen from '../screens/movements/add';
import CompanySelectionScreen from '../screens/companies/companySelection';
import EditMovementScreen from '../screens/movements/edit';
import MovementCommentsScreen from '../screens/movements/comments';
import MovementFilesScreen from '../screens/movements/files';
import MovementHistoryScreen from '../screens/movements/history';
import ProfileScreen from '../screens/profile';
import ViewMovementScreen from '../screens/movements/view';

configureAbly({ key: APP_ABLY_KEY });

const Stack = createNativeStackNavigator();

function UserNavigation() {
   const dispatch = useDispatch();

   const { currentCompany, hasCompanies } = useSelector((state) => state.companies);

   const showCompanySelector = !currentCompany && hasCompanies;
   const showDrawer = !showCompanySelector;

   useEffect(() => {
      dispatch(getCompanies());
   }, []);

   return (
      <NavigationContainer>
         <Stack.Navigator>
            {showDrawer ? (
               <>
                  <Stack.Screen component={DrawerNavigator} name="DrawerNavigator" options={{ headerShown: false }} />

                  <Stack.Screen
                     component={AddMovementScreen}
                     name="AddMovement"
                     options={{
                        title: 'Agregar movimiento',
                     }}
                  />

                  <Stack.Screen
                     component={EditMovementScreen}
                     name="EditMovement"
                     options={{
                        title: 'Editar movimiento',
                     }}
                  />

                  <Stack.Screen
                     component={ViewMovementScreen}
                     name="ViewMovement"
                     options={{
                        title: 'Ver movimiento',
                     }}
                  />

                  <Stack.Screen
                     component={MovementCommentsScreen}
                     name="MovementComments"
                     options={{
                        title: 'Comentarios',
                     }}
                  />

                  <Stack.Screen
                     component={MovementFilesScreen}
                     name="MovementFiles"
                     options={{
                        title: 'Archivos',
                     }}
                  />

                  <Stack.Screen
                     component={MovementHistoryScreen}
                     name="MovementHistory"
                     options={{
                        title: 'Historial',
                     }}
                  />

                  <Stack.Screen
                     component={ProfileScreen}
                     name="Profile"
                     options={{
                        title: 'Perfil',
                     }}
                  />
               </>
            ) : null}

            {showCompanySelector ? (
               <Stack.Screen component={CompanySelectionScreen} name="CompanySelector" options={{ headerShown: false }} />
            ) : null}
         </Stack.Navigator>
      </NavigationContainer>
   );
}

export default UserNavigation;
