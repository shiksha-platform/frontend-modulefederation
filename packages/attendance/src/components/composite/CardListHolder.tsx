// Lib
import * as React from "react";
import { Box, Stack } from "native-base";
import { Collapsible } from "@shiksha/common-lib";

// Components
import { CompareReportHeading } from "components/simple/CompareReportHeading";

export const CardListHolder = ({ _textMed, _textSmall, ...props }) => {
  return (
    <Box bg="white" p={4}>
      <Stack space={2}>
        <Collapsible
          defaultCollapse={true}
          isHeaderBold={false}
          // @ts-ignore
          header={
            <CompareReportHeading _textMed={_textMed} _textSmall={_textSmall} />
          }
        >
          {props.children}
        </Collapsible>
      </Stack>
    </Box>
  );
};
