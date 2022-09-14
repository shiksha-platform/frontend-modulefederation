import {
  IconByName,
  overrideColorTheme,
  H2,
  Subtitle,
  Caption,
  BodyMedium,
  lessonPlansRegistryService,
  likeRegistryService,
  telemetryFactory,
  capture,
} from "@shiksha/common-lib";
import {
  Avatar,
  Box,
  HStack,
  Pressable,
  Stack,
  Text,
  VStack,
  Link,
} from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
// import {
//   LinkedinShareButton,
//   LinkedinIcon,
//   WhatsappIcon,
//   WhatsappShareButton,
// } from "react-share";
import colorTheme from "colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function LessonPlansCard({ item, url, canShare, appName }) {
  const { t } = useTranslation();
  const [like, setLike] = React.useState({});
  const [likes, setLikes] = React.useState([]);
  const [showButtonArray, setShowButtonArray] = React.useState([]);
  const [comments, setComments] = React.useState([]);
  const navigate = useNavigate();
  const [random, setRandom] = React.useState();
  const { sub } = jwt_decode(localStorage.getItem("token"));

  React.useEffect(async (e) => {
    setRandom(Math.floor(Math.random() * (4 - 1) + 1) - 1);
    await getLikes();
    await getComments();
    // if (item.state === DRAFT) {
    //   setShowButtonArray(["Like"]);
    // } else {
    //   setShowButtonArray(canShowButtonArray);
    // }
    setShowButtonArray(["Like", "Share", "Download"]);
  }, []);

  const getLikes = async () => {
    const result = await lessonPlansRegistryService.getLessonPlansLikes(
      item.id
    );
    const newData = result.find((e, index) => e.userId === sub);
    setLikes(result ? result : []);
    setLike(newData ? newData : {});
  };

  const getComments = async () => {
    const result = await lessonPlansRegistryService.getLessonPlansComments(
      item.id
    );
    setComments(result ? result : []);
  };

  const handleLike = async () => {
    if (like.id) {
      const result = await likeRegistryService.distory({
        id: like.id,
      });
      setLike({});
      const newData = likes.filter((e) => e.id !== like.id);
      setLikes(newData);
    } else {
      let newData = {
        contextId: item?.id,
        context: "Lessonplan",
        type: "like",
      };
      const { osid } = await likeRegistryService.create(newData);
      const telemetryData = telemetryFactory.interact({
        appName,
        type: "Lessonplan-Like",
        worksheetId: item?.id,
        subject: item?.subject,
        grade: item?.grade,
        topic: item?.topic,
      });
      capture("INTERACT", telemetryData);
      const newObject = { ...newData, id: osid };
      setLike(newObject);
      setLikes([...likes, newObject]);
    }
  };

  const handleDownload = () => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Lessonplan-Download",
      worksheetId: item?.id,
      subject: item?.subject,
      grade: item?.grade,
      topic: item?.topic,
    });
    capture("INTERACT", telemetryData);
    //navigate("/lessonplan/template");
  };

  const handleShare = () => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Lessonplan-Share",
      worksheetId: item?.id,
      subject: item?.subject,
      grade: item?.grade,
      topic: item?.topic,
    });
    capture("INTERACT", telemetryData);
    navigate(`/lessonplan/${item.id}/share`);
  };

  return (
    <Box p="5" borderWidth="1" borderColor={colors.grayLight} rounded="lg">
      <VStack space={4}>
        <HStack justifyContent="space-between" alignItems="flex-start">
          <Pressable onPress={() => (url ? navigate(url) : "")}>
            <HStack space={2} alignItems="center">
              <Avatar bg={colors[random]} size="57" rounded="md">
                <H2 color="white">{item.name?.toUpperCase().substr(0, 1)}</H2>
              </Avatar>
              <Stack space="1">
                <VStack space="1px">
                  <H2>{item?.name}</H2>
                </VStack>

                <HStack space={1} alignItems="center">
                  <IconByName
                    name="Heart3FillIcon"
                    color="red.500"
                    _icon={{ size: 12 }}
                    isDisabled
                  />
                  <Caption>{(likes ? likes.length : 0) + " likes"}</Caption>

                  <Caption>
                    ({(comments ? comments.length : 0) + " comments"})
                  </Caption>
                </HStack>
              </Stack>
            </HStack>
          </Pressable>
        </HStack>
        <BodyMedium
          color={colors.worksheetText}
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
          }}
        >
          {item?.description}
        </BodyMedium>
        <HStack space="2" justifyContent="space-between" alignItems="baseline">
          <VStack space="2">
            <HStack space="1" alignItems="baseline" flex={1}>
              <IconByName
                name="GitRepositoryLineIcon"
                _icon={{ size: 12 }}
                p="0"
              />
              <Subtitle>{"Source: " + item?.source}</Subtitle>
            </HStack>
            <HStack space="1" alignItems="center">
              <IconByName name="SurveyLineIcon" _icon={{ size: 12 }} p="0" />
              <Subtitle>{"Subject: " + item?.subject[0]}</Subtitle>
            </HStack>
            <HStack space="1" alignItems="center">
              <IconByName name="ArticleLineIcon" _icon={{ size: 12 }} p="0" />
              <Subtitle>{"Downloads: " + item?.downloads}</Subtitle>
            </HStack>
          </VStack>
          <VStack space="2">
            <HStack space="1" alignItems="center">
              <IconByName name="TimeLineIcon" _icon={{ size: 12 }} p="0" />
              <Subtitle>{"Duration: " + item?.duration}</Subtitle>
            </HStack>
            <HStack space="1" alignItems="center">
              <IconByName
                name="LightbulbFlashLineIcon"
                _icon={{ size: 12 }}
                p="0"
              />
              <Subtitle>{"Grade: " + item?.gradeLevel}</Subtitle>
            </HStack>
          </VStack>
        </HStack>
        <HStack space="2">
          {!showButtonArray || showButtonArray.includes("Like") ? (
            <Box shadow="2" p="2" rounded="full">
              <IconByName
                name={like.id ? "Heart3FillIcon" : "Heart3LineIcon"}
                _icon={{ size: 20 }}
                color={colors.primary}
                p="0"
                onPress={handleLike}
              />
            </Box>
          ) : (
            <React.Fragment />
          )}
          {!showButtonArray || showButtonArray.includes("Share") ? (
            <Box shadow="2" p="2" rounded="full">
              <IconByName
                name="ShareLineIcon"
                _icon={{ size: 20 }}
                color="warmGray.700"
                p="0"
                onPress={handleShare}
              />
            </Box>
          ) : (
            <React.Fragment />
          )}
          {!showButtonArray || showButtonArray.includes("Download") ? (
            <Box shadow="2" p="2" rounded="full">
              <Link href={"https://" + item.downloadUrl} isExternal>
                <IconByName
                  onPress={handleDownload}
                  name="DownloadLineIcon"
                  _icon={{ size: 20 }}
                  color="warmGray.700"
                  p="0"
                />
              </Link>
            </Box>
          ) : (
            <React.Fragment />
          )}
        </HStack>
      </VStack>
    </Box>
  );
}
