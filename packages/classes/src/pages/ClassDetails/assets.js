import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import {
  Collapsible,
  H2,
  classRegistryService,
  H1,
  assessmentRegistryService,
} from "@shiksha/common-lib";
import { Stack, Box, VStack, HStack } from "native-base";

export const routes = (classObject, students) => {
  const { t } = useTranslation();
  const [subjects, setSubjects] = React.useState([]);

  React.useEffect(async () => {
    const data = await assessmentRegistryService.getSubjectsList({
      gradeLevel: classObject?.gradeLevel,
    });

    setSubjects(data);
  }, [classObject]);

  return subjects.map((item) => {
    return {
      title: item.name,
      component: (
        <SubjectRoute
          subject={item.code}
          classObject={classObject}
          students={students}
        />
      ),
    };
  });
};

const SubjectRoute = ({ subject, classObject, students }) => {
  const { t } = useTranslation();

  const Assessment = React.lazy(() => import("assessment/Assessment"));
  return (
    <Box>
      <Box
        borderBottomWidth="1"
        _dark={{
          borderColor: "classes.darkGray3",
        }}
        borderColor={"classes.lightGray4"}
        pr="1"
      >
        <Stack space={2}>
          <Collapsible
            header={
              <HStack alignItems="center" space="2">
                {t("ASSESSMENT")}
              </HStack>
            }
          >
            <Suspense fallback="loading...">
              <Assessment
                isLayoutNotRequired={true}
                {...{ classObject, subject, students }}
              />
            </Suspense>
          </Collapsible>
        </Stack>
      </Box>
      <Box
        borderBottomWidth="1"
        _dark={{
          borderColor: "classes.darkGray3",
        }}
        borderColor={"classes.lightGray4"}
        pr="1"
      >
        <Stack space={2}>
          <Collapsible
            header={
              <HStack alignItems="center" space="2">
                {t("LESSON_PLANS")}
                <Box
                  rounded="full"
                  borderWidth="1"
                  borderColor={"classes.primary"}
                  px="6px"
                  _text={{
                    color: "classes.primary",
                    fontSize: "10px",
                    fontWeight: "600",
                  }}
                >
                  Coming Soon...
                </Box>
              </HStack>
            }
          />
        </Stack>
      </Box>
      <Box pr="1">
        <Stack space={2}>
          <Collapsible
            header={
              <HStack alignItems="center" space="2">
                {t("ASSESSMENTS")}
                <Box
                  rounded="full"
                  borderWidth="1"
                  borderColor={"classes.primary"}
                  px="6px"
                  _text={{
                    color: "classes.primary",
                    fontSize: "10px",
                    fontWeight: "600",
                  }}
                >
                  Coming Soon...
                </Box>
              </HStack>
            }
          />
        </Stack>
      </Box>
    </Box>
  );
};

export const _header = (data) => {
  const { t } = useTranslation();
  const onFileUpload = async (event) => {
    const formData = new FormData();
    if (event.target.files) {
      const file = event.target.files[0];
      formData.append("image", file, file.name);
    } else {
      formData.image = " ";
    }
    formData.id = data?.classId;
    await classRegistryService.updateImage(formData);
    if (data?.getClass) {
      data.getClass();
    }
  };

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
          <HStack alignItems="center" justifyContent="space-between">
            <VStack>
              <H2 color={"classes.white"}>{data?.name}</H2>
              <H1 color={"classes.white"}>{t("CLASS_DETAILS")}</H1>
            </VStack>
          </HStack>
        </Box>
      </Box>
    ),
  };
};
