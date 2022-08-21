import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import VideoPlayer from "components/VideoPlayer";
import jwt_decode from "jwt-decode";
import {
  Layout,
  IconByName,
  worksheetRegistryService,
  lessonPlansRegistryService,
  Loading,
  likeRegistryService,
  Collapsible,
  H2,
  overrideColorTheme,
  Subtitle,
  H4,
  telemetryFactory,
  capture,
} from "@shiksha/common-lib";
import {
  Button,
  Box,
  HStack,
  VStack,
  Text,
  Stack,
  Avatar,
  Pressable,
  Link,
} from "native-base";
import manifest from "../manifest.json";
import { useNavigate, useParams } from "react-router-dom";
import CommentActionSheet from "components/config/ActionSheets/CommentActionSheet";
import LessonPlansActionSheet from "components/config/ActionSheets/LessonPlansActionsheet";
import LikeActionSheet from "components/config/ActionSheets/LikeActionSheet";
import { SingleLessonPlanDetails } from "components/config/SingleLessonPlanDetails";
import { lessonPlansList } from "components/config/lessonPlansList";
import { videoListData } from "components/config/VideoListData";
import FloatingVideoPlayer from "components/FloatingVideoPlayer";
import VideoCard from "components/VideosCard";
import colorTheme from "colorTheme";

const colors = overrideColorTheme(colorTheme);

