import React from "react";
import { Box, VStack, HStack, Divider } from "native-base";
import { BodyLarge, H2, H4 } from "@shiksha/common-lib";
import AttributeComponent from "./AttributeComponent";

// Import for translation
import { useTranslation } from "react-i18next";

function SchoolAddressCard({ schoolData, configSchoolDetails }) {
  const { t } = useTranslation();

  return (
    schoolData && (
      <VStack space={6}>
        <Box
          bg={"schools.lightGray5"}
          borderRadius={10}
          borderColor={"schools.lightGray3"}
        >
          <Box p={4}>
            <H2>{t("SCHOOL_OVERVIEW")}</H2>
          </Box>
          <Divider />

          {configSchoolDetails && configSchoolDetails?.length > 0 ? (
            <Box p={4}>
              <AttributeComponent
                _vstack={{ space: "4" }}
                {...{
                  data: [
                    { attribute: "address", label: "ADDRESS" },
                    { attribute: "district", label: "DISTRICT" },
                    { attribute: "block", label: "BLOCK" },
                    { attribute: "cluster", label: "CLUSTER" },
                    { attribute: "headMaster", label: "HEADMASTER" },
                    { attribute: "phoneNumber", label: "CONTACT" },
                    { attribute: "mediumOfInstruction", label: "MEDIUM" },
                  ].filter((e) => configSchoolDetails.includes(e.attribute)),
                  object: schoolData,
                }}
              />
            </Box>
          ) : (
            <Box bg={"schools.dangerAlert"} p={"4"} rounded={10}>
              No School details available
            </Box>
          )}
        </Box>
      </VStack>
    )
  );
}
export default SchoolAddressCard;
