import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

const IconButton = ({ icon, size, color, onPress }) => {
   const iconIsANode = React.isValidElement(icon);

   return (
      <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
         {iconIsANode ? (
            icon
         ) : (
            <View style={styles.buttonContainer}>
               <Ionicons name={icon} size={size} color={color} />
            </View>
         )}
      </Pressable>
   );
};

export default IconButton;

const styles = StyleSheet.create({
   buttonContainer: {
      borderRadius: 24,
      padding: 6,
      marginHorizontal: 8,
      marginVertical: 2,
   },
   pressed: {
      opacity: 0.75,
   },
});
