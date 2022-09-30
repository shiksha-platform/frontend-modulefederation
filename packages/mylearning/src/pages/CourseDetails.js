import React from "react";
import {
  BodySmall,
  H1,
  H2,
  IconByName,
  Layout,
  Collapsible,
  coursetrackingRegistryService,
  likeRegistryService,
  Loading,
  useWindowSize,
  H3,
  courseRegistryService,
} from "@shiksha/common-lib";
import { Avatar, Box, HStack, Pressable, VStack } from "native-base";
import manifestLocal from "../manifest.json";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CourseBox from "../components/CourseBox";
import SunbirdVideoPlayer from "components/SunbirdVideoPlayer";

export default function CourseDetails({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [course, setCourse] = React.useState({});
  const [showModule, setShowModule] = React.useState(false);
  const [like, setLike] = React.useState({});
  const { id } = useParams();
  const [playerContent, setPlayerContent] = React.useState();
  const [width, height] = useWindowSize();
  const [loading, setLoading] = React.useState(true);

  const handleLike = async () => {
    if (like.id) {
      const result = await likeRegistryService.distory({
        id: like.id,
      });
      setLike(like);
    } else {
      let newData = {
        userId: localStorage.getItem("id"),
        contextId: id,
        context: "course",
        type: "like",
      };
      const likeId = await likeRegistryService.create(newData);
      setLike({ ...newData, id: likeId });
    }
  };

  React.useEffect(async () => {
    const result = await coursetrackingRegistryService.getOne({ id });
    setCourse(result);

    let newData = {
      userId: { eq: localStorage.getItem("id") },
      contextId: { eq: result?.id },
      context: { eq: "course" },
      type: { eq: "like" },
    };
    const data = await likeRegistryService
      .getAll(newData)
      .catch((e) => console.log(e.message));
    setLike(data[0] ? data[0] : null);
    const localPlayerContent = localStorage.getItem("playerContent");
    let localData = JSON.parse(localPlayerContent);
    if (localData) {
      if (
        [
          "application/vnd.ekstep.ecml-archive",
          "application/vnd.ekstep.html-archive",
        ].includes(localData?.mimeType)
      ) {
        let resultData = await courseRegistryService.getContent({
          id: localData?.identifier,
          adapter: result?.source,
        });
        setPlayerContent(resultData);
      } else {
        setPlayerContent(localData);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (playerContent) {
    return (
      <Loading
        _center={{ alignItems: "center", width: "100%" }}
        customComponent={
          <VStack {...{ width, height }}>
            <IconByName
              name="CloseCircleLineIcon"
              onPress={() => {
                setPlayerContent();
                localStorage.removeItem("playerContent");
              }}
              position="absolute"
              zIndex="10"
              right="4px"
              top="4px"
              _icon={{ size: 40 }}
              bg="white"
              p="0"
              rounded="full"
            />
            <SunbirdVideoPlayer {...playerContent} />
          </VStack>
        }
      />
    );
  }

  return (
    <Layout
      _header={{
        headingComponent: <H1>{course?.name}</H1>,
        iconComponent: (
          <HStack>
            <IconByName
              name={like?.id ? "Heart3FillIcon" : "Heart3LineIcon"}
              color={like?.id ? "mylearning.primary" : "mylearning.black"}
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
      _subHeader={{ bg: "mylearning.cardBg" }}
      bg={"mylearning.white"}
      _appBar={{
        languages: manifestLocal.languages,
      }}
      _footer={footerLinks}
    >
      <VStack space="2">
        <Box bg={"mylearning.white"} p="5">
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
              bg={"mylearning.primaryLight"}
              borderWidth="1"
              borderColor={"mylearning.primaryDark"}
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
        {course?.children ? (
          course?.children.map((item, index) => (
            <Collapsible
              key={index}
              _header={{ bg: "mylearning.white", p: 5 }}
              _box={{ bg: "transparent", p: 0 }}
              defaultCollapse={!index}
              header={
                <VStack>
                  <H2 px={2}>{item?.name}</H2>
                </VStack>
              }
              fontSize="2px"
            >
              <VStack space={5} p={5}>
                {item?.children ? (
                  item?.children.map((subItem, subIndex) => (
                    <Pressable
                      bg={"mylearning.white"}
                      key={subIndex}
                      onPress={() => {
                        localStorage.setItem(
                          "playerContent",
                          JSON.stringify({
                            mode: "false",
                            ...subItem,
                          })
                        );
                        setLoading(true);
                        window.location.reload();
                      }}
                      p="5"
                      rounded={"lg"}
                      shadow={4}
                    >
                      <HStack
                        justifyContent={"space-between"}
                        alignItems="center"
                      >
                        <HStack space={4} alignItems="center">
                          {subItem?.posterImage ? (
                            <Avatar
                              source={{ uri: subItem?.posterImage }}
                              bg="transparent"
                              style={{ borderRadius: 0 }}
                              p="1"
                              shadow={4}
                            />
                          ) : (
                            <React.Fragment />
                          )}
                          <H2>{subItem?.name}</H2>
                        </HStack>
                        <H3>
                          {subItem?.mimeType === "application/pdf"
                            ? "PDF"
                            : subItem?.mimeType === "video/mp4"
                            ? "Video"
                            : [
                                "application/vnd.sunbird.question",
                                "application/vnd.sunbird.questionset",
                              ].includes(subItem?.mimeType)
                            ? "QUML"
                            : [
                                "application/vnd.ekstep.ecml-archive",
                                "application/vnd.ekstep.html-archive",
                              ].includes(subItem?.mimeType)
                            ? "Content"
                            : ""}
                        </H3>
                      </HStack>
                    </Pressable>
                  ))
                ) : (
                  <React.Fragment />
                )}
              </VStack>
            </Collapsible>
          ))
        ) : (
          <React.Fragment />
        )}
      </VStack>
    </Layout>
  );
}
