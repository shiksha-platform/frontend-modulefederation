import React from "react";
import { Center, Heading, Spinner, Text, VStack } from "native-base";
import { useTranslation } from "react-i18next";
import { H1, useWindowSize } from "@shiksha/common-lib";

const Loader = ({ success, fail }) => {
  const { t } = useTranslation();
  const [width, height] = useWindowSize();
  return (
    <Center flex={1} px="3">
      <Center
        _text={{
          color: "white",
          fontWeight: "bold",
        }}
        height={height}
        width={width}
      >
        <VStack space={2} alignItems={"center"}>
          <VStack space={10} alignItems="center">
            <Spinner
              color={"attendance.primary"}
              accessibilityLabel="Loading posts"
              size="lg"
            />
            <VStack alignItems="center" space={2}>
              <H1 color="attendance.primary">{success ? success : ""}</H1>
              <H1 color="attendance.primary">{fail ? fail : ""}</H1>
              <H1 color="attendance.primary">
                {t("MARKING_ALL_STUDENTS_PRESENT")}
              </H1>
            </VStack>
          </VStack>
        </VStack>
      </Center>
    </Center>
  );
};

export default Loader;
