import React from "react";
import {
  BodySmall,
  H2,
  IconByName,
  Layout,
  Collapse,
  overrideColorTheme,
  Collapsible,
} from "@shiksha/common-lib";
import { Box, HStack, VStack } from "native-base";
import manifestLocal from "../manifest.json";
import { courses as coursesData } from "../config/mylearning";
import colorTheme from "../colorTheme";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CourseBox from "../components/CourseBox";
import VideoBox from "components/VideoBox";

const colors = overrideColorTheme(colorTheme);

export default function CourseDetails({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [course, setCourse] = React.useState({});
  const [showModule, setShowModule] = React.useState(false);
  const [like, setLike] = React.useState({});
  const { id } = useParams();

  const handleLike = async () => {
    if (like.id) {
      //   const result = await likeRegistryService.distory({
      //     id: like.id,
      //   });
      setLike({});
    } else {
      //   let newData = {
      //     contextId: id,
      //     context: "course",
      //     type: "like",
      //   };
      //   const { osid } = await likeRegistryService.create(newData);
      //   setLike({ ...newData, id: osid });
      setLike({});
    }
  };

  React.useEffect(async () => {
    setCourse(coursesData.find((e) => e.id == id));
  }, []);

  return (
    <Layout
      _header={{
        title: course?.name,
        iconComponent: (
          <HStack>
            <IconByName
              name={like.id ? "Heart3FillIcon" : "Heart3LineIcon"}
              color={like.id ? colors.primary : colors.black}
              onPress={handleLike}
            />
            <IconByName name="ShareLineIcon" />
          </HStack>
        ),
      }}
      subHeader={
        <HStack alignItems="center" justifyContent="space-between">
          <H2 textTransform="inherit">{t("SEE_COURSE_CONTENTS")}</H2>
          <IconByName
            p="0"
            name="InformationLineIcon"
            onPress={(e) => setShowModule(true)}
          />
        </HStack>
      }
      _subHeader={{ bg: colors.cardBg }}
      bg={colors.white}
      _appBar={{
        languages: manifestLocal.languages,
      }}
      _footer={footerLinks}
    >
      <VStack space="2">
        <Box bg={colors.white} p="5">
          <VStack space="2">
            <CourseBox
              {...{
                canShowButtonArray: [],
                item: course,
                appName,
                isHeaderHide: true,
                _box: { p: "0", borderWidth: "0" },
              }}
            />
            <Box
              bg={colors.courseDetailsBoxBg}
              borderWidth="1"
              borderColor={colors.courseDetailsBoxBorder}
              rounded="md"
            >
              <HStack alignItems="center" space={1}>
                <IconByName
                  _icon={{ size: 15 }}
                  color="green.500"
                  name="ShieldStarLineIcon"
                />
                <BodySmall>
                  {t("200 Teachers have completed this course")}
                </BodySmall>
              </HStack>
            </Box>
          </VStack>
        </Box>
        <Box bg={colors.white}>
          <Collapsible
            defaultCollapse={true}
            header={
              <VStack>
                <H2 px={2} fontWeight={600}>
                  {t("Video 1")}
                </H2>
              </VStack>
            }
            fontSize="2px"
          ></Collapsible>
        </Box>
        <Box bg={colors.white}>
          <Collapsible
            defaultCollapse={true}
            header={
              <VStack>
                <H2 px={2} fontWeight={600}>
                  {t("Video 2")}
                </H2>
              </VStack>
            }
            fontSize="2px"
          >
            <Box py="5">
              <VideoBox
                appName={appName}
                canShare={true}
                {...{
                  item: course,
                  url: `/mylearning/video/${course.id}/view`,
                }}
              />
            </Box>
          </Collapsible>
        </Box>
        <Box bg={colors.white}>
          <Collapsible
            defaultCollapse={true}
            header={
              <VStack>
                <H2 px={2}>{t("Class Test")}</H2>
              </VStack>
            }
            fontSize="2px"
          ></Collapsible>
        </Box>

        <Box bg={colors.white}>
          <Collapsible
            defaultCollapse={true}
            header={
              <VStack>
                <H2 px={2}>{t("Surprise test")}</H2>
              </VStack>
            }
            fontSize="2px"
          ></Collapsible>
        </Box>
      </VStack>
    </Layout>
  );
}
