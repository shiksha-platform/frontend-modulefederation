import {
  capture,
  IconByName,
  worksheetRegistryService,
  telemetryFactory,
  H2,
  Caption,
  Subtitle,
  likeRegistryService,
} from "@shiksha/common-lib";
import { Avatar, Box, HStack, Pressable, Stack, VStack } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const DRAFT = "Draft";

export default function WorksheetBox({
  item,
  url,
  canShare,
  canShowButtonArray,
  _addIconButton,
  appName,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const colors = ["lightBlue.800", "indigo.900", "fuchsia.700", "rose.600"];
  const [like, setLike] = React.useState({});
  const [likes, setLikes] = React.useState([]);
  const [showButtonArray, setShowButtonArray] = React.useState([]);
  const [comments, setComments] = React.useState([]);
  const [random, setRandom] = React.useState();
  const { sub } = jwt_decode(localStorage.getItem("token"));

  React.useEffect(async (e) => {
    setRandom(Math.floor(Math.random() * (4 - 1) + 1) - 1);
    await getLikes();
    await getComments();
    if (item.state === DRAFT) {
      setShowButtonArray(["Like"]);
    } else {
      setShowButtonArray(canShowButtonArray);
    }
  }, []);

  const getLikes = async () => {
    const result = await worksheetRegistryService.getWorksheetLikes(item.id);
    const newData = result.find((e, index) => e.userId === sub);
    setLikes(result ? result : []);
    setLike(newData ? newData : {});
  };

  const getComments = async () => {
    const result = await worksheetRegistryService.getWorksheetComments(item.id);
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
        context: "Worksheet",
        type: "like",
      };
      const { osid } = await likeRegistryService.create(newData);
      const telemetryData = telemetryFactory.interact({
        appName,
        type: "Worksheet-Like",
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
      type: "Worksheet-Download",
      worksheetId: item?.id,
      subject: item?.subject,
      grade: item?.grade,
      topic: item?.topic,
    });
    capture("INTERACT", telemetryData);
    navigate("/worksheet/template");
  };

  const handleShare = () => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Worksheet-Share",
      worksheetId: item?.id,
      subject: item?.subject,
      grade: item?.grade,
      topic: item?.topic,
    });
    capture("INTERACT", telemetryData);
    navigate(`/worksheet/${item.id}/share`);
  };

  const handleAddToTimeline = () => {
    if (item.state === DRAFT) {
      navigate(`/worksheet/${item.id}/edit`);
    } else {
      const telemetryData = telemetryFactory.interact({
        appName,
        type: "Worksheet-Add-To-Timeline",
        worksheetId: item?.id,
        subject: item?.subject,
        grade: item?.grade,
        topic: item?.topic,
      });
      capture("INTERACT", telemetryData);
    }
  };

  const RightButton = () => {
    let props = {
      name: "AddCircleFillIcon",
      _icon: { size: 30 },
      color: "button.500",
      p: "0",
      onPress: handleAddToTimeline,
      rounded: "full",
    };
    if (item.state === DRAFT) {
      props = {
        ...props,
        name: "EditBoxLineIcon",
        color: "gray.500",
        bg: colors.white,
        p: 1,
        _icon: { size: 20 },
      };
    }
    return <IconByName {...props} {..._addIconButton} />;
  };

  return (
    <Box p="5" borderWidth="1" borderColor="gray.300" rounded="lg">
      <VStack space={4}>
        <HStack justifyContent="space-between" alignItems="flex-start">
          <Pressable onPress={() => (url ? navigate(url) : "")}>
            <HStack space={2} alignItems="center">
              <Avatar bg={colors[random]} size="57" rounded="md">
                <H2 color="white">{item.name?.toUpperCase().substr(0, 1)}</H2>
              </Avatar>
              <Stack space="1">
                <VStack space="1px">
                  <H2>{item.name}</H2>
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
          <RightButton />
        </HStack>
        <Subtitle
          color="worksheetBoxText.500"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
          }}
        >
          {item.description}
        </Subtitle>
        <HStack space="2">
          <VStack>
            <HStack space="1" alignItems="center">
              <IconByName
                name="SurveyLineIcon"
                _icon={{ size: 12 }}
                color="worksheetBoxText.400"
                p="0"
              />
              <Subtitle color="worksheetBoxText.400">
                {"Subject: " + item.subject}
              </Subtitle>
            </HStack>
            <HStack space="1" alignItems="center">
              <IconByName
                name="BarChart2LineIcon"
                _icon={{ size: 12 }}
                color="worksheetBoxText.400"
                p="0"
              />
              <Subtitle color="worksheetBoxText.400">
                {"Level: " + item.level}
              </Subtitle>
            </HStack>
            <HStack space="1" alignItems="center">
              <IconByName
                name="QuestionLineIcon"
                _icon={{ size: 12 }}
                color="worksheetBoxText.400"
                p="0"
              />
              <Subtitle color="worksheetBoxText.400">
                {"Questions: " +
                  (Array.isArray(item.questions)
                    ? item.questions.length
                    : item.questions)}
              </Subtitle>
            </HStack>
          </VStack>
          <VStack>
            <HStack space="1" alignItems="center">
              <IconByName
                name="AccountBoxFillIcon"
                _icon={{ size: 12 }}
                color="worksheetBoxText.400"
                p="0"
              />
              <Subtitle color="worksheetBoxText.400">
                {"Grade: " + item.grade}
              </Subtitle>
            </HStack>
            <HStack space="1" alignItems="center">
              <IconByName
                name="ArticleLineIcon"
                _icon={{ size: 12 }}
                color="worksheetBoxText.400"
                p="0"
              />
              <Subtitle color="worksheetBoxText.400">
                {t("TOPIC") + ": " + item.topic}
              </Subtitle>
            </HStack>
            <HStack space="1" alignItems="center">
              <IconByName
                name="Download2LineIcon"
                _icon={{ size: 12 }}
                color="worksheetBoxText.400"
                p="0"
              />
              <Subtitle color="worksheetBoxText.400">
                {"Downloads: " + item.downloads}
              </Subtitle>
            </HStack>
          </VStack>
        </HStack>
        {canShare ? (
          <HStack space="5">
            {!showButtonArray || showButtonArray.includes("Like") ? (
              <Box shadow="2" p="2" rounded="full">
                <IconByName
                  name={like.id ? "Heart3FillIcon" : "Heart3LineIcon"}
                  _icon={{ size: 15 }}
                  color="button.500"
                  p="0"
                  onPress={handleLike}
                />
              </Box>
            ) : (
              ""
            )}
            {!showButtonArray || showButtonArray.includes("Share") ? (
              <Box shadow="2" p="2" rounded="full">
                <IconByName
                  name="ShareLineIcon"
                  _icon={{ size: 15 }}
                  p="0"
                  onPress={handleShare}
                />
              </Box>
            ) : (
              ""
            )}
            {!showButtonArray || showButtonArray.includes("download") ? (
              <Box shadow="2" p="2" rounded="full">
                <IconByName
                  onPress={handleDownload}
                  name="DownloadLineIcon"
                  _icon={{ size: 15 }}
                  color="button.500"
                  p="0"
                />
              </Box>
            ) : (
              ""
            )}
          </HStack>
        ) : (
          ""
        )}
      </VStack>
    </Box>
  );
}
