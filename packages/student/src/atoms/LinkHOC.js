import React from "react";
import { Link } from "native-base";

const LinkHOC = ({ children, ...rest }) => {
  return <Link {...rest}>{children}</Link>;
};

export default LinkHOC;
