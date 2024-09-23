import React from 'react';
import PropTypes from 'prop-types';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Pressable } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';

import useBackgroundColor from './hooks/useBackgroundColor';
import useBorderColor from './hooks/useBorderColor';
import useDateData from '../../hooks/useDateData';
import useTextColor from './hooks/useTextColor';

import RenderIf from '../render-if';

const MovementPill = ({ amount, containerStyle, date, isCancelled, onPress, title, totalComments, totalFiles, typeId }) => {
   const amountFormatted = amount.toFixed(2);
   const backgroundColor = useBackgroundColor(typeId, isCancelled);
   const borderColor = useBorderColor(typeId, isCancelled);
   const textColor = useTextColor(typeId, isCancelled);

   const { day, hour, monthShort, year } = useDateData(date);

   const bgStyles = { backgroundColor: backgroundColor };
   const borderColorStyles = { borderRightColor: borderColor };
   const textStyles = { color: textColor };

   return (
      <Pressable style={containerStyle} onPress={onPress}>
         {({ isPressed }) => (
            <View style={[styles.container, bgStyles, isPressed && styles.boxPressed]}>
               <View style={[styles.dateWrapper, borderColorStyles]}>
                  <Text style={[styles.dayText, textStyles]}>{day}</Text>
                  <Text style={[styles.monthText, textStyles]}>{monthShort}</Text>
               </View>
               <View style={styles.infoWrapper}>
                  <View style={styles.titleAndPriceWrapper}>
                     <Text numberOfLines={1} style={[styles.titleText, textStyles]}>
                        {title}
                     </Text>
                     <Text style={[styles.priceText, textStyles]}>${amountFormatted}</Text>
                  </View>
                  <View style={styles.hourAndDetailsWrapper}>
                     <Text style={textStyles}>
                        {year} / {hour}
                     </Text>
                     <View style={styles.detailsWrapper}>
                        <RenderIf isTrue={totalComments > 0}>
                           <View style={styles.detailWrapper}>
                              <Text style={textStyles}>{totalComments}</Text>
                              <Feather color="black" name="message-circle" size={18} style={[styles.detailIcon, textStyles]} />
                           </View>
                        </RenderIf>
                        <RenderIf isTrue={totalFiles > 0}>
                           <View style={[styles.detailWrapper, styles.detailWrapperMargin]}>
                              <Text style={textStyles}>{totalFiles}</Text>
                              <Ionicons
                                 color="black"
                                 name="ios-documents-outline"
                                 size={18}
                                 style={[styles.detailIcon, textStyles]}
                              />
                           </View>
                        </RenderIf>
                     </View>
                  </View>
               </View>
            </View>
         )}
      </Pressable>
   );
};

MovementPill.propTypes = {
   amount: PropTypes.number,
   containerStyle: PropTypes.object,
   date: PropTypes.string,
   isCancelled: PropTypes.number,
   onPress: PropTypes.func,
   status: PropTypes.string,
   title: PropTypes.string,
   totalComments: PropTypes.number,
   totalFiles: PropTypes.number,
   typeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MovementPill.defaultProps = {
   amount: undefined,
   containerStyle: {},
   date: undefined,
   isCancelled: 0,
   onPress: () => {},
   status: undefined,
   title: '',
   totalComments: undefined,
   totalFiles: undefined,
   typeId: 0,
};

export default MovementPill;

const styles = StyleSheet.create({
   boxPressed: {
      opacity: 0.8,
   },
   container: {
      borderRadius: 5,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingVertical: 0,
   },
   dateWrapper: {
      borderRightWidth: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      marginRight: 10,
      paddingRight: 8,
   },
   dayText: {
      fontSize: 25,
      fontWeight: '500',
      lineHeight: 25,
      marginBottom: 3,
      textAlign: 'center',
   },
   detailIcon: {
      marginLeft: 3,
   },
   detailsWrapper: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
   },
   detailWrapper: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
   },
   detailWrapperMargin: {
      marginLeft: 10,
   },
   hourAndDetailsWrapper: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   infoWrapper: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingBottom: 9,
      paddingTop: 8,
   },
   monthText: {
      fontSize: 15,
      lineHeight: 15,
      textAlign: 'center',
      textTransform: 'uppercase',
   },
   priceText: {
      fontWeight: '500',
      marginLeft: 10,
   },
   titleAndPriceWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   titleText: {
      flexShrink: 1,
      paddingBottom: 10,
   },
});
