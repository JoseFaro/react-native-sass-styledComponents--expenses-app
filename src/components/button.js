import React from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Box, Button as NativeBaseButton, Spinner } from 'native-base';

const Button = ({
   backgroundColor,
   color,
   containerStyle,
   endIcon,
   isDisabled,
   isLoading,
   label,
   labelColor,
   leftIcon,
   onPress,
   shrink,
   size,
}) => {
   const hasLabel = Boolean(label);

   const buttonStyle = [
      styles.buttonContainer,
      containerStyle,
      backgroundColor ? { backgroundColor: backgroundColor } : undefined,
      color ? { color: color } : undefined,
      shrink ? styles.shrink : undefined,
   ];

   const labelStyle = [styles.label, labelColor ? { color: labelColor } : undefined];

   return (
      <NativeBaseButton
         disabled={isDisabled}
         endIcon={endIcon}
         leftIcon={leftIcon}
         onPress={onPress}
         style={buttonStyle}
         size={size}
      >
         {isLoading ? (
            <Box style={styles.spinnerWrapper}>
               <Spinner color="white" />
            </Box>
         ) : hasLabel ? (
            <Text numberOfLines={1} style={labelStyle}>
               {label}
            </Text>
         ) : null}
      </NativeBaseButton>
   );
};

Button.propTypes = {
   backgroundColor: PropTypes.string,
   color: PropTypes.string,
   containerStyle: PropTypes.object,
   endIcon: PropTypes.node,
   iconPosition: PropTypes.string,
   iconStyle: PropTypes.object,
   isDisabled: PropTypes.bool,
   isLoading: PropTypes.bool,
   label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   labelColor: PropTypes.string,
   leftIcon: PropTypes.node,
   onPress: PropTypes.func,
   shrink: PropTypes.bool,
   size: PropTypes.string,
};

Button.defaultProps = {
   backgroundColor: undefined,
   color: undefined,
   containerStyle: undefined,
   endIcon: undefined,
   iconPosition: 'left',
   iconStyle: undefined,
   isDisabled: false,
   isLoading: false,
   label: '',
   labelColor: undefined,
   leftIcon: undefined,
   onPress: () => {},
   shrink: false,
   size: 'lg',
};

export default Button;

const styles = StyleSheet.create({
   buttonContainer: {
      marginTop: 8,
   },
   iconLabelWrapper: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
   },
   iconWrapper: {
      marginLeft: 8,
   },
   label: {
      color: 'white',
      fontSize: 15,
   },
   spinnerWrapper: {
      paddingBottom: Platform.OS === 'ios' ? 2 : 0,
      paddingTop: Platform.OS === 'ios' ? 2 : 1,
   },
   shrink: {
      alignSelf: 'flex-start',
      paddingLeft: 14,
      paddingRight: 14,
   },
});
