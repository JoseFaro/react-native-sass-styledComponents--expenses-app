import { useMemo } from 'react';

export default function useCompanyMovements(data) {
   return useMemo(() => {
      if (data && data.movements && data.movements.length) {
         return data.movements;
      }

      return [];
   }, [data]);
}
