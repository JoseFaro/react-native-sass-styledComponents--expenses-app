import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import Button from './button';
import { GlobalStyles } from '../constants/styles';

const ViewButtons = ({ isDeleting, onDelete, onEdit }) => {
   return (
      <View style={styles.row}>
         <Button containerStyle={styles.buttonsWidth} label="Editar" onPress={onEdit} />
         <Button
            backgroundColor={GlobalStyles.colors.danger['600']}
            containerStyle={styles.buttonsWidth}
            isDisabled={isDeleting}
            isLoading={isDeleting}
            label="Eliminar"
            onPress={onDelete}
         />
      </View>
   );
};

ViewButtons.propTypes = {
   isDeleting: PropTypes.bool,
   onDelete: PropTypes.func,
   onEdit: PropTypes.func,
};

ViewButtons.defaultProps = {
   isDeleting: false,
   onDelete: () => {},
   onEdit: () => {},
};

export default ViewButtons;

const styles = StyleSheet.create({
   buttonsWidth: {
      width: '47%',
   },
   row: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
});
