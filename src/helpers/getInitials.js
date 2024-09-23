const getInitials = (string, maxWords = 2) => {
   if (string) {
      const words = string
         .trim()
         .split(' ')
         .filter((v, index) => index < maxWords);

      if (words.length > 1) {
         return words.map((word) => word[0].toUpperCase()).join('');
      }

      if (words.length === 1) {
         const shortName = string.trim().substring(0, 2).toLowerCase();

         if (shortName.length > 1) {
            return shortName[0].toUpperCase() + shortName[1];
         }

         return shortName;
      }
   }

   return 'X';
};

export default getInitials;
