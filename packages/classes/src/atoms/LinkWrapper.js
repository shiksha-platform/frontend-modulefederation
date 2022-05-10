import React from "react";
import { Link, useParams } from "react-router-dom";

const LinkWrapper = ({ children, ...rest }) => {
  return <Link {...rest}>{children}</Link>;
};

export default LinkWrapper;
