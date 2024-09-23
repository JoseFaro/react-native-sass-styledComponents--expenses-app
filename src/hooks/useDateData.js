import { useMemo } from 'react';
import moment from 'moment';
import getMonthName from '../helpers/getMonthName';
import getMonthNameShort from '../helpers/getMonthNameShort';

const useDateData = (date) => {
   return useMemo(() => {
      let day = '00';
      let hour = '';
      let month = 'N/A';
      let monthShort = 'N/A';
      let year = '';

      const momentDate = moment(date);

      if (momentDate.isValid()) {
         day = momentDate.format('DD');
         hour = momentDate.format('HH:mm');
         month = getMonthName(momentDate.format('M'));
         monthShort = getMonthNameShort(momentDate.format('M'));
         year = momentDate.format('Y');
      }

      return {
         day,
         hour,
         month,
         monthShort,
         year,
      };
   }, [date]);
};

export default useDateData;
