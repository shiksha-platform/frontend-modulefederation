import React from "react";
import { Box, VStack, Divider } from "native-base";
import { H2, Collapsible } from "@shiksha/common-lib";
import SchoolAdminTile from "./SchoolAdminTile";

function SchoolAdminDetailCard() {
  return (
    <Collapsible
      defaultCollapse={true}
      header={
        <Box py={4}>
          <H2>Administrative Details</H2>
        </Box>
      }
    >
      <>
        <VStack space={0} bg={"schools.lightGray5"} p={4} rounded={10}>
          <SchoolAdminTile title={"275 Students"} />
          <Divider />
          <SchoolAdminTile title={"08 Teachers"} />
        </VStack>
      </>
    </Collapsible>
  );
}
export default SchoolAdminDetailCard;
