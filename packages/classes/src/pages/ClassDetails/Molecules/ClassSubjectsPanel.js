import React from "react";
import { Collapsible, Tab } from "@shiksha/common-lib";
import {VStack , Box } from "native-base";
  import { useTranslation } from "react-i18next";
import { routes } from "../assets";

const ClassSubjectsPanel = () =>  {
    const { t } = useTranslation();
    return (
      <Collapsible defaultCollapse={true} header={t("SUBJECTS")}>
        <VStack>
          <Box>
            <Tab
              routes={routes()}
            />
          </Box>
        </VStack>
      </Collapsible>
    );
  }
  
  export default ClassSubjectsPanel;