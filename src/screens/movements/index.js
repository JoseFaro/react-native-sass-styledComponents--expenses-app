import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useChannel } from '@ably-labs/react-hooks';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { useTimeout } from '../../hooks/useTimeout';

import { GET_COMPANY_MOVEMENTS } from '../../graphql/queries';
import { GlobalStyles } from '../../constants/styles';

import MovementPill from '../../components/movement-pill';
import useCompanyMovements from '../../graphql/hooks/useCompanyMovements';
import RenderIf from '../../components/render-if';

const MovementsScreen = () => {
   const dispatch = useDispatch();
   const navigation = useNavigation();

   const { currentCompany } = useSelector((state) => state.companies);
   const refetchMovementsTimeout = useTimeout();

   const companyId = currentCompany ? currentCompany.id : '';
   const companyMovementsChannelName = `movementsUpdatesForCompanyId.${companyId}`;

   const { data: companyMovementsData, refetch: loadCompanyMovements } = useQuery(GET_COMPANY_MOVEMENTS, {
      variables: { companyId },
   });

   useChannel(companyMovementsChannelName, (message) => {
      clearTimeout(refetchMovementsTimeout.current);
      refetchMovementsTimeout.current = setTimeout(() => {
         loadCompanyMovements();
      }, 500);
   });

   const movements = useCompanyMovements(companyMovementsData);
   const hasMovements = Boolean(movements && movements.length);

   const handleOnMovementClick = (id) => {
      navigation.navigate('ViewMovement', { id });
   };

   return (
      <ScrollView contentContainerStyle={GlobalStyles.pageContainer}>
         <RenderIf isTrue={hasMovements}>
            {movements.map(
               ({
                  amount,
                  datetime,
                  id,
                  is_cancelled: isCancelled,
                  movement_type_id: typeId,
                  title,
                  totalComments,
                  totalFiles,
               }) => {
                  return (
                     <MovementPill
                        amount={amount}
                        containerStyle={styles.pillContainer}
                        date={datetime}
                        isCancelled={isCancelled}
                        key={id}
                        onPress={() => handleOnMovementClick(id)}
                        typeId={typeId}
                        title={title}
                        totalComments={totalComments}
                        totalFiles={totalFiles}
                     />
                  );
               },
            )}
         </RenderIf>
      </ScrollView>
   );
};

export default MovementsScreen;

const styles = StyleSheet.create({
   pillContainer: {
      marginBottom: 10,
   },
});
