import React from "react";
import { Collapsible, Tab } from "@shiksha/common-lib";
import { VStack, Box } from "native-base";
import { useTranslation } from "react-i18next";
import { routes } from "../assets";

const ClassSubjectsPanel = ({ classObject, students }) => {
  const { t } = useTranslation();
  return (
    <Collapsible defaultCollapse={true} header={t("SUBJECTS")}>
      <VStack>
        <Box>
          <Tab
            routes={routes(classObject, students)}
            _box={{
              display: "flex",
              overflowX: "auto",
              p: "2",
            }}
            _item={{ flex: "none" }}
          />
        </Box>
      </VStack>
    </Collapsible>
  );
};

export default ClassSubjectsPanel;
