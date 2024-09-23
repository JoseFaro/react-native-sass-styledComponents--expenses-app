import React from 'react';
import PropTypes from 'prop-types';
import { Avatar as NativeBaseAvatar } from 'native-base';
import getInitials from '../helpers/getInitials';
import getTextColor from '../helpers/getTextColor';

const Avatar = ({ backgroundColor, containerStyle, name, size }) => {
   const textColor = getTextColor(backgroundColor);
   const textProps = { color: textColor };

   return (
      <NativeBaseAvatar _text={textProps} bg={backgroundColor} size={size} style={containerStyle}>
         {getInitials(name)}
      </NativeBaseAvatar>
   );
};

Avatar.propTypes = {
   backgroundColor: PropTypes.string,
   containerStyle: PropTypes.object,
   name: PropTypes.string,
   size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl']),
};
Avatar.defaultProps = {
   backgroundColor: '#000000',
   name: '',
   size: 'sm',
   containerStyle: undefined,
};

export default Avatar;
