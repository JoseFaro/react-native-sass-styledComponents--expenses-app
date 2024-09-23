const getMonthNameShort = (monthNumber) => {
   let monthName = '';

   switch (monthNumber) {
      case '1':
         monthName = 'Ene';
         break;
      case '2':
         monthName = 'Feb';
         break;
      case '3':
         monthName = 'Mar';
         break;
      case '4':
         monthName = 'Abr';
         break;
      case '5':
         monthName = 'May';
         break;
      case '6':
         monthName = 'Jun';
         break;
      case '7':
         monthName = 'Jul';
         break;
      case '8':
         monthName = 'Ago';
         break;
      case '9':
         monthName = 'Sep';
         break;
      case '10':
         monthName = 'Oct';
         break;
      case '11':
         monthName = 'Nov';
         break;
      case '12':
         monthName = 'Dic';
         break;
   }

   return monthName;
};

export default getMonthNameShort;
