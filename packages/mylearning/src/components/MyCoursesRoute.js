import React from "react";
import {
  H2,
  Loading,
  telemetryFactory,
  capture,
  BodySmall,
  coursetrackingRegistryService,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import { VStack } from "native-base";
import { useNavigate } from "react-router-dom";
import MyCoursesComponent from "./MyCoursesComponent";

const ONGOING = "Ongoing";
const ASSIGNED = "Assigned";
const COMPLETED = "Completed";

export default function MyCoursesRoute({ appName }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [learningOngoing, setLearningOngoing] = React.useState([]);
  const [learningAssigned, setLearningAssigned] = React.useState([]);
  const [learningCompleted, setLearningCompleted] = React.useState([]);
  const userId = localStorage.getItem("id");
  React.useEffect(async () => {
    setLearningOngoing(
      await coursetrackingRegistryService.getAll({
        limit: 2,
        userId,
        status: ONGOING,
      })
    );
    setLearningAssigned(
      await coursetrackingRegistryService.getAll({
        limit: 2,
        userId,
        status: ASSIGNED,
      })
    );
    setLearningCompleted(
      await coursetrackingRegistryService.getAll({
        limit: 2,
        userId,
        status: COMPLETED,
      })
    );
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleExploreAllMyLearning = (state) => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "MyLearning-Explore",
      state,
    });
    capture("INTERACT", telemetryData);
    navigate(`/mylearning/list/${state}`);
  };
  return (
    <VStack space={2}>
      <MyCoursesComponent
        _box={{ bg: "white", p: "5" }}
        appName={appName}
        data={learningOngoing}
        leftTitle={
          <VStack>
            <H2>{t("ONGOING")}</H2>
            <BodySmall>
              {learningOngoing.length} {t("COURSES")}
            </BodySmall>
          </VStack>
        }
        rightTitle={t("EXPLORE_ALL_COURSES")}
        seeButtonText={t("SHOW_MORE")}
        _seeButton={{
          onPress: (e) => handleExploreAllMyLearning(ONGOING),
          mt: "4",
        }}
      />
      {learningAssigned.length > 0 ? (
        <MyCoursesComponent
          _box={{ bg: "white", p: "5" }}
          appName={appName}
          data={learningAssigned}
          leftTitle={
            <VStack>
              <H2>{t("ASSIGNED")}</H2>
              <BodySmall>
                {learningAssigned.length} {t("COURSES")}
              </BodySmall>
            </VStack>
          }
          seeButtonText={t("SHOW_MORE")}
          _seeButton={{
            onPress: (e) => handleExploreAllMyLearning(ASSIGNED),
            mt: "4",
          }}
        />
      ) : (
        <React.Fragment />
      )}
      <MyCoursesComponent
        _box={{ bg: "white", p: "5" }}
        appName={appName}
        data={learningCompleted}
        leftTitle={
          <VStack>
            <H2>{t("COMPLETED")}</H2>
            <BodySmall>
              {learningOngoing.length} {t("COURSES")}
            </BodySmall>
          </VStack>
        }
        seeButtonText={t("SHOW_MORE")}
        _seeButton={{
          onPress: (e) => handleExploreAllMyLearning(COMPLETED),
          mt: "4",
        }}
      />
    </VStack>
  );
}
