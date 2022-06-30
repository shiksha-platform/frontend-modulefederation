import * as React from "react";
import Loader from "components/simple/Loader";
import { storiesOf } from "@storybook/react";

storiesOf("Loading", module).add("When loading", () => (
  <Loader success="successful" fail="failure" />
));
