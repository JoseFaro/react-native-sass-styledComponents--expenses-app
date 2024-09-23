import { useMemo } from 'react';
import { GlobalStyles } from '../../../constants/styles';
import { MovementTypesIds } from '../../../constants/enums';

const useBorderColor = (typeId, isCancelled) => {
   return useMemo(() => {
      return isCancelled
         ? GlobalStyles.appColors.movement.isCancelled.borderColor
         : typeId == MovementTypesIds.DEBIT
         ? GlobalStyles.appColors.movement.type.debit.borderColor
         : typeId == MovementTypesIds.CREDIT
         ? GlobalStyles.appColors.movement.type.credit.borderColor
         : GlobalStyles.appColors.white;
   }, [typeId, isCancelled]);
};

export default useBorderColor;
