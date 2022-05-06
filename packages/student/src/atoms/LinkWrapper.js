import React from "react";
import { Link } from "native-base";

const LinkWrapper = ({ children, ...rest }) => {
  return <Link {...rest}>{children}</Link>;
};

export default LinkWrapper;
