import {
  capture,
  IconByName,
  telemetryFactory,
  likeRegistryService,
  overrideColorTheme,
  Caption,
  BodyLarge,
} from "@shiksha/common-lib";
import { Box, Center, HStack, Image, Pressable, VStack } from "native-base";
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
  { icon: "CalendarCheckLineIcon", label: "DUE_DATE", attribute: "dueDate" },
];

export default function VideoBox({
  item,
  url,
  canShowButtonArray,
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
  const ref = React.useRef(null);
  const [like, setLike] = React.useState({});
  const [likes, setLikes] = React.useState([]);
  const [showButtonArray, setShowButtonArray] = React.useState([]);
  const [random, setRandom] = React.useState();
  const { sub } = jwt_decode(localStorage.getItem("token"));

  React.useEffect(async (e) => {
    setRandom(Math.floor(Math.random() * (4 - 1) + 1) - 1);
    await getLikes();
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
        context: "Video",
        type: "like",
      };
      const { osid } = await likeRegistryService.create(newData);
      const telemetryData = telemetryFactory.interact({
        appName,
        type: "Video-Like",
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
      type: "Video-Share",
      myLearningId: item?.id,
      subject: item?.subject,
      grade: item?.grade,
      topic: item?.topic,
    });
    capture("INTERACT", telemetryData);
    navigate(`/mylearning/${item.id}/share`);
  };

  const handleAddToTimeline = () => {
    if (item.state === "DRAFT") {
      navigate(`/mylearning/${item.id}/edit`);
    } else {
      const telemetryData = telemetryFactory.interact({
        appName,
        type: "Video-Add-To-Timeline",
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
      _icon: { size: 20 },
      p: "0",
      onPress: handleAddToTimeline,
      rounded: "full",
    };
    if (item.state === "DRAFT") {
      props = {
        ...props,
        name: "EditBoxLineIcon",
        color: colors.gray,
        bg: colors.white,
        p: 1,
        _icon: { size: 20 },
      };
    }
    return <IconByName {...props} {..._addIconButton} />;
  };

  return (
    <>
      <HStack bg={colors.videoBoxBg} rounded="10px" maxH={"140px"}>
        <Box flex={3 / 4}>
          <Box flex={1} justifyContent="center" alignItems="center">
            <Image
              maxH={"140px"}
              rounded="10px"
              w={"100%"}
              h={"100%"}
              source={{
                uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
              }}
              alt="image"
            />
            <Box bg={"rgba(0, 0, 0, 0.6)"} position="absolute" rounded="full">
              <IconByName name="PlayFillIcon" color={colors.white} />
            </Box>
          </Box>
          <Center
            bg={"rgba(0, 0, 0, 0.6)"}
            rounded="lg"
            position="absolute"
            bottom="8px"
            right="8px"
            px="3"
            py="1.5"
          >
            03:00
          </Center>
        </Box>
        <Box flex="1" p="3">
          <VStack space="2">
            <VStack space="2">
              <VStack space="1">
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
                      {item.name}
                    </BodyLarge>
                  </Pressable>
                  <RightButton />
                </HStack>
                <Caption
                  color={colors.gray}
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item.description}
                </Caption>
              </VStack>
              <AttributeComponent data={AttributeData} object={item} />
            </VStack>
            <HStack space="5">
              {!showButtonArray || showButtonArray.includes("Download") ? (
                <Box shadow="2" p="6px" rounded="full" bg={colors.white}>
                  <IconByName
                    name={"Download2LineIcon"}
                    _icon={{ size: 16 }}
                    p="0"
                    onPress={handleLike}
                  />
                </Box>
              ) : (
                <React.Fragment />
              )}

              {!showButtonArray || showButtonArray.includes("Like") ? (
                <Box shadow="2" p="6px" rounded="full" bg={colors.white}>
                  <IconByName
                    name={like.id ? "Heart3FillIcon" : "Heart3LineIcon"}
                    _icon={{ size: 16 }}
                    color={colors.primary}
                    p="0"
                    onPress={handleLike}
                  />
                </Box>
              ) : (
                <React.Fragment />
              )}

              {!showButtonArray || showButtonArray.includes("Share") ? (
                <Box shadow="2" p="6px" rounded="full" bg={colors.white}>
                  <IconByName
                    name="ShareLineIcon"
                    _icon={{ size: 16 }}
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
      </HStack>
    </>
  );
}
