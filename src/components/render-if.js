import PropTypes from 'prop-types';

export default function RenderIf({ children, isTrue }) {
   if (isTrue) {
      return children;
   }

   return null;
}

RenderIf.propTypes = {
   children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.object]),
   isTrue: PropTypes.bool,
};

RenderIf.defaultProps = {
   children: [],
   isTrue: false,
};
