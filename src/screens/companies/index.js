import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';
import { Divider } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import getTextColor from '../../helpers/getTextColor';

import { GlobalStyles } from '../../constants/styles';

import { clearInvitationStatus, setCurrentCompany } from '../../redux/reducers/companies';
import { getCompanies, updateCompanyInvitationStatus } from '../../redux/actions/companiesActions';

import useInvitationAcceptedCompanies from './hooks/useInvitationAcceptedCompanies';
import useInvitationPendingCompanies from './hooks/useInvitationPendingCompanies';

import NavPill from '../../components/nav-pill';

const CompaniesScreen = () => {
   const isFocused = useIsFocused();
   const dispatch = useDispatch();
   const navigation = useNavigation();

   const [companyForInvite, setCompanyForInvite] = useState();

   const { companies, isInvitationAccepted, isInvitationDenied, isUpdatingInvitationOfCompany } = useSelector(
      (state) => state.companies,
   );

   const acceptedCompanies = useInvitationAcceptedCompanies(companies);
   const pendingCompanies = useInvitationPendingCompanies(companies);

   const showDivider = acceptedCompanies.length && pendingCompanies.length;
   const showNoCompaniesMessage = !acceptedCompanies.length && !pendingCompanies.length;

   useEffect(() => {
      if (isFocused) {
         dispatch(getCompanies());
         dispatch(clearInvitationStatus());
         setCompanyForInvite();
      }
   }, [isFocused]);

   useEffect(() => {
      if (companyForInvite && isInvitationAccepted) {
         dispatch(getCompanies());
         dispatch(
            setCurrentCompany({
               ...companyForInvite,
               invitation_accepted: 1,
            }),
         );

         navigation.navigate('Dashboard');
      }
   }, [companyForInvite, isInvitationAccepted]);

   useEffect(() => {
      if (companyForInvite && isInvitationDenied) {
         dispatch(getCompanies());
         dispatch(clearInvitationStatus());
         setCompanyForInvite();
      }
   }, [companyForInvite, isInvitationDenied]);

   const companyInvitationProcess = (company, isAccepted) => {
      setCompanyForInvite(company);

      dispatch(
         updateCompanyInvitationStatus({
            id: company.id,
            isAccepted: isAccepted ? 1 : 0,
         }),
      );
   };

   const companyInvitationPrompt = (company) => {
      if (!isUpdatingInvitationOfCompany) {
         Alert.alert(`Acceptar Invitación a ${company.name}`, null, [
            {
               text: 'Aceptar invitación',
               onPress: () => companyInvitationProcess(company, true),
            },
            {
               text: 'Declinar invitación',
               onPress: () => companyInvitationProcess(company, false),
               style: 'destructive',
            },
         ]);
      }
   };

   const updateCurrentCompany = (company) => {
      dispatch(setCurrentCompany(company));
      navigation.navigate('Dashboard');
   };

   return (
      <ScrollView contentContainerStyle={GlobalStyles.pageContainer}>
         {showNoCompaniesMessage ? (
            <Text style={[GlobalStyles.heading, GlobalStyles.heading4]}>No tienes ninguna compañía</Text>
         ) : null}

         {acceptedCompanies.map((company) => {
            const { id, name, color } = company;
            const textColor = getTextColor(color);

            return (
               <NavPill
                  backgroundColor={color}
                  key={id}
                  label={name}
                  onPress={() => updateCurrentCompany(company)}
                  style={styles.pillContainer}
                  textColor={textColor}
               />
            );
         })}

         {showDivider ? <Divider style={styles.divider} /> : null}

         {pendingCompanies.length ? (
            <Text
               style={[
                  GlobalStyles.heading,
                  GlobalStyles.heading2,
                  {
                     color: GlobalStyles.appColors.dark,
                  },
               ]}
            >
               Invitaciones
            </Text>
         ) : null}

         {pendingCompanies.map((company) => {
            const { id, name, color } = company;
            const textColor = getTextColor(color);

            return (
               <NavPill
                  backgroundColor={color}
                  key={id}
                  label={name}
                  onPress={() => companyInvitationPrompt(company)}
                  style={styles.pillContainer}
                  textColor={textColor}
               />
            );
         })}
      </ScrollView>
   );
};

export default CompaniesScreen;

const styles = StyleSheet.create({
   divider: {
      marginBottom: 30,
      marginTop: 15,
   },
   pillContainer: {
      marginBottom: 15,
   },
});
