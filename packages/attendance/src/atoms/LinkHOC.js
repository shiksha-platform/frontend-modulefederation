import React from 'react'
import { Link, useParams } from "react-router-dom";

const LinkHOC = ({children, ...rest}) => {
    
  return <Link {...rest}>{children}</Link>
}

export default LinkHOC