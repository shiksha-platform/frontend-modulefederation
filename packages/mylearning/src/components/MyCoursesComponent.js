import React from "react";
import { BodyLarge, H2, overrideColorTheme } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import { Box, Button, HStack, Stack, VStack } from "native-base";
import { useNavigate } from "react-router-dom";
import CourseBox from "./CourseBox";
import colorTheme from "../colorTheme";
import CourseActionsheet from "./Actionsheet/CourseActionsheet";
import CommentActionsheet from "./Actionsheet/CommentActionsheet";
import LikeActionsheet from "./Actionsheet/LikeActionsheet";

const colors = overrideColorTheme(colorTheme);

export default function MyCoursesComponent({
  data,
  leftTitle,
  rightTitle,
  seeButton,
  seeButtonText,
  _seeButton,
  _courseBox,
  appName,
  _box,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [course, setCourse] = React.useState({});
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
          <Button variant="ghost" onPress={(e) => navigate("/mylearning/list")}>
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
                <CourseBox
                  _addIconButton={{ onPress: (e) => setCourse(item) }}
                  appName={appName}
                  canShare={true}
                  key={index}
                  {...{ item, url: `/mylearning/${item.id}/view` }}
                  {..._courseBox}
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
              onPress={(e) => navigate("/mylearning/list")}
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
          {t("LEARNING_NOT_FOUND")}
        </Box>
      )}

      <CourseActionsheet
        {...{
          config: ["duration", "dueDate", "source"],
          course,
          setCourse,
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
          item: course,
          setShowModuleComments: handleCommentModuleClose,
          showModuleComments,
          context: "MyLearning",
          comments,
          setCommets,
        }}
      />
    </Box>
  );
}
