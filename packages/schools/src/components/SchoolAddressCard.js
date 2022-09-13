import React from "react";
import { Box, VStack, HStack, Divider } from "native-base";
import { BodyLarge, H2, H4 } from "@shiksha/common-lib";

// Import for translation
import { useTranslation } from "react-i18next";

function SchoolAddressCard({ schoolData, configSchoolDetails }) {
  const { t } = useTranslation();

  return (
    schoolData && (
      <>
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
              configSchoolDetails?.map((config) => (
                <Box p={4}>
                  <VStack space={6}>
                    {config === "address" && (
                      <Box>
                        <H4 color={"schools.gray"}>{t("ADDRESS")}</H4>
                        <BodyLarge>
                          {typeof schoolData?.address == "string" &&
                            schoolData?.address}
                        </BodyLarge>
                      </Box>
                    )}
                    {["district", "block", "cluster"].includes(config) ? (
                      <HStack
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        flexWrap={"wrap"}
                      >
                        {config === "district" && (
                          <Box>
                            <H4 color={"schools.gray"}>{t("DISTRICT")}</H4>
                            <BodyLarge>{schoolData?.district}</BodyLarge>
                          </Box>
                        )}

                        {config === "block" && (
                          <Box>
                            <H4 color={"schools.gray"}>{t("BLOCK")}</H4>
                            <BodyLarge>{schoolData?.block}</BodyLarge>
                          </Box>
                        )}

                        {config === "cluster" && (
                          <Box>
                            <H4 color={"schools.gray"}>{t("CLUSTER")}</H4>
                            <BodyLarge>{schoolData?.cluster}</BodyLarge>
                          </Box>
                        )}
                      </HStack>
                    ) : (
                      <React.Fragment />
                    )}
                    {["headMaster", "phoneNumber"].includes(config) ? (
                      <HStack
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        flexWrap={"wrap"}
                      >
                        {config === "headMaster" && (
                          <Box>
                            <H4 color={"schools.gray"}>{t("HEADMASTER")}</H4>
                            <BodyLarge>{schoolData?.headMaster}</BodyLarge>
                          </Box>
                        )}

                        {config === "phoneNumber" && (
                          <Box>
                            <H4 color={"schools.gray"}>{t("CONTACT")}</H4>
                            <BodyLarge>{schoolData?.phoneNumber}</BodyLarge>
                          </Box>
                        )}
                      </HStack>
                    ) : (
                      <React.Fragment />
                    )}
                    {["mediumOfInstruction", "board"].includes(config) ? (
                      <HStack
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        flexWrap={"wrap"}
                      >
                        {config === "mediumOfInstruction" && (
                          <Box>
                            <H4 color={"schools.gray"}>{t("MEDIUM")}</H4>
                            <BodyLarge>
                              {schoolData?.mediumOfInstruction}
                            </BodyLarge>
                          </Box>
                        )}

                        {config === "board" && (
                          <Box>
                            <H4 color={"schools.gray"}>{t("BOARD")}</H4>
                            <BodyLarge>{schoolData?.board}</BodyLarge>
                          </Box>
                        )}
                      </HStack>
                    ) : (
                      <React.Fragment />
                    )}
                  </VStack>
                </Box>
              ))
            ) : (
              <Box bg={"schools.dangerAlert"} p={"4"} rounded={10}>
                No School details available
              </Box>
            )}
          </Box>
        </VStack>
      </>
    )
  );
}
export default SchoolAddressCard;
