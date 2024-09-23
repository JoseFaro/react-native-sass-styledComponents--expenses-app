import { useMemo } from 'react';
import { GlobalStyles } from '../../../constants/styles';
import { MovementTypesIds } from '../../../constants/enums';

const useTextColor = (typeId, isCancelled) => {
   return useMemo(() => {
      return isCancelled
         ? GlobalStyles.appColors.movement.isCancelled.color
         : typeId == MovementTypesIds.DEBIT
         ? GlobalStyles.appColors.movement.type.debit.color
         : typeId == MovementTypesIds.CREDIT
         ? GlobalStyles.appColors.movement.type.credit.color
         : GlobalStyles.appColors.white;
   }, [typeId, isCancelled]);
};

export default useTextColor;
