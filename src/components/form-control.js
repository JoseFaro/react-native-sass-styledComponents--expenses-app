import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'native-base';

const CustomFormControl = ({ errorMessage, helperText, input, isRequired, label, mb, containerStyle }) => {
   return (
      <FormControl isInvalid={!!errorMessage} isRequired={isRequired} mb={mb} style={containerStyle}>
         {label ? <FormControl.Label style={{ marginTop: 0 }}>{label}</FormControl.Label> : null}
         {input}
         {helperText ? <FormControl.HelperText>{helperText}</FormControl.HelperText> : null}
         {errorMessage ? <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage> : null}
      </FormControl>
   );
};

CustomFormControl.propTypes = {
   errorMessage: PropTypes.string,
   helperText: PropTypes.string,
   input: PropTypes.node,
   isRequired: PropTypes.bool,
   label: PropTypes.string,
   mb: PropTypes.string,
   containerStyle: PropTypes.object,
};

CustomFormControl.defaultProps = {
   errorMessage: undefined,
   helperText: undefined,
   input: undefined,
   isRequired: false,
   label: undefined,
   mb: '6',
   containerStyle: undefined,
};

export default CustomFormControl;
