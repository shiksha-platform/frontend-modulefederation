import React from "react";
import {
  IconByName,
  Layout,
  Tab,
  classRegistryService,
  BodyLarge,
  H2,
  overrideColorTheme,
  worksheetRegistryService,
  Loading,
  telemetryFactory,
  capture,
  getApiConfig,
  BodyMedium,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import { Box, Button, HStack, Stack, Text, VStack } from "native-base";
import { useNavigate, useParams } from "react-router-dom";
import manifestLocal from "../manifest.json";
import WorksheetBox from "components/WorksheetBox";
import { teachingMaterial } from "./../config/teachingMaterial";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

const styles = {
  stickyButton: { boxShadow: "rgb(0 0 0 / 22%) 0px -2px 10px" },
};

export default function TeachingDetail({ footerLinks, appName }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [message, setMessage] = React.useState(true);
  const [worksheets, setWorksheets] = React.useState([]);
  const [worksheetDrafts, setWorksheetDrafts] = React.useState([]);
  const [classObject, setClassObject] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [showButtonArray, setShowButtonArray] = React.useState(["Like"]);
  const [worksheetConfig, setWorksheetConfig] = React.useState([]);
  const { classId } = useParams();

  const getClass = async () => {
    const data = teachingMaterial.find((e) => e.id === classId);
    if (data) {
      setClassObject(data ? data : {});
    } else {
      let classObj = await classRegistryService.getOne({ id: classId });
      setClassObject(classObj);
    }
  };

  React.useEffect(async () => {
    getClass();
    const data = await worksheetRegistryService.getAll({
      limit: 2,
      state: { eq: "Publish" },
    });
    setWorksheets(data);
    const draftsData = await worksheetRegistryService.getAll({
      limit: 2,
      state: { eq: "Draft" },
    });
    setWorksheetDrafts(draftsData);
    const newManifest = await getApiConfig({ modules: { eq: "Worksheet" } });
    let buttons = [];
    if (newManifest["worksheet.allow-download-worksheet"] === "true") {
      buttons = [...buttons, "Download"];
    }
    if (newManifest["worksheet.allow-sharing-worksheet"] === "true") {
      buttons = [...buttons, "Share"];
    }
    setWorksheetConfig(
      Array.isArray(newManifest?.["worksheet.worksheetMetadata"])
        ? newManifest?.["worksheet.worksheetMetadata"]
        : newManifest?.["worksheet.worksheetMetadata"]
        ? JSON.parse(newManifest?.["worksheet.worksheetMetadata"])
        : []
    );
    setShowButtonArray([...showButtonArray, ...buttons]);
    setLoading(false);
  }, []);

  const handleExploreAllWorksheets = (state) => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Worksheet-Explore",
      state,
    });
    capture("INTERACT", telemetryData);
    navigate(`/worksheet/list/${state}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout
      _header={{
        title: t("MY_TEACHING"),
      }}
      _appBar={{ languages: manifestLocal.languages }}
      subHeader={
        <H2>{`${classObject?.name ? classObject?.name : ""} ${
          classObject?.subjectName ? classObject?.subjectName : ""
        }`}</H2>
      }
      _subHeader={{ bg: colors.cardBg }}
      _footer={footerLinks}
    >
      <VStack>
        {message ? (
          <HStack
            bg={colors.viewNotificationDark}
            p="5"
            justifyContent="space-between"
          >
            <BodyMedium textTransform="inherit">
              Choose Worksheets or Lesson Plans for the class. You can also
              create your own worksheets.
            </BodyMedium>
            <IconByName
              p="0"
              name="CloseCircleLineIcon"
              color={colors.worksheetCloseIcon}
              onPress={(e) => setMessage(false)}
            />
          </HStack>
        ) : (
          ""
        )}
        <Box bg={colors.white} p="5" mb="4" roundedBottom={"xl"} shadow={2}>
          <Tab
            routes={[
              {
                title: t("Worksheets"),
                component: (
                  <VStack>
                    <Worksheets
                      _woksheetBox={{
                        canShowButtonArray: showButtonArray,
                        worksheetConfig,
                      }}
                      appName={appName}
                      data={worksheets}
                      leftTitle="My Worksheets"
                      rightTitle="Explore All Worksheets"
                      seeButtonText={t("SHOW MORE")}
                      _seeButton={{
                        onPress: (e) => handleExploreAllWorksheets("Publish"),
                      }}
                    />
                    <Worksheets
                      _woksheetBox={{
                        canShowButtonArray: showButtonArray,
                        worksheetConfig,
                      }}
                      appName={appName}
                      data={worksheetDrafts}
                      leftTitle="Drafts"
                      seeButtonText={t("SHOW MORE")}
                      _seeButton={{
                        onPress: (e) => handleExploreAllWorksheets("Draft"),
                      }}
                    />
                  </VStack>
                ),
              },
              { title: t("Lesson Plans"), component: <LessonPlans /> },
            ]}
          />
        </Box>
      </VStack>
      <Box bg={colors.white} p="5" position="sticky" bottom="85" shadow={2}>
        <Button
          _text={{ color: colors.white }}
          p="3"
          onPress={(e) => navigate("/worksheet/create")}
        >
          {t("CREATE_NEW_WORKSHEET")}
        </Button>
      </Box>
    </Layout>
  );
}

const Worksheets = ({
  data,
  leftTitle,
  rightTitle,
  seeButton,
  seeButtonText,
  _seeButton,
  _woksheetBox,
  appName,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Stack>
      <HStack justifyContent="space-between" py="5" alignItems="center">
        {leftTitle ? <H2>{leftTitle}</H2> : ""}
        {rightTitle ? (
          <Button variant="ghost" onPress={(e) => navigate("/worksheet/list")}>
            <BodyLarge color={colors.primary}>{rightTitle}</BodyLarge>
          </Button>
        ) : (
          ""
        )}
      </HStack>
      {data.length > 0 ? (
        <Stack>
          <VStack space={3}>
            {data.map((item, index) => {
              return (
                <WorksheetBox
                  appName={appName}
                  key={index}
                  {...{ item, url: `/worksheet/${item.id}` }}
                  {..._woksheetBox}
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
              onPress={(e) => navigate("/worksheet/list")}
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
          {t("WORKSHEET_NOT_FOUND")}
        </Box>
      )}
    </Stack>
  );
};

const LessonPlans = () => {
  return <h4>LessonPlans</h4>;
};
