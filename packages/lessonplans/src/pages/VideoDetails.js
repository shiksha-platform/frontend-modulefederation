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
  H4,
} from "@shiksha/common-lib";
import { Avatar, Box, HStack, Pressable, VStack } from "native-base";
import manifestLocal from "../manifest.json";
import { videoListData as videosData } from "components/config/VideoListData";
import colorTheme from "../colorTheme";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";

const colors = overrideColorTheme(colorTheme);

export default function VideoDetails({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [video, setVideo] = React.useState({});
  const [showButtonArray, setShowButtonArray] = React.useState([]);
  const { id } = useParams();
  const location = useLocation();

  React.useEffect(async () => {
    setVideo(videosData.find((e) => e.id == id));
  }, []);

  console.log(location.state.videoURL, "url");

  React.useEffect(() => {
    return () => {
      console.log("Hello");
    }
  })

  return (
    <Layout
      _appBar={{
        languages: manifestLocal.languages,
        rightIcon: (
          <HStack>
            <IconByName p="0" pr="2" name="ShareLineIcon" />
          </HStack>
        ),
      }}
      _footer={footerLinks}
    >
      <VStack space="1">
        <VideoPlayer url={"http://techslides.com/demos/sample-videos/small.mp4"} />
        <Box bg={colors.white}>
          <Box flex="1" px="5" py="4">
            <VStack space="4">
              <HStack space="1px" justifyContent="space-between">
                <H2
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "1",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {video.title}
                </H2>
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
            </VStack>
          </Box>
        </Box>
      </VStack>
    </Layout>
  );
}
