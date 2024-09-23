import React from 'react';
import { Divider, Stack } from 'native-base';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { get } from 'lodash';
import { ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client';

import { GET_COMPANY_MOVEMENT } from '../../graphql/queries';

import useDateData from '../../hooks/useDateData';
import useMovement from '../../graphql/hooks/useMovement';
import useMovementTypeBackgroundColor from '../../hooks/useMovementTypeBackgroundColor';

import { GlobalStyles } from '../../constants/styles';

import Button from '../../components/button';
import DataRow from '../../components/data-row';

const ViewMovementScreen = ({ route }) => {
   const dispatch = useDispatch();
   const navigation = useNavigation();

   const { id } = route.params;

   const { currentCompany } = useSelector((state) => state.companies);
   const companyId = currentCompany ? currentCompany.id : '';

   const { data: movementData, refetch: loadMovement } = useQuery(GET_COMPANY_MOVEMENT, {
      variables: { id, companyId },
   });

   const movement = useMovement(movementData);
   const isHistoryEnabled = true;
   const isLoaded = Boolean(movement);
   const showCancelledPill = Boolean(movement?.is_cancelled);

   const { day, hour, month, year } = useDateData(movement?.datetime);
   const formattedDate = `${month} ${day}, ${year}`;

   const formattedAmount = isLoaded ? movement.amount.toFixed(2) : 0;
   const typeBackgroundColor = useMovementTypeBackgroundColor(movement?.type?.id);
   const hasBeenUpdated = movement?.lastMovementHistory.length > 0;

   const createdAtData = useDateData(movement?.created_at);
   const formattedCreatedAtDate = `${createdAtData.month} ${createdAtData.day}, ${createdAtData.year}`;

   const lastUpdatedAtData = useDateData(get(movement, 'lastMovementHistory.0.updated_at'));
   const formattedLastUpdatedAtDate = `${lastUpdatedAtData.month} ${lastUpdatedAtData.day}, ${lastUpdatedAtData.year}`;

   handleOnEditClick = () => {
      navigation.navigate('EditMovement', { id });
   };

   handleOnCommentsClick = () => {
      navigation.navigate('MovementComments', { id });
   };

   handleOnFilesClick = () => {
      navigation.navigate('MovementFiles', { id });
   };

   handleOnHistoryClick = () => {
      navigation.navigate('MovementHistory', { id });
   };

   return (
      <ScrollView contentContainerStyle={GlobalStyles.pageContainer}>
         {isLoaded ? (
            <>
               {showCancelledPill ? (
                  <DataRow
                     backgroundColor={GlobalStyles.appColors.movement.isCancelled.backgroundColor}
                     label="Estado"
                     value="Cancelado"
                  />
               ) : null}

               <DataRow label="Tipo" value={movement.type.name} backgroundColor={typeBackgroundColor} />
               <DataRow label="Título" value={movement.title} />
               <DataRow label="Descripción" value={movement.description} />
               <DataRow label="Fecha" value={formattedDate} />
               <DataRow label="" value={hour} />
               <DataRow label="Monto" value={formattedAmount} />
               <DataRow label="Creado por" value={movement.companyUser.user.name} />
               <DataRow label="En" value={formattedCreatedAtDate} />
               <DataRow label="" value={createdAtData.hour} />

               {hasBeenUpdated ? (
                  <>
                     <DataRow label="Actualizado por" value={get(movement, 'lastMovementHistory.0.companyUser.user.name')} />
                     <DataRow label="En" value={formattedLastUpdatedAtDate} />
                     <DataRow label="" value={lastUpdatedAtData.hour} />
                  </>
               ) : null}

               <Stack direction={{ base: 'row' }} space={1.5} style={{ marginTop: 10 }}>
                  <Button
                     backgroundColor={GlobalStyles.colors.green['500']}
                     containerStyle={styles.actionButton}
                     endIcon={<Feather color="white" name="message-circle" size={22} style={[]} />}
                     iconPosition={'right'}
                     label={movement.totalComments}
                     labelColor={'white'}
                     onPress={handleOnCommentsClick}
                     size="lg"
                  />
                  <Button
                     backgroundColor={GlobalStyles.colors.purple['900']}
                     containerStyle={styles.actionButton}
                     endIcon={<Ionicons color="white" name="ios-documents-outline" size={22} />}
                     iconPosition={'right'}
                     label={movement.totalFiles}
                     labelColor={'white'}
                     onPress={handleOnFilesClick}
                     size="lg"
                  />
                  {isHistoryEnabled ? (
                     <Button
                        backgroundColor={GlobalStyles.colors.indigo['900']}
                        containerStyle={styles.actionButton}
                        endIcon={<MaterialIcons color="white" name="history" size={22} />}
                        iconPosition={'right'}
                        label={movement.totalUpdates}
                        labelColor={'white'}
                        onPress={handleOnHistoryClick}
                        size="lg"
                     />
                  ) : null}
               </Stack>

               <Divider style={styles.actionsDivider} />

               <Button
                  containerStyle={{ marginBottom: 10 }}
                  endIcon={<Feather color="white" name="edit" size={22} />}
                  iconPosition={'right'}
                  label="Editar"
                  labelColor={'white'}
                  onPress={handleOnEditClick}
                  size="lg"
               />
            </>
         ) : null}
      </ScrollView>
   );
};

export default ViewMovementScreen;

const styles = StyleSheet.create({
   actionButton: {
      height: 50,
      width: 69,
   },
   actionsDivider: {
      marginBottom: 20,
      marginTop: 30,
   },
   actionsWrapper: {
      display: 'flex',
      flexDirection: 'row',
   },
});
