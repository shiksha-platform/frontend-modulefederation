import React from "react";
import {
  H2,
  overrideColorTheme,
  Loading,
  telemetryFactory,
  capture,
  BodySmall,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import { VStack } from "native-base";
import { useNavigate } from "react-router-dom";
import VideoComponent from "./VideoComponent";
import colorTheme from "../colorTheme";
import { videos as videosData } from "../config/mylearning";
import VideoActionsheet from "./Actionsheet/VideoActionsheet";
const colors = overrideColorTheme(colorTheme);

const ONGOING = "Ongoing";
const ASSIGNED = "Assigned";
const COMPLETED = "Completed";

export default function MyVideosRoute({ appName }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [videoOngoing, setVideoOngoing] = React.useState([]);
  const [videoAssigned, setVideoAssigned] = React.useState([]);
  const [videoCompleted, setVideoCompleted] = React.useState([]);

  React.useEffect(async () => {
    setVideoOngoing(videosData.filter((e) => e.state === ONGOING));
    setVideoAssigned(videosData.filter((e) => e.state === ASSIGNED));
    setVideoCompleted(videosData.filter((e) => e.state === COMPLETED));
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleExploreAllVideo = (state) => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Video-Explore",
      state,
    });
    capture("INTERACT", telemetryData);
    navigate(`/mylearning/video/list/${state}`);
  };
  return (
    <VStack space={2}>
      <VideoComponent
        _box={{ bg: colors.white, p: "5" }}
        appName={appName}
        data={videoOngoing}
        leftTitle={
          <VStack>
            <H2>{t("ONGOING")}</H2>
            <BodySmall>
              {videoOngoing.length} {t("COURSES")}
            </BodySmall>
          </VStack>
        }
        rightTitle={t("EXPLORE_ALL_COURSES")}
        seeButtonText={t("SHOW_MORE")}
        _seeButton={{
          onPress: (e) => handleExploreAllVideo(ONGOING),
          mt: "4",
        }}
      />
      {videoAssigned.length > 0 ? (
        <VideoComponent
          _box={{ bg: colors.white, p: "5" }}
          appName={appName}
          data={videoAssigned}
          leftTitle={
            <VStack>
              <H2>{t("ASSIGNED")}</H2>
              <BodySmall>
                {videoAssigned.length} {t("COURSES")}
              </BodySmall>
            </VStack>
          }
          seeButtonText={t("SHOW_MORE")}
          _seeButton={{
            onPress: (e) => handleExploreAllVideo(ASSIGNED),
            mt: "4",
          }}
        />
      ) : (
        <React.Fragment />
      )}
      <VideoComponent
        _box={{ bg: colors.white, p: "5" }}
        appName={appName}
        data={videoCompleted}
        leftTitle={
          <VStack>
            <H2>{t("COMPLETED")}</H2>
            <BodySmall>
              {videoOngoing.length} {t("COURSES")}
            </BodySmall>
          </VStack>
        }
        seeButtonText={t("SHOW_MORE")}
        _seeButton={{
          onPress: (e) => handleExploreAllVideo(COMPLETED),
          mt: "4",
        }}
      />
    </VStack>
  );
}
