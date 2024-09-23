import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import getTextColor from '../helpers/getTextColor';

const DataRow = ({ backgroundColor, label, value, valueColor }) => {
   const backgroundColorStyle = backgroundColor ? { backgroundColor: backgroundColor } : undefined;
   const hasBackgroundColor = Boolean(backgroundColorStyle);
   const colorForBackgroundColor = hasBackgroundColor ? { color: getTextColor(backgroundColor) } : undefined;
   const valueColorStyle = valueColor ? { color: valueColor } : undefined;

   return (
      <View style={[styles.row, backgroundColorStyle]}>
         <Text style={[styles.title, colorForBackgroundColor]}>{label}</Text>
         <Text style={[styles.value, valueColorStyle]}>{value}</Text>
      </View>
   );
};

DataRow.propTypes = {
   backgroundColor: PropTypes.string,
   label: PropTypes.string,
   value: PropTypes.any,
   valueColor: PropTypes.string,
};

DataRow.defaultProps = {
   backgroundColor: '',
   label: '',
   value: '',
   valueColor: undefined,
};

export default DataRow;

const styles = StyleSheet.create({
   row: {
      backgroundColor: 'white',
      borderRadius: 5,
      flex: 1,
      flexDirection: 'row',
      marginBottom: 15,
      padding: 15,
   },
   title: {
      fontWeight: 'bold',
      lineHeight: 20,
      maxWidth: 110,
      paddingRight: 10,
      width: '100%',
   },
   value: {
      flexShrink: 1,
      lineHeight: 20,
   },
});
