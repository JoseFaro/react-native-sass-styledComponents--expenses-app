import 'react-native-gesture-handler';
import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

import { persistor, store } from './src/redux/store';

import AppApolloProvider from './src/providers/app-apollo-provider';
import Main from './src/main/main';

export default function App() {
   return (
      <>
         <StatusBar style="auto" />
         <PaperProvider>
            <NativeBaseProvider>
               <ReduxProvider store={store}>
                  <AppApolloProvider>
                     <PersistGate loading={null} persistor={persistor}>
                        <Main />
                     </PersistGate>
                  </AppApolloProvider>
               </ReduxProvider>
            </NativeBaseProvider>
         </PaperProvider>
      </>
   );
}
