import React from "react";
import { BodyLarge, H2, overrideColorTheme } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import { Box, Button, HStack, Stack, VStack } from "native-base";
import { useNavigate } from "react-router-dom";
import VideoBox from "./VideoBox";
import colorTheme from "../colorTheme";
import VideoActionsheet from "./Actionsheet/VideoActionsheet";
import CommentActionsheet from "./Actionsheet/CommentActionsheet";
import LikeActionsheet from "./Actionsheet/LikeActionsheet";

const colors = overrideColorTheme(colorTheme);

export default function VideoComponent({
  data,
  leftTitle,
  rightTitle,
  seeButton,
  seeButtonText,
  _seeButton,
  _videoBox,
  appName,
  _box,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [video, setVideo] = React.useState({});
  const [showModuleComments, setShowModuleComments] = React.useState(false);
  const [comments, setCommets] = React.useState([]);
  const [showModuleLike, setShowModuleLike] = React.useState(false);

  const handleLikeModuleOpen = () => {
    setShowModuleLike(true);
  };
  const handleLikeModuleClose = () => {
    setShowModuleLike(false);
  };

  const handleCommentModuleOpen = () => {
    setShowModuleComments(true);
  };

  const handleCommentModuleClose = () => {
    setShowModuleComments(false);
  };

  return (
    <Box {..._box}>
      <HStack justifyContent="space-between" py="5" alignItems="center">
        {leftTitle ? <H2>{leftTitle}</H2> : ""}
        {rightTitle ? (
          <Button
            variant="ghost"
            onPress={(e) => navigate("/mylearning/video/list")}
          >
            <BodyLarge color={colors.primary}>{rightTitle}</BodyLarge>
          </Button>
        ) : (
          <React.Fragment />
        )}
      </HStack>
      {data.length > 0 ? (
        <Stack>
          <VStack space={3}>
            {data.map((item, index) => {
              return (
                <VideoBox
                  _addIconButton={{ onPress: (e) => setVideo(item) }}
                  appName={appName}
                  canShare={true}
                  key={index}
                  {...{ item, url: `/mylearning/video/${item.id}/view` }}
                  {..._videoBox}
                />
              );
            })}
          </VStack>
          {seeButton ? (
            seeButton
          ) : (
            <Button
              mt="2"
              variant="outline"
              colorScheme="button"
              rounded="lg"
              onPress={(e) => navigate("/mylearning/video/list")}
              {..._seeButton}
            >
              {seeButtonText}
            </Button>
          )}
        </Stack>
      ) : (
        <Box
          p="10"
          my="5"
          alignItems={"center"}
          rounded="lg"
          bg={colors.viewNotificationDark}
        >
          {t("VIDEO_NOT_FOUND")}
        </Box>
      )}

      <VideoActionsheet
        {...{
          config: ["duration", "dueDate", "source"],
          video,
          setVideo,
          handleCommentModuleOpen,
          handleLikeModuleOpen,
        }}
      />
      <LikeActionsheet
        {...{
          setShowModuleLike: handleLikeModuleClose,
          showModuleLike,
          likeUsers: ["1", "2", "3", "4"],
        }}
      />
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
    </Box>
  );
}
