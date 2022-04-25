import React from "react";
import { Button } from "native-base";

const ButtonHOC = ({ children, ...rest }) => {
  return <Button {...rest}>{children}</Button>;
};

export default ButtonHOC;
