import React from "react";
import { Button } from "native-base";

const ButtonWrapper = ({ children, ...rest }) => {
  return <Button {...rest}>{children}</Button>;
};

export default ButtonWrapper;
