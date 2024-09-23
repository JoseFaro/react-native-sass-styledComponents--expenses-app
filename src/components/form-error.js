import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Column, Text, Row } from 'native-base';

const FormError = ({ label, mb }) => {
   return (
      <Alert status="error" mb={mb}>
         <Column space={1} w="100%">
            <Row space={2}>
               <Alert.Icon />
               <Text>{label}</Text>
            </Row>
         </Column>
      </Alert>
   );
};

FormError.propTypes = {
   label: PropTypes.string,
   mb: PropTypes.string,
};

FormError.defaultProps = {
   label: '',
   mb: '4',
};

export default FormError;
