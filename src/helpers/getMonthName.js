const getMonthName = (monthNumber) => {
   let monthName = '';

   switch (monthNumber) {
      case '1':
         monthName = 'Enero';
         break;
      case '2':
         monthName = 'Febrero';
         break;
      case '3':
         monthName = 'Marzo';
         break;
      case '4':
         monthName = 'Abril';
         break;
      case '5':
         monthName = 'Mayo';
         break;
      case '6':
         monthName = 'Junio';
         break;
      case '7':
         monthName = 'Julio';
         break;
      case '8':
         monthName = 'Agosto';
         break;
      case '9':
         monthName = 'Septiembre';
         break;
      case '10':
         monthName = 'Octubre';
         break;
      case '11':
         monthName = 'Noviembre';
         break;
      case '12':
         monthName = 'Diciembre';
         break;
   }

   return monthName;
};

export default getMonthName;
