import React from "react";
import { IconByName, Layout, Tab } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import { Box, Button, HStack, Stack, Text, VStack } from "native-base";
import { worksheets } from "./../config/worksheet";
import { useNavigate, useParams } from "react-router-dom";
import manifest from "../manifest.json";
import WorksheetBox from "components/WorksheertBox";
import { teachingMaterial } from "./../config/teachingMaterial";

export default function TeachingDetail({ footerLinks, appName }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [message, setMessage] = React.useState(true);
  const [classObject, setClassObject] = React.useState({});
  const { classId } = useParams();

  React.useState(() => {
    const data = teachingMaterial.find((e) => e.id === classId);
    setClassObject(data ? data : {});
  }, []);

  return (
    <Layout
      _header={{
        title: t("MY_TEACHING"),
      }}
      _appBar={{ languages: manifest.languages }}
      subHeader={`Class ${classObject?.name} ${classObject?.subjectName}`}
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
              color="viewNotification.800"
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
                      rightTitle="Explore Worksheets"
                    />
                    <Worksheets data={worksheets} leftTitle="Drafts" />
                  </VStack>
                ),
              },
              { title: t("Lesson Plans"), component: <LessonPlans /> },
            ]}
          />
        </Box>
      </VStack>
      <Box bg="white" p="5" position="sticky" bottom="0" shadow={2}>
        <Button
          _text={{ color: "white" }}
          p="3"
          onPress={(e) => navigate("/worksheet/create")}
        >
          {t("Create new")}
        </Button>
      </Box>
    </Layout>
  );
}

const Worksheets = ({ data, leftTitle, rightTitle }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Stack>
      <HStack justifyContent="space-between" py="5">
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
            />
          );
        })}
      </VStack>
      <Button
        mt="2"
        variant="outline"
        colorScheme="button"
        rounded="lg"
        onPress={(e) => navigate("/worksheet/list")}
      >
        {t("SEE_MORE")}
      </Button>
    </Stack>
  );
};

const LessonPlans = () => {
  return <h4>LessonPlans</h4>;
};
