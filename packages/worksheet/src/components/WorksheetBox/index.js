import { capture, IconByName, telemetryFactory } from "@shiksha/common-lib";
import {
  Avatar,
  Box,
  HStack,
  Pressable,
  Stack,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

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
  const [like, setLike] = React.useState(false);
  const [random, setRandom] = React.useState();

  React.useEffect((e) => {
    setRandom(Math.floor(Math.random() * (4 - 1) + 1) - 1);
  }, []);

  const handleLike = (item) => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Worksheet-Like",
      worksheetId: item?.id,
      subject: item?.subject,
      grade: item?.grade,
      topic: item?.topic,
    });
    capture("INTERACT", telemetryData);
    setLike(!like);
  };

  const handleDownload = (item) => {
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

  const handleShare = (item) => {
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

  const handleAddToTimeline = (item) => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Worksheet-Add-To-Timeline",
      worksheetId: item?.id,
      subject: item?.subject,
      grade: item?.grade,
      topic: item?.topic,
    });
    capture("INTERACT", telemetryData);
  };

  return (
    <Box p="5" borderWidth="1" borderColor="gray.300" rounded="lg">
      <VStack space={4}>
        <HStack justifyContent="space-between" alignItems="flex-start">
          <Pressable onPress={() => (url ? navigate(url) : "")}>
            <HStack space={2} alignItems="center">
              <Avatar bg={colors[random]} size="57" rounded="md">
                <Text fontWeight="600" fontSize="16px" color="white">
                  {item.name?.toUpperCase().substr(0, 1)}
                </Text>
              </Avatar>
              <Stack space="1">
                <VStack space="1px">
                  <Text fontWeight="600" fontSize="16px">
                    {item.name}
                  </Text>
                </VStack>
                <HStack space={1} alignItems="center">
                  <IconByName
                    name="Heart3FillIcon"
                    color="red.500"
                    _icon={{ size: 12 }}
                    isDisabled
                  />
                  <Text fontWeight="600" fontSize="10px">
                    {((item?.likes ? item?.likes : 0) + like ? 1 : 0) +
                      " likes"}
                  </Text>

                  <Text fontWeight="600" fontSize="10px">
                    ({item?.comments ? item?.comments : 0 + " comments"})
                  </Text>
                </HStack>
              </Stack>
            </HStack>
          </Pressable>
          <IconByName
            name="AddCircleFillIcon"
            _icon={{ size: 30 }}
            color="button.500"
            p="0"
            onPress={(e) => handleAddToTimeline(item)}
            {..._addIconButton}
          />
        </HStack>
        <Text
          fontWeight="400"
          fontSize="12px"
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
        </Text>
        <HStack space="2">
          <VStack>
            <HStack space="1" alignItems="center">
              <IconByName
                name="SurveyLineIcon"
                _icon={{ size: 12 }}
                color="worksheetBoxText.400"
                p="0"
              />
              <Text
                fontWeight="400"
                fontSize="12px"
                color="worksheetBoxText.400"
              >
                {"Subject: " + item.subject}
              </Text>
            </HStack>
            <HStack space="1" alignItems="center">
              <IconByName
                name="BarChart2LineIcon"
                _icon={{ size: 12 }}
                color="worksheetBoxText.400"
                p="0"
              />
              <Text
                fontWeight="400"
                fontSize="12px"
                color="worksheetBoxText.400"
              >
                {"Level: " + item.level}
              </Text>
            </HStack>
            <HStack space="1" alignItems="center">
              <IconByName
                name="QuestionLineIcon"
                _icon={{ size: 12 }}
                color="worksheetBoxText.400"
                p="0"
              />
              <Text
                fontWeight="400"
                fontSize="12px"
                color="worksheetBoxText.400"
              >
                {"Questions: " +
                  (Array.isArray(item.questions)
                    ? item.questions.length
                    : item.questions)}
              </Text>
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
              <Text
                fontWeight="400"
                fontSize="12px"
                color="worksheetBoxText.400"
              >
                {"Grade: " + item.grade}
              </Text>
            </HStack>
            <HStack space="1" alignItems="center">
              <IconByName
                name="ArticleLineIcon"
                _icon={{ size: 12 }}
                color="worksheetBoxText.400"
                p="0"
              />
              <Text
                fontWeight="400"
                fontSize="12px"
                color="worksheetBoxText.400"
              >
                {t("TOPIC") + ": " + item.topic}
              </Text>
            </HStack>
            <HStack space="1" alignItems="center">
              <IconByName
                name="Download2LineIcon"
                _icon={{ size: 12 }}
                color="worksheetBoxText.400"
                p="0"
              />
              <Text
                fontWeight="400"
                fontSize="12px"
                color="worksheetBoxText.400"
              >
                {"Downloads: " + item.downloads}
              </Text>
            </HStack>
          </VStack>
        </HStack>
        {canShare ? (
          <HStack space="5">
            {!canShowButtonArray || canShowButtonArray.includes("Like") ? (
              <Box shadow="2" p="2" rounded="full">
                <IconByName
                  name={like ? "Heart3FillIcon" : "Heart3LineIcon"}
                  _icon={{ size: 15 }}
                  color="button.500"
                  p="0"
                  onPress={(e) => handleLike(item)}
                />
              </Box>
            ) : (
              ""
            )}
            {!canShowButtonArray || canShowButtonArray.includes("Share") ? (
              <Box shadow="2" p="2" rounded="full">
                <IconByName
                  name="ShareLineIcon"
                  _icon={{ size: 15 }}
                  p="0"
                  onPress={(e) => handleShare(item)}
                />
              </Box>
            ) : (
              ""
            )}
            {!canShowButtonArray || canShowButtonArray.includes("download") ? (
              <Box shadow="2" p="2" rounded="full">
                <IconByName
                  onPress={(e) => handleDownload(item)}
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
