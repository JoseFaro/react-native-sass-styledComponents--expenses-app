import { useMemo } from 'react';
import { GlobalStyles } from '../../../constants/styles';
import { MovementTypesIds } from '../../../constants/enums';

const useBackgroundColor = (typeId, isCancelled) => {
   return useMemo(() => {
      return isCancelled
         ? GlobalStyles.appColors.movement.isCancelled.backgroundColor
         : typeId == MovementTypesIds.DEBIT
         ? GlobalStyles.appColors.movement.type.debit.backgroundColor
         : typeId == MovementTypesIds.CREDIT
         ? GlobalStyles.appColors.movement.type.credit.backgroundColor
         : GlobalStyles.appColors.white;
   }, [typeId, isCancelled]);
};

export default useBackgroundColor;
