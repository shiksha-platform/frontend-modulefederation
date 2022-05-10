import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "@shiksha/common-lib";
import { colourPalette } from "constants/colours";
import { Box, Button, Text, VStack, Divider } from "native-base";
import { worksheets } from "config/worksheet";

export default function ViewWorksheet({ footerLinks }) {
  const { t } = useTranslation();

  const translationCheck = (name, title) => {
    return (t(name) !== name && t(name)) || title;
  };

  return (
    <Box bg="white">
      <Layout
        _header={{
          title: translationCheck("MY_CLASSES", "View Worksheet"),
          icon: "Group",
          subHeading: "Test",
          _subHeading: { fontWeight: 500, textTransform: "uppercase" },
          avatar: true,
        }}
        bg="white"
        _appBar={{ languages: ["en"] }}
        subHeader={t("THE_CLASSES_YOU_TAKE")}
        _subHeader={{
          bg: colourPalette.primary,
          _text: {
            fontSize: "16px",
            fontWeight: "600",
            textTransform: "inherit",
          },
        }}
        _footer={footerLinks}
      >
        {worksheets &&
          worksheets.map((sheet, i) => (
            <Box mt="4" mx="4">
              <Box
                border="2"
                borderRadius="2xl"
                key={i}
                p="3"
                borderColor={colourPalette.primary}
                borderWidth="1"
              >
                <VStack space="4" divider={<Divider />}>
                  <Box px="4" pt="4">
                    NativeBase
                  </Box>
                  <Box px="3">
                    {sheet.description}
                  </Box>
                  <Box px="4" pb="4">
                    GeekyAnts
                  </Box>
                </VStack>
              </Box>
            </Box>
          ))}
      </Layout>
    </Box>
  );
}
