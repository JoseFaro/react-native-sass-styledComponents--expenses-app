import { get } from 'lodash';

const useInvitationPendingCompanies = (companies) => {
   return get(companies, 'length') ? companies.filter((company) => company && !company.invitation_accepted) : [];
};

export default useInvitationPendingCompanies;