export default function SingleLessonPlan({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [lessonPlan, setLessonPlan] = React.useState({});
  const [showModuleLessonPlan, setShowModuleLessonPlan] = useState(false);
  const [showModuleComments, setShowModuleComments] = useState(false);
  const [showModuleLikes, setShowModuleLikes] = useState(false);
  const [like, setLike] = useState({});
  const [likes, setLikes] = useState([]);
  const [state, setState] = useState(false);
  const [loading, setLoading] = React.useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { sub } = jwt_decode(localStorage.getItem("token"));
  const [comments, setCommets] = React.useState([]);
  const [showVideo, setShowVideo] = useState(true);

  const handleOnClose = () => {
    setShowVideo(false);
  };

  React.useEffect(async () => {
    console.log("id", id);
    const lessonPlansData = await lessonPlansRegistryService.getOne({ id });
    // console.log(lessonPlansData1);
    //const lessonPlansData = lessonPlansList[4];
    console.log("lessonPlansData", lessonPlansData);
    setLessonPlan(lessonPlansData);
    getLikes();
    const data = await lessonPlansRegistryService.getLessonPlansComments(id);
    setCommets(data);
    setLoading(false);
  }, []);

  const handleCommentModuleClose = () => {
    setShowModuleComments(false);
    setShowModuleLessonPlan(true);
    setShowModuleLikes(false);
  };

  const handleCommentModuleOpen = () => {
    setShowModuleComments(true);
    setShowModuleLessonPlan(false);
    setShowModuleLikes(false);
  };

  const handleLikeModuleClose = () => {
    setShowModuleComments(false);
    setShowModuleLikes(false);
    setShowModuleLessonPlan(true);
  };

  const handleLikeModuleOpen = () => {
    setShowModuleComments(false);
    setShowModuleLessonPlan(false);
    setShowModuleLikes(true);
  };

  const getLikes = async () => {
    const result = await lessonPlansRegistryService.getLessonPlansLikes(id);
    // const newData = result.find((e, index) => e.userId === sub);
    const newData = result.find(
      (e, index) => e.userId === localStorage.getItem("id")
    );
    setLike(newData ? newData : {});
    setLikes(result);
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
        context: "Lessonplans",
        type: "like",
      };
      const { osid } = await likeRegistryService.create(newData);
      setLike({ ...newData, id: osid });
    }
  };

  const handleShare = () => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Lessonplan-Share",
      worksheetId: lessonPlan?.id,
      subject: lessonPlan?.subject[0],
      grade: lessonPlan?.gradeLevel[0],
      topic: lessonPlan?.topic[0],
    });
    capture("INTERACT", telemetryData);
    navigate(`/lessonplan/${lessonPlan.id}/share`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout
      _header={{
        //title: lessonPlan?.name,
        title: "History of World",
        iconComponent: (
          <HStack>
            <IconByName
              name="InformationLineIcon"
              onPress={(e) => setShowModuleLessonPlan(true)}
            />
            {/* {state ? (
                            <IconByName
                                name="EditBoxLineIcon"
                                onPress={(e) => navigate(`/lessonplans/${lessonPlans?.id}/edit`)}
                            />
                        ) : (
                            <React.Fragment />
                        )} */}
          </HStack>
        ),
      }}
      bg="white"
      _appBar={{
        languages: manifest.languages,
        rightIcon: !state ? (
          <HStack>
            <IconByName
              name={like.id ? "Heart3FillIcon" : "Heart3LineIcon"}
              color={like.id ? "button.500" : "black.500"}
              onPress={handleLike}
            />
            <IconByName name="ShareLineIcon" onPress={handleShare} />
            <Link href={"https://" + lessonPlan.downloadUrl} isExternal>
              <IconByName
                //onPress={(e) => navigate(lessonPlan.downloadUrl)}
                name="DownloadLineIcon"
              />
            </Link>
          </HStack>
        ) : (
          <React.Fragment />
        ),
      }}
      _footer={footerLinks}
    >
      <Box bg="white" p="5">
        <VStack space="5">
          {SingleLessonPlanDetails && SingleLessonPlanDetails.length > 0 ? (
            SingleLessonPlanDetails.map((item, index) => (
              <Box
                key={index}
                borderWidth="1"
                borderColor={colors.cardBgLight}
                my="0"
                p="0"
                rounded="10"
              >
                <Collapsible
                  header={<H2>{item.Name}</H2>}
                  _header={{ pb: "5" }}
                >
                  <VStack space={3} alignItems="left">
                    {item.Description !== "" && <Text>{item.Description}</Text>}
                    <VStack space={1} alignItems="left">
                      {item.Points.length > 0 &&
                        item.Points.map((item, index) => (
                          <Text key={index}>• {item}</Text>
                        ))}
                    </VStack>
                  </VStack>
                </Collapsible>
              </Box>
            ))
          ) : (
            <Box
              p="10"
              my="5"
              alignItems={"center"}
              rounded="lg"
              bg="viewNotification.600"
            >
              Lesson Plan Not Found
            </Box>
          )}
          <Box bg="white" p="5">
            <H2 pb={"5"}>Related Videos</H2>
            <VStack space="5">
              {videoListData && videoListData.length > 0 ? (
                videoListData.slice(0, 2).map((item, index) => {
                  return (
                    <VideoCard
                      appName={appName}
                      index={index}
                      canShare={true}
                      key={index}
                      {...{ item, url: `/video/${item.id}` }}
                    />
                  );
                })
              ) : (
                <Box
                  p="10"
                  my="5"
                  alignItems={"center"}
                  rounded="lg"
                  bg="viewNotification.600"
                >
                  {t("VIDEO_NOT_FOUND")}
                </Box>
              )}
              <Box alignItems="center" p="3">
                <Pressable
                  alignItems="center"
                  onPress={(e) => navigate(`/videos/list`)}
                >
                  {/* <Pressable alignItems="center" onPress={(e) => console.log(e)}> */}
                  <Text color="button.500">{"Show More"}</Text>
                </Pressable>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Box>
      <CommentActionSheet
        {...{
          lessonPlan,
          setShowModuleComments: handleCommentModuleClose,
          showModuleComments,
          comments,
          setCommets,
        }}
      />
      <LikeActionSheet
        {...{
          lessonPlan,
          setShowModuleLikes: handleLikeModuleClose,
          showModuleLikes,
          likes,
          setLikes,
        }}
      />
      <LessonPlansActionSheet
        {...{
          lessonPlan,
          showModuleLessonPlan,
          setShowModuleLessonPlan,
          handleCommentModuleOpen,
          handleLikeModuleOpen,
          commentCount: comments?.length,
          likeCount: likes?.length,
        }}
      />
      {/* {showVideo && (
                <Draggable>
                    <Box position="sticky" bottom="50" maxH="200px" maxW="300px">
                        <HStack>
                            <Box>
                                <IconByName
                                    size='sm'
                                    name='CloseCircleLineIcon'
                                    //color={color ? color : ''}
                                    onPress={(e) => handleOnClose()}
                                />
                            </Box>
                        </HStack>
                        <VideoPlayer url={"http://techslides.com/demos/sample-videos/small.mp4"} />
                    </Box>
                </Draggable>
            )} */}
      {/* <FloatingVideoPlayer /> */}
    </Layout>
  );
}
