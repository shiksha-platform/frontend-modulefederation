import React from "react";
import {
  Box,
  Center,
  VStack,
  Text,
  HStack,
  Avatar,
  Divider,
  Spacer,
  Pressable,
  Button,
} from "native-base";
import {
  DEFAULT_THEME,
  H2,
  IconByName,
  Collapsible,
  ProgressBar,
  Tab,
  overrideColorTheme,
  BodyLarge,
  H4,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import ClassWiseSubjectProgress from "./ClassWiseSubjectProgress";
import { useNavigate } from "react-router-dom";
import colorTheme from "../../../colorTheme";
const colors = overrideColorTheme(colorTheme);

// const MyClassRoute = React.lazy(() => import("classes/MyClassRoute"));
// const TimeTableRoute = React.lazy(() => import("calendar/TimeTableRoute"));
function ClassCollapsibleCard() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const routes = [
    {
      title: t("SCIENCE"),
      component: (
        <Box py={4}>
          <ClassWiseSubjectProgress />
        </Box>
      ),
    },
    {
      title: t("MATHS"),
      component: (
        <Box py={4}>
          <ClassWiseSubjectProgress />
        </Box>
      ),
    },
    {
      title: t("ENGLISH"),
      component: (
        <Box py={4}>
          <ClassWiseSubjectProgress />
        </Box>
      ),
    },
    {
      title: t("HISTORY"),
      component: (
        <Box py={4}>
          <ClassWiseSubjectProgress />
        </Box>
      ),
    },
    {
      title: t("GEO"),
      component: (
        <Box py={4}>
          <ClassWiseSubjectProgress />
        </Box>
      ),
    },
  ];

  const [progressData2, setProgressData2] = React.useState([
    {
      name: "16 Assessed",
      color: colors.green,
      value: 16,
    },
    {
      name: "4 Pending",
      color: colors.gray,
      value: 4,
    },
  ]);
  return (
    <Collapsible
      defaultCollapse={true}
      header={
        <Box py={4}>
          <H2>Class I</H2>
        </Box>
      }
    >
      <>
        <Divider mb={4} />
        <VStack space={4}>
          {/*bordered box*/}
          <Box>
            <VStack space={6}>
              {/*row 1 box*/}
              <Box>
                <VStack space={6}>
                  <Box>
                    <Tab routes={routes} />
                    <Divider />
                  </Box>
                  <Box>
                    <VStack space={4}>
                      <BodyLarge>
                        Average Class Score is <H2>18</H2>
                        <H4>/25</H4>
                      </BodyLarge>
                      <ProgressBar
                        isTextShow
                        legendType="separated"
                        h="35px"
                        _bar={{ rounded: "md" }}
                        isLabelCountHide
                        data={progressData2}
                      />
                    </VStack>
                  </Box>
                </VStack>
              </Box>
            </VStack>
          </Box>

          <Divider m={0} />

          {/*bordered box*/}
          <Box p={2}>
            <Button
              variant={"outline"}
              onPress={() => {
                navigate("/schools/assessment-section-report");
              }}
            >
              See Section Wise Report
            </Button>
          </Box>
        </VStack>
      </>
    </Collapsible>
  );
}
export default ClassCollapsibleCard;
