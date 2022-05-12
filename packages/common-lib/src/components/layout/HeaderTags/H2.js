import React from 'react'
import PropTypes from 'prop-types';
import { Text } from 'native-base';

const H2 = ({fontSize, children, color,fontWeight, bold, textAlign, textTransform }) => {
  return (
    <Text 
    fontSize={fontSize} 
    color={color} 
    fontWeight={fontWeight} 
    bold={bold}
    textAlign={textAlign}
    textTransform={textTransform}
    >
        {children}
    </Text>
  )
}

H2.defaultProps = {
    fontSize:"md",
    children:"unknown",
    color:"",
    fontWeight:"",
    bold:false,
    textAlign:"",
    textTransform:"",
};

H2.propTypes = {
    fontSize: PropTypes.string.isRequired,
    children:PropTypes.node.isRequired,
    color:PropTypes.string,
    fontWeight:PropTypes.string,
    bold:PropTypes.bool,
    textAlign:PropTypes.string,
    textTransform:PropTypes.string,
};


export default H2