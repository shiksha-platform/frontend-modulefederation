import React from "react";
import { Center } from "native-base";

export interface IFourOFour {
  children?: React.ReactNode;
}
const FourOFour = () => {
  return (
    <Center flex={1} px="3">
      <Center
        height={200}
        width={{
          base: 200,
          lg: 400,
        }}
      >
        404
      </Center>
    </Center>
  );
};

export default FourOFour;
