// A simple wrapper, the role is to provide the context
// needed by react native web
import * as React from "react";
import { NativeBaseProvider } from "native-base";

const Wrapper = (props) => {
  return <NativeBaseProvider>{props.children}</NativeBaseProvider>;
};

export default Wrapper;
