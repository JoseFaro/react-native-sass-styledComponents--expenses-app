import { useMemo } from 'react';

export default function useMovement(data) {
   return useMemo(() => {
      if (data && data.movement) {
         return data.movement;
      }

      return undefined;
   }, [data]);
}
