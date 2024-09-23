import { get } from 'lodash';

const useInvitationAcceptedCompanies = (companies) => {
   return get(companies, 'length') ? companies.filter((company) => company && company.invitation_accepted) : [];
};

export default useInvitationAcceptedCompanies;
