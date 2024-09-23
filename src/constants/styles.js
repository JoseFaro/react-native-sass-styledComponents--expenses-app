import { extendTheme } from 'native-base';

export const GlobalStyles = {
   colors: extendTheme().colors,
   appColors: {
      black: '#000',
      white: '#fff',
      dark: '#222',
      dark2: '#333',
      primary: '#50319F',
      secondary: '#717778',
      info: '#423263',
      warning: '#CAAE6D',
      error: '#B84957',
      success: '50319F',
      movement: {
         isCancelled: {
            backgroundColor: '#DEDEDE',
            borderColor: '#A0A0A0',
            color: 'black',
         },
         type: {
            credit: {
               backgroundColor: '#00EA7B',
               borderColor: '#08A058',
               color: 'black',
            },
            debit: {
               backgroundColor: 'orange',
               borderColor: '#A66E06',
               color: 'black',
            },
         },
      },
   },
   heading: {
      fontWeight: '500',
      fontSize: 25,
      marginBottom: 30,
   },
   heading1: {
      fontWeight: '500',
      fontSize: 23,
      marginBottom: 26,
   },
   heading2: {
      fontWeight: '500',
      fontSize: 20,
      marginBottom: 26,
   },
   heading3: {
      fontWeight: '500',
      fontSize: 18,
      marginBottom: 24,
   },
   heading4: {
      fontWeight: '500',
      fontSize: 16,
      marginBottom: 24,
   },
   heading5: {
      fontWeight: '500',
      fontSize: 14,
      marginBottom: 20,
   },
   pageContainer: {
      paddingHorizontal: 15,
      paddingVertical: 30,
   },
};
