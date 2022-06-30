import * as React from "react";
import { storiesOf } from "@storybook/react";
import FourOFour from "components/simple/FourOFour";

storiesOf("404", module).add("when something is not found", () => (
  <FourOFour />
));
