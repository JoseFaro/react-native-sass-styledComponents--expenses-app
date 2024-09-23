import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';
import { Divider } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';

import { GlobalStyles } from '../../constants/styles';

import { getCompanies, updateCompanyInvitationStatus } from '../../redux/actions/companiesActions';
import { clearInvitationStatus, setCurrentCompany } from '../../redux/reducers/companies';

import getTextColor from '../../helpers/getTextColor';

import useInvitationAcceptedCompanies from './hooks/useInvitationAcceptedCompanies';
import useInvitationPendingCompanies from './hooks/useInvitationPendingCompanies';

import NavPill from '../../components/nav-pill';

const CompanySelectionScreen = () => {
   const [companyInvitationSelected, setCompanyInvitationSelected] = useState();

   const dispatch = useDispatch();

   const { companies, isInvitationAccepted, isInvitationDenied, isUpdatingCompanyStatus } = useSelector(
      (state) => state.companies,
   );

   const acceptedCompanies = useInvitationAcceptedCompanies(companies);
   const pendingCompanies = useInvitationPendingCompanies(companies);
   const showDivider = acceptedCompanies.length && pendingCompanies.length;

   useEffect(() => {
      dispatch(clearInvitationStatus());
   }, []);

   useEffect(() => {
      const hasOnlyOneCompany = companies.length === 1;
      const hasOnlyOneAcceptedCompany = acceptedCompanies.length;
      const setCurrentCompanyAutomatically = hasOnlyOneCompany && hasOnlyOneAcceptedCompany;

      if (setCurrentCompanyAutomatically) {
         const currentCompanyToBeSet = companies[0];
         dispatch(setCurrentCompany(currentCompanyToBeSet));
      }
   }, [acceptedCompanies, companies]);

   useEffect(() => {
      if (companyInvitationSelected && isInvitationAccepted) {
         dispatch(getCompanies());
         dispatch(clearInvitationStatus());
         dispatch(setCurrentCompany(companyInvitationSelected));
      }
   }, [companyInvitationSelected, isInvitationAccepted]);

   useEffect(() => {
      if (companyInvitationSelected && isInvitationDenied) {
         dispatch(getCompanies());
         dispatch(clearInvitationStatus());
         setCompanyInvitationSelected();
      }
   }, [companyInvitationSelected, isInvitationDenied]);

   const companyInvitationProcess = (company, isAccepted) => {
      setCompanyInvitationSelected(company);
      dispatch(
         updateCompanyInvitationStatus({
            id: company.id,
            isAccepted: isAccepted ? 1 : 0,
         }),
      );
   };

   const companyInvitationPrompt = (company) => {
      if (!isUpdatingCompanyStatus) {
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

   return (
      <ScrollView contentContainerStyle={[GlobalStyles.pageContainer, styles.container]}>
         {acceptedCompanies.length ? (
            <Text style={[GlobalStyles.heading, GlobalStyles.heading1]}>Seleccionar Compañía</Text>
         ) : null}

         {acceptedCompanies.map((company) => {
            const { id, name, color } = company;
            const textColor = getTextColor(color);

            return (
               <NavPill
                  backgroundColor={color}
                  key={id}
                  label={name}
                  onPress={() => dispatch(setCurrentCompany(company))}
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

export default CompanySelectionScreen;

const styles = StyleSheet.create({
   container: {
      alignContent: 'center',
      flex: 1,
      justifyContent: 'center',
   },
   divider: {
      marginBottom: 30,
      marginTop: 15,
   },
   pillContainer: {
      marginBottom: 15,
   },
});
