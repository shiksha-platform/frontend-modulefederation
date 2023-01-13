import React from "react";
import {
  BodyLarge,
  H2,
  overrideColorTheme,
  coursetrackingRegistryService,
  telemetryFactory,
  capture,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import { Box, Button, HStack, Stack, VStack } from "native-base";
import { useNavigate } from "react-router-dom";
import CourseBox from "./CourseBox";
import colorTheme from "../colorTheme";
import CourseActionsheet from "./Actionsheet/CourseActionsheet";
import CommentActionsheet from "./Actionsheet/CommentActionsheet";
import LikeActionsheet from "./Actionsheet/LikeActionsheet";
import moment from "moment";

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
  const [likes, setLikes] = React.useState([]);
  const [comments, setComments] = React.useState([]);
  const [showModuleLike, setShowModuleLike] = React.useState(false);
  const [commentStartTime, setCommentStartTime] = React.useState();

  const handleLikeModuleOpen = async () => {
    const result = await coursetrackingRegistryService.getLikes(course.id);
    setLikes(result ? result : []);
    setShowModuleLike(true);
  };
  const handleLikeModuleClose = () => {
    setShowModuleLike(false);
  };

  const handleModuleOpen = async (item) => {
    setCourse(item);
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Course-Exploring-Info",
      courseId: item?.courseId,
      source: item.source,
      subject: item?.subject,
    });
    capture("INTERACT", telemetryData);
  };

  const handleCommentModuleOpen = async () => {
    const result = await coursetrackingRegistryService.getComments(course.id);
    setComments(result ? result : []);
    setShowModuleComments(true);
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Course-Comment-Exploring-Start",
      courseId: course?.courseId,
      source: course.source,
      subject: course?.subject,
    });
    capture("START", telemetryData);
    setCommentStartTime(moment());
  };

  const handleCommentModuleClose = () => {
    setShowModuleComments(false);
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Course-Comment-Exploring-End",
      courseId: course?.courseId,
      source: course.source,
      subject: course?.subject,
      duration: commentStartTime
        ? moment().diff(commentStartTime, "seconds")
        : 0,
    });
    capture("END", telemetryData);
    setCommentStartTime();
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
                  _addIconButton={{ onPress: (e) => handleModuleOpen(item) }}
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
          likeUsers: likes,
        }}
      />
      <CommentActionsheet
        {...{
          item: course,
          setShowModuleComments: handleCommentModuleClose,
          showModuleComments,
          context: "CourseTracking",
          comments,
          setComments,
          _actionSheetContent: { bg: "mylearning.cardBg" },
        }}
      />
    </Box>
  );
}
