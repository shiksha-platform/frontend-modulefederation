import { useTranslation } from "react-i18next";
import { Collapsible, H2, Heading1 } from "@shiksha/common-lib";
import { Stack, Box, Center, VStack } from "native-base";

export const routes = () => {
  const { t } = useTranslation();
  return [
    {
      title: t("SCIENCE"),
      component: (
        <Box>
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: "gray.600",
            }}
            borderColor="coolGray.200"
            pr="1"
            py="4"
          >
            <Stack space={2}>
              <Collapsible header={t("ASSIGNMENTS")} />
            </Stack>
          </Box>
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: "gray.600",
            }}
            borderColor="coolGray.200"
            pr="1"
            py="4"
          >
            <Stack space={2}>
              <Collapsible header={t("LESSON_PLANS")} />
            </Stack>
          </Box>
          <Box pr="1" py="4">
            <Stack space={2}>
              <Collapsible header={t("ASSESSMENTS")} />
            </Stack>
          </Box>
        </Box>
      ),
    },
    {
      title: t("MATHS"),
      component: (
        <Center flex={1} p={4}>
          This is Tab {t("MATHS")}
        </Center>
      ),
    },
    {
      title: t("ENGLISH"),
      component: (
        <Center flex={1} p={4}>
          This is Tab {t("ENGLISH")}
        </Center>
      ),
    },
    {
      title: t("HISTORY"),
      component: (
        <Center flex={1} p={4}>
          This is Tab {t("HISTORY")}
        </Center>
      ),
    },
    {
      title: t("GEOGRAPHY"),
      component: (
        <Center flex={1} p={4}>
          This is Tab {t("GEOGRAPHY")}
        </Center>
      ),
    },
  ];
};

export const _header = (name) => {
  const { t } = useTranslation();
  return {
    title: t("MY_CLASSES"),
    fullRightComponent: (
      <Box minH={"150px"}>
        <Box
          position={"absolute"}
          style={{ backgroundColor: "rgba(24, 24, 27, 0.4)" }}
          bottom={0}
          p={5}
          width={"100%"}
        >
          <VStack>
            <H2 color="gray.100" fontWeight="700">
              {name}
            </H2>

            <Heading1 color="gray.100" fontWeight="700" fontSize="2xl">
              {t("CLASS_DETAILS")}
            </Heading1>
          </VStack>
        </Box>
      </Box>
    ),
  };
};
