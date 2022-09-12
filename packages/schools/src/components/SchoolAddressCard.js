import React from "react";
import { Box, VStack, HStack, Divider } from "native-base";
import { BodyLarge, H2, H4 } from "@shiksha/common-lib";

// Import for translation
import { useTranslation } from "react-i18next";

function SchoolAddressCard({ schoolData }) {
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
            <Box p={4}>
              <VStack space={6}>
                <Box>
                  <H4 color={"schools.gray"}>{t("ADDRESS")}</H4>
                  <BodyLarge>
                    {typeof schoolData?.address == "string" &&
                      schoolData?.address}
                  </BodyLarge>
                </Box>

                <Box>
                  <HStack
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    flexWrap={"wrap"}
                  >
                    <Box
                      style={{
                        flex: "0 0 50%",
                        maxWidth: "50%",
                      }}
                    >
                      <H4 color={"schools.gray"}>{t("DISTRICT")}</H4>
                      <BodyLarge>{schoolData?.district}</BodyLarge>
                    </Box>
                    <Box
                      style={{
                        flex: "0 0 50%",
                        maxWidth: "50%",
                      }}
                    >
                      <H4 color={"schools.gray"}>{t("BLOCK")}</H4>
                      <BodyLarge>{schoolData?.block}</BodyLarge>
                    </Box>
                    <Box
                      style={{
                        flex: "0 0 50%",
                        maxWidth: "50%",
                        marginTop: "10px",
                      }}
                    >
                      <H4 color={"schools.gray"}>{t("CLUSTER")}</H4>
                      <BodyLarge>{schoolData?.cluster}</BodyLarge>
                    </Box>
                  </HStack>
                </Box>

                <Box>
                  <HStack
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    flexWrap={"wrap"}
                  >
                    <Box
                      style={{
                        flex: "0 0 50%",
                        maxWidth: "50%",
                      }}
                    >
                      <H4 color={"schools.gray"}>{t("HEADMASTER")}</H4>
                      <BodyLarge>{schoolData?.headMaster}</BodyLarge>
                    </Box>

                    <Box
                      style={{
                        flex: "0 0 50%",
                        maxWidth: "50%",
                      }}
                    >
                      <H4 color={"schools.gray"}>{t("CONTACT")}</H4>
                      <BodyLarge>{schoolData?.phoneNumber}</BodyLarge>
                    </Box>
                  </HStack>
                </Box>

                <Box>
                  <HStack
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    flexWrap={"wrap"}
                  >
                    <Box
                      style={{
                        flex: "0 0 50%",
                        maxWidth: "50%",
                      }}
                    >
                      <H4 color={"schools.gray"}>{t("MEDIUM")}</H4>
                      <BodyLarge>{schoolData?.mediumOfInstruction}</BodyLarge>
                    </Box>
                    <Box
                      style={{
                        flex: "0 0 50%",
                        maxWidth: "50%",
                      }}
                    >
                      <H4 color={"schools.gray"}>{t("BOARD")}</H4>
                      <BodyLarge>{schoolData?.board}</BodyLarge>
                    </Box>
                  </HStack>
                </Box>
              </VStack>
            </Box>
          </Box>
        </VStack>
      </>
    )
  );
}
export default SchoolAddressCard;
