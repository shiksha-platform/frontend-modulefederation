import {
  capture,
  IconByName,
  telemetryFactory,
  H2,
  Caption,
  likeRegistryService,
  overrideColorTheme,
  BodySmall,
  BodyMedium,
  ProgressBar,
} from "@shiksha/common-lib";
import { Avatar, Box, HStack, Pressable, Stack, VStack } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import colorTheme from "../colorTheme";
import AttributeComponent from "./AttributeComponent";
const colors = overrideColorTheme(colorTheme);

const ONGOING = "Ongoing";
const ASSIGNED = "Assigned";
const COMPLETED = "Completed";

const AttributeData = [
  { icon: "TimeLineIcon", label: "DURATION", attribute: "duration" },
  { icon: "CalendarCheckLineIcon", label: "DUE_DATE", attribute: "dueDate" },
  { icon: "BookLineIcon", label: "SOURCE", attribute: "source" },
  { icon: "AccountBoxLineIcon", label: "TAKEN_BY", attribute: "takenBy" },
];

export default function LearningBox({
  item,
  url,
  canShowButtonArray,
  isHeaderHide,
  _addIconButton,
  _box,
  appName,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const randomColors = [
    "lightBlue.800",
    "indigo.900",
    "fuchsia.700",
    "rose.600",
  ];
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
    if (item.state === "DRAFT") {
      setShowButtonArray(["Like"]);
    } else {
      setShowButtonArray(canShowButtonArray);
    }
  }, []);

  const getLikes = async () => {
    setLikes([]);
    setLike({});
  };

  const getComments = async () => {
    setComments([]);
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
        context: "MyLearning",
        type: "like",
      };
      const { osid } = await likeRegistryService.create(newData);
      const telemetryData = telemetryFactory.interact({
        appName,
        type: "MyLearning-Like",
        MyLearningId: item?.id,
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

  const handleShare = () => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "MyLearning-Share",
      myLearningId: item?.id,
      subject: item?.subject,
      grade: item?.grade,
      topic: item?.topic,
    });
    capture("INTERACT", telemetryData);
    // navigate(`/mylearning/${item.id}/share`);
  };

  const handleAddToTimeline = () => {
    if (item.state === "DRAFT") {
      // navigate(`/mylearning/${item.id}/edit`);
    } else {
      const telemetryData = telemetryFactory.interact({
        appName,
        type: "MyLearning-Add-To-Timeline",
        myLearningId: item?.id,
        subject: item?.subject,
        grade: item?.grade,
        topic: item?.topic,
      });
      capture("INTERACT", telemetryData);
    }
  };

  const RightButton = () => {
    let props = {
      name: "InformationLineIcon",
      _icon: { size: 25 },
      bg: colors.white,
      p: 1,
      onPress: handleAddToTimeline,
      rounded: "full",
    };

    return <IconByName {...props} {..._addIconButton} />;
  };

  return (
    <Box
      p="5"
      borderWidth="1"
      borderColor={colors.lightGray2}
      rounded="lg"
      {..._box}
    >
      <VStack space={4}>
        {!isHeaderHide ? (
          <HStack justifyContent="space-between" alignItems="flex-start">
            <Pressable onPress={() => (url ? navigate(url) : "")}>
              <HStack space={2} alignItems="center">
                <Avatar bg={randomColors[random]} size="57" rounded="md">
                  <H2 color={colors.white}>
                    {item.name?.toUpperCase().substr(0, 1)}
                  </H2>
                </Avatar>
                <Stack space="1">
                  <VStack space="1px">
                    <H2>{item.name}</H2>
                  </VStack>
                  <HStack space={1} alignItems="center">
                    <IconByName
                      name="Heart3FillIcon"
                      color={colors.eventError}
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
        ) : (
          <React.Fragment />
        )}
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
          {item.description}
        </BodyMedium>
        <AttributeComponent data={AttributeData} object={item} />
        <HStack space="4" alignItems="center">
          <BodySmall>{t("PROGRESS")}</BodySmall>
          <ProgressBar
            flex="1"
            sufix={"%"}
            data={[
              {
                color: colors.success,
                value: 50,
              },
              {
                color: colors.danger,
                value: 50,
              },
            ]}
          />
        </HStack>
        <HStack space="5">
          {!showButtonArray || showButtonArray.includes("Like") ? (
            <Box shadow="2" p="2" rounded="full">
              <IconByName
                name={like.id ? "Heart3FillIcon" : "Heart3LineIcon"}
                _icon={{ size: 15 }}
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
                _icon={{ size: 15 }}
                p="0"
                onPress={handleShare}
              />
            </Box>
          ) : (
            <React.Fragment />
          )}
        </HStack>
      </VStack>
    </Box>
  );
}
