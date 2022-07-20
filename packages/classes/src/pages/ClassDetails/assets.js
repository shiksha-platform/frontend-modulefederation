import React from "react";
import { useTranslation } from "react-i18next";
import {
  Collapsible,
  H2,
  IconByName,
  classRegistryService,
  overrideColorTheme,
  H1,
  BodySmall,
} from "@shiksha/common-lib";
import { Stack, Box, VStack, HStack, Menu, Pressable } from "native-base";
import colorTheme from "../../colorTheme";

const colors = overrideColorTheme(colorTheme);

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
          borderColor: colors.coolGraydark,
        }}
        borderColor={colors.lightGrayBg}
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
                  borderColor={colors.primary}
                  px="6px"
                  _text={{
                    color: colors.primary,
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
      <Box
        borderBottomWidth="1"
        _dark={{
          borderColor: colors.coolGraydark,
        }}
        borderColor={colors.lightGrayBg}
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
                  borderColor={colors.primary}
                  px="6px"
                  _text={{
                    color: colors.primary,
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
                  borderColor={colors.primary}
                  px="6px"
                  _text={{
                    color: colors.primary,
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
              <H2 color={colors.white}>{data?.name}</H2>
              <H1 color={colors.white}>{t("CLASS_DETAILS")}</H1>
            </VStack>
            {/* <HStack alignItems="center">
              <Box px="3">
                <Menu
                  right="100%"
                  width="150"
                  trigger={(triggerProps) => {
                    return (
                      <Pressable {...triggerProps}>
                        <IconByName
                          isDisabled
                          color={colors.white}
                          name="CameraLineIcon"
                        />
                      </Pressable>
                    );
                  }}
                >
                  {/* <Menu.Item>
                    <Pressable onPress={onFileUpload}>
                      <BodySmall>{t("REMOVE_PHOTO")}</BodySmall>
                    </Pressable>
                  </Menu.Item> */}
            {/* <Menu.Item>
                    <BodySmall>{t("UPLOAD_PHPTP")}</BodySmall>
                    <input
                      type="file"
                      style={{
                        opacity: 0,
                        width: "100%",
                        position: "absolute",
                        padding: "5px",
                        zIndex: "10",
                        top: "5px",
                        left: "0",
                      }}
                      onChange={onFileUpload}
                    />
                  </Menu.Item> */}
            {/* </Menu> */}
            {/* </Box>
              <IconByName color={colors.white} name="ShareLineIcon" />}
            </HStack> } */}
          </HStack>
        </Box>
      </Box>
    ),
  };
};
