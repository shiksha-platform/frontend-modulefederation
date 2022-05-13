import React from "react";
import { IconByName, Layout, SubMenu, Tab } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import { Avatar, Box, Button, HStack, Stack, Text, VStack } from "native-base";
import { worksheets } from "./../config/worksheet";
import { useNavigate } from "react-router-dom";
import manifest from "../manifest.json";

export default function TeachingDetail({ footerLinks, appName }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Layout
      _header={{
        title: t("MY_TEACHING"),
      }}
      _appBar={{ languages: manifest.languages }}
      subHeader={t("ACCESS_AND_PLAN_YOUR_TEACHING_MATERIAL")}
      _subHeader={{ bg: "worksheetCard.500" }}
      _footer={footerLinks}
    >
      <VStack>
        <Box bg="white" p="5" mb="4" roundedBottom={"xl"} shadow={2}>
          <Tab
            routes={[
              {
                title: t("Worksheets"),
                component: (
                  <VStack>
                    <Worksheets
                      data={worksheets}
                      leftTitle="Popular This Week"
                      rightTitle="Explore Questions"
                    />
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
          <Button variant="ghost" onPress={(e) => navigate("/questionBank")}>
            <Text fontWeight="500" fontSize="14px" color={"button.500"}>
              {rightTitle}
            </Text>
          </Button>
        ) : (
          ""
        )}
      </HStack>
      <VStack space={2}>
        {data.map((item, index) => {
          return (
            <Box
              key={index}
              p="5"
              borderWidth="1"
              borderColor="gray.300"
              rounded="lg"
            >
              <VStack space="4">
                <HStack justifyContent="space-between" alignItems="flex-start">
                  <HStack space={2} alignItems="center">
                    <Avatar bg="amber.500" size="57" rounded="md">
                      {item.heading?.toUpperCase().substr(0, 2)}
                    </Avatar>
                    <Stack space="1">
                      <VStack space="1px">
                        <Text fontWeight="600" fontSize="16px">
                          {item.heading}
                        </Text>
                        <HStack space={1} alignItems="center">
                          <Text fontWeight="400" fontSize="10px">
                            {item.subHeading} {"•"}
                          </Text>
                          <Text fontWeight="400" fontSize="10px">
                            {t("CLASS") + " " + item.class}
                          </Text>
                        </HStack>
                      </VStack>

                      <HStack space={1} alignItems="center">
                        <IconByName
                          name="Heart3FillIcon"
                          color="red.500"
                          _icon={{ size: 12 }}
                          isDisabled
                        />
                        <Text fontWeight="600" fontSize="10px">
                          {item.likes + " likes"}
                        </Text>

                        <Text fontWeight="600" fontSize="10px">
                          {item.comments + " comments"}
                        </Text>
                      </HStack>
                    </Stack>
                  </HStack>
                  <IconByName
                    name="AddCircleFillIcon"
                    _icon={{ size: 30 }}
                    color="button.500"
                    p="0"
                  />
                </HStack>

                <Text fontWeight="600" fontSize="10px">
                  {item.description}
                </Text>
                <HStack
                  space="2"
                  justifyContent="space-between"
                  alignItems="flex-end"
                >
                  <Stack space="2">
                    <HStack space="2">
                      <HStack space="1" alignItems="center">
                        <IconByName
                          name="SurveyLineIcon"
                          _icon={{ size: 12 }}
                          p="0"
                        />
                        <Text fontWeight="600" fontSize="10px">
                          {"Subject: " + item.subject}
                        </Text>
                      </HStack>
                      <HStack space="1" alignItems="center">
                        <IconByName
                          name="AccountBoxFillIcon"
                          _icon={{ size: 12 }}
                          p="0"
                        />
                        <Text fontWeight="600" fontSize="10px">
                          {"Grade: " + item.grade}
                        </Text>
                      </HStack>
                    </HStack>
                    <HStack space="2">
                      <HStack space="1" alignItems="center">
                        <IconByName
                          name="BarChart2LineIcon"
                          _icon={{ size: 12 }}
                          p="0"
                        />
                        <Text fontWeight="600" fontSize="10px">
                          {"Level: " + item.level}
                        </Text>
                      </HStack>
                      <HStack space="1" alignItems="center">
                        <IconByName
                          name="ArticleLineIcon"
                          _icon={{ size: 12 }}
                          p="0"
                        />
                        <Text fontWeight="600" fontSize="10px">
                          {"Chapter: " + item.chapter}
                        </Text>
                      </HStack>
                    </HStack>
                    <HStack space="2">
                      <HStack space="1" alignItems="center">
                        <IconByName
                          name="QuestionLineIcon"
                          _icon={{ size: 12 }}
                          p="0"
                        />
                        <Text fontWeight="600" fontSize="10px">
                          {"Questions: " + item.questions}
                        </Text>
                      </HStack>
                      <HStack space="1" alignItems="center">
                        <IconByName
                          name="Download2LineIcon"
                          _icon={{ size: 12 }}
                          p="0"
                        />
                        <Text fontWeight="600" fontSize="10px">
                          {"Downloads: " + item.downloads}
                        </Text>
                      </HStack>
                    </HStack>
                  </Stack>
                  <HStack space="2">
                    <Box shadow="2" p="2" rounded="full">
                      <IconByName
                        name="ShareLineIcon"
                        _icon={{ size: 30 }}
                        p="0"
                      />
                    </Box>
                    <Box shadow="2" p="2" rounded="full">
                      <IconByName
                        name="Heart3LineIcon"
                        _icon={{ size: 30 }}
                        color="button.500"
                        p="0"
                      />
                    </Box>
                  </HStack>
                </HStack>
              </VStack>
            </Box>
          );
        })}
      </VStack>
    </Stack>
  );
};

const LessonPlans = () => {
  return <h4>LessonPlans</h4>;
};
