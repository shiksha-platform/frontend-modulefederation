import React from "react";
import {
  IconByName,
  Layout,
  Tab,
  classRegistryService,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import { Box, Button, HStack, Stack, Text, VStack } from "native-base";
import { worksheets } from "./../config/worksheet";
import { useNavigate, useParams } from "react-router-dom";
import manifest from "../manifest.json";
import WorksheetBox from "components/WorksheetBox";
import { teachingMaterial } from "./../config/teachingMaterial";

export default function TeachingDetail({ footerLinks, appName }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [message, setMessage] = React.useState(true);
  const [classObject, setClassObject] = React.useState({});
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

  React.useState(() => {
    getClass();
  }, []);

  return (
    <Layout
      _header={{
        title: t("MY_TEACHING"),
      }}
      _appBar={{ languages: manifest.languages }}
      subHeader={`${classObject?.name ? classObject?.name : ""} ${
        classObject?.subjectName ? classObject?.subjectName : ""
      }`}
      _subHeader={{ bg: "worksheetCard.500" }}
      _footer={footerLinks}
    >
      <VStack>
        {message ? (
          <HStack
            bg="viewNotification.600"
            p="5"
            justifyContent="space-between"
          >
            <Text textTransform="inherit">
              Choose Worksheets or Lesson Plans for the class. You can also
              create your own worksheets.
            </Text>
            <IconByName
              p="0"
              name="CloseCircleLineIcon"
              color="viewNotification.900"
              onPress={(e) => setMessage(false)}
            />
          </HStack>
        ) : (
          ""
        )}
        <Box bg="white" p="5" mb="4" roundedBottom={"xl"} shadow={2}>
          <Tab
            routes={[
              {
                title: t("Worksheets"),
                component: (
                  <VStack>
                    <Worksheets
                      data={worksheets}
                      leftTitle="My Worksheets"
                      rightTitle="Explore All Worksheets"
                      seeButtonText={t("SEE_ALL_WORKSHEETS")}
                    />
                    <Worksheets
                      data={worksheets}
                      leftTitle="Drafts"
                      seeButtonText={t("SEE_ALL_DRAFTS")}
                      _woksheetBox={{
                        _addIconButton: {
                          name: "EditBoxLineIcon",
                          color: "white",
                          rounded: "full",
                          bg: "button.500",
                          p: "1",
                          _icon: { size: 17 },
                        },
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
      <Box bg="white" p="5" position="sticky" bottom="85" shadow={2}>
        <Button
          _text={{ color: "white" }}
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
  _woksheetBox,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Stack>
      <HStack justifyContent="space-between" py="5" alignItems="center">
        {leftTitle ? (
          <Text fontWeight="600" fontSize="16px">
            {leftTitle}
          </Text>
        ) : (
          ""
        )}
        {rightTitle ? (
          <Button variant="ghost" onPress={(e) => navigate("/worksheet/list")}>
            <Text fontWeight="500" fontSize="14px" color={"button.500"}>
              {rightTitle}
            </Text>
          </Button>
        ) : (
          ""
        )}
      </HStack>
      <VStack space={3}>
        {data.map((item, index) => {
          return (
            <WorksheetBox
              canShare={true}
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
        >
          {seeButtonText}
        </Button>
      )}
    </Stack>
  );
};

const LessonPlans = () => {
  return <h4>LessonPlans</h4>;
};
