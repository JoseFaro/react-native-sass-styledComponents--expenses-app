import { useMemo } from 'react';
import { GlobalStyles } from '../constants/styles';
import { MovementTypesIds } from '../constants/enums';

const useMovementTypeBackgroundColor = (typeId) => {
   return useMemo(() => {
      const typeIdFormatted = parseInt(typeId);

      return typeIdFormatted === MovementTypesIds.CREDIT
         ? GlobalStyles.appColors.movement.type.credit.backgroundColor
         : typeIdFormatted === MovementTypesIds.DEBIT
         ? GlobalStyles.appColors.movement.type.debit.backgroundColor
         : GlobalStyles.appColors.black;
   }, [typeId]);
};

export default useMovementTypeBackgroundColor;
