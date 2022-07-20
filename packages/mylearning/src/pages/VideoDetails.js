import React from "react";
import {
  BodySmall,
  H2,
  IconByName,
  Layout,
  Collapse,
  overrideColorTheme,
  Collapsible,
  Subtitle,
  BodyLarge,
  Caption,
} from "@shiksha/common-lib";
import { Avatar, Box, HStack, Pressable, VStack } from "native-base";
import manifestLocal from "../manifest.json";
import { videos as videosData } from "../config/mylearning";
import colorTheme from "../colorTheme";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import VideoPlayer from "../components/VideoPlayer";
import CommentActionsheet from "../components/Actionsheet/CommentActionsheet";
import AttributeComponent from "components/AttributeComponent";

const AttributeData = [
  { icon: "CalendarCheckLineIcon", label: "DUE_DATE", attribute: "dueDate" },
];
const colors = overrideColorTheme(colorTheme);

export default function VideoDetails({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [video, setVideo] = React.useState({});
  const [like, setLike] = React.useState({});
  const [showButtonArray, setShowButtonArray] = React.useState([]);
  const [commentCount, setCommentCount] = React.useState(0);
  const [likeCount, setLikeCount] = React.useState(0);
  const { id } = useParams();
  const [showModuleComments, setShowModuleComments] = React.useState(false);
  const [comments, setCommets] = React.useState([]);

  const handleCommentModuleOpen = () => {
    setShowModuleComments(true);
  };

  const handleCommentModuleClose = () => {
    setShowModuleComments(false);
  };

  const handleLike = async () => {
    if (like.id) {
      const result = await likeRegistryService.distory({
        id: like.id,
      });
      setLike({});
    } else {
      let newData = {
        contextId: id,
        context: "video",
        type: "like",
      };
      const { osid } = await likeRegistryService.create(newData);
      setLike({ ...newData, id: osid });
      setLike({});
    }
  };

  React.useEffect(async () => {
    setVideo(videosData.find((e) => e.id == id));
  }, []);

  return (
    <Layout
      _appBar={{
        languages: manifestLocal.languages,
        rightIcon: (
          <HStack>
            <IconByName p="0" pr="2" name="ShareLineIcon" />
            <IconByName p="0" name="Download2LineIcon" />
          </HStack>
        ),
      }}
      _footer={footerLinks}
    >
      <VStack space="1">
        <VideoPlayer url={window.appModules?.mylearning.url + "/video.mp4"} />
        <Box bg={colors.white}>
          <HStack
            p="5"
            space={5}
            alignItems="center"
            justifyContent={"space-between"}
          >
            <HStack alignItems="center" space="1">
              <IconByName
                name="Heart3FillIcon"
                color={colors.eventError}
                _icon={{ size: 12 }}
                isDisabled
              />
              <Subtitle>
                {likeCount} {t("TEACHERS_LIKE_THIS")}
              </Subtitle>
            </HStack>
            <Pressable
              onPress={(e) =>
                handleCommentModuleOpen
                  ? handleCommentModuleOpen()
                  : console.log("not found handleCommentModuleOpen")
              }
            >
              <HStack alignItems="center" space="1">
                <Avatar.Group
                  _avatar={{
                    size: "md",
                  }}
                >
                  <Avatar
                    size="xs"
                    bg="green.500"
                    source={{
                      uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                    }}
                  >
                    AJ
                  </Avatar>
                </Avatar.Group>
                <Subtitle color={colors.primary}>
                  {commentCount} {t("COMMENTS")}
                </Subtitle>
              </HStack>
            </Pressable>
          </HStack>
          <Box flex="1" px="5" py="4">
            <VStack space="4">
              <HStack space="1px" justifyContent="space-between">
                <Pressable
                  onPress={() => (url ? navigate(url) : "")}
                  width="100%"
                  flex="1"
                >
                  <BodyLarge
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "1",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {video.name}
                  </BodyLarge>
                </Pressable>
              </HStack>
              <BodyLarge
                color={colors.gray}
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {video.description}
              </BodyLarge>
              <AttributeComponent data={AttributeData} object={video} />
            </VStack>
          </Box>
        </Box>
      </VStack>
      <CommentActionsheet
        {...{
          item: video,
          setShowModuleComments: handleCommentModuleClose,
          showModuleComments,
          context: "Videos",
          comments,
          setCommets,
        }}
      />
    </Layout>
  );
}
