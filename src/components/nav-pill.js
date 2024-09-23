import React from 'react';
import { Box, Pressable, Spinner } from 'native-base';
import { StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

const NavPill = ({ backgroundColor, isLoading, label, onPress, style, textColor }) => {
   const boxStyles = { ...styles.box, backgroundColor: backgroundColor };
   const textStyles = { color: textColor };

   return (
      <Pressable onPress={onPress} style={style}>
         {({ isPressed }) => (
            <Box style={[boxStyles, isPressed && styles.boxPressed]}>
               {isLoading ? (
                  <Box style={styles.spinnerWrapper}>
                     <Spinner color="white" />
                  </Box>
               ) : (
                  <Text style={textStyles}>{label}</Text>
               )}
            </Box>
         )}
      </Pressable>
   );
};

NavPill.propTypes = {
   backgroundColor: PropTypes.string,
   isLoading: PropTypes.bool,
   label: PropTypes.string,
   onPress: PropTypes.func,
   style: PropTypes.object,
   textColor: PropTypes.string,
};

NavPill.defaultProps = {
   backgroundColor: '#f9f9f9',
   isLoading: false,
   label: 'No label',
   onPress: () => {},
   style: {},
   textColor: undefined,
};

export default NavPill;

const styles = StyleSheet.create({
   box: {
      borderRadius: 5,
      padding: 20,
   },
   boxPressed: {
      opacity: 0.8,
   },
   spinnerWrapper: {
      height: 19,
   },
});
