import React from "react";
import { Center, Heading, Spinner, Text, VStack } from "native-base";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "@shiksha/common-lib";

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
              color={"button.500"}
              accessibilityLabel="Loading posts"
              size="50"
            />
            <VStack alignItems="center" space={2}>
              <Text fontSize="22px" color="button.500">
                {success ? success : ""}
              </Text>
              <Text fontSize="22px" color="button.500">
                {fail ? fail : ""}
              </Text>
              <Heading color="button.500" fontSize="22px">
                {t("MARKING_ALL_STUDENTS_PRESENT")}
              </Heading>
            </VStack>
          </VStack>
        </VStack>
      </Center>
    </Center>
  );
};

export default Loader;
