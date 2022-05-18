import { useTranslation } from "react-i18next";
import { Collapsible, H2 } from "@shiksha/common-lib";
import { Stack, Box, VStack, Heading, HStack } from "native-base";

export const routes = () => {
  const { t } = useTranslation();
  return [
    {
      title: t("SCIENCE"),
      component: <SubjectRoute />,
    },
    {
      title: t("MATHS"),
      component: <SubjectRoute />,
    },
    {
      title: t("ENGLISH"),
      component: <SubjectRoute />,
    },
    {
      title: t("HISTORY"),
      component: <SubjectRoute />,
    },
    {
      title: t("GEOGRAPHY"),
      component: <SubjectRoute />,
    },
  ];
};

const SubjectRoute = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Box
        borderBottomWidth="1"
        _dark={{
          borderColor: "gray.600",
        }}
        borderColor="coolGray.200"
        pr="1"
      >
        <Stack space={2}>
          <Collapsible
            header={
              <HStack alignItems="center" space="2">
                {t("ASSIGNMENTS")}
                <Box
                  rounded="full"
                  borderWidth="1"
                  borderColor="button.500"
                  px="6px"
                  fontSize="10px"
                  fontWeight="600"
                  color="button.500"
                >
                  Coming Soon...
                </Box>
              </HStack>
            }
          />
        </Stack>
      </Box>
      <Box
        borderBottomWidth="1"
        _dark={{
          borderColor: "gray.600",
        }}
        borderColor="coolGray.200"
        pr="1"
      >
        <Stack space={2}>
          <Collapsible header={t("LESSON_PLANS")} />
        </Stack>
      </Box>
      <Box pr="1">
        <Stack space={2}>
          <Collapsible header={t("ASSESSMENTS")} />
        </Stack>
      </Box>
    </Box>
  );
};

export const _header = (name) => {
  const { t } = useTranslation();
  return {
    title: t("MY_CLASSES"),
    customeComponent: (
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

            <Heading color="gray.100" fontWeight="700" fontSize="2xl">
              {t("CLASS_DETAILS")}
            </Heading>
          </VStack>
        </Box>
      </Box>
    ),
  };
};
