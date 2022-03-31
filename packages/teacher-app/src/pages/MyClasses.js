import React from "react";
import { Text, Box, Pressable } from "native-base";
import { useTranslation } from "react-i18next";
import { Animated, Dimensions } from "react-native-web";
import { Layout } from "@shiksha/common-lib";
import { footerMenus } from "./parts/assets";
import moment from "moment";
import manifest from "../manifest.json";

const MyClassRoute = React.lazy(() => import("classes/MyClassRoute"));
const TimeTableRoute = React.lazy(() => import("timetable/TimeTableRoute"));

const MyClasses = () => {
  const { t } = useTranslation();

  // const renderScene = SceneMap({
  //   first: MyClassRoute,
  //   second: TimeTableRoute,
  // });

  const initialLayout = { width: Dimensions.get("window").width };
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: t("MY_CLASSES") },
    { key: "second", title: t("TIME_TABLE") },
  ]);
  const RenderTabBar = ({ navigationState }) => {
    return (
      <Box flexDirection="row">
        {navigationState.routes.map((route, i) => {
          return (
            <Pressable key={i} flex={1} onPress={() => setIndex(i)}>
              <Box
                borderBottomWidth="3"
                borderColor={index === i ? "button.500" : "coolGray.200"}
                alignItems="center"
                p="3"
                cursor="pointer"
              >
                <Animated.Text>
                  <Text {...{ color: index === i ? "button.500" : "#a1a1aa" }}>
                    {route.title}
                  </Text>
                </Animated.Text>
              </Box>
            </Pressable>
          );
        })}
      </Box>
    );
  };
  return (
    <Layout
      _header={{
        title: t("MY_CLASSES"),
        icon: "Group",
        subHeading: moment().format("hh:mm a"),
        _subHeading: { fontWeight: 500, textTransform: "uppercase" },
        avatar: true,
      }}
      _appBar={{ languages: manifest.languages }}
      subHeader={t("THE_CLASSES_YOU_TAKE")}
      _subHeader={{
        bg: "classCard.500",
        _text: {
          fontSize: "16px",
          fontWeight: "600",
          textTransform: "inherit",
        },
      }}
      _footer={footerMenus}
    >
      <Box bg="white" p="5" mb="4" roundedBottom={"xl"} shadow={2}>
        {/* 
              //TODO: This is not working in standalone app. some issues with css
              <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                renderTabBar={renderTabBar}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                style={{ marginTop: StatusBar.currentHeight }}
              />
              */}

        <RenderTabBar navigationState={{ routes: routes }} />
        {index === 0 ? <MyClassRoute /> : <TimeTableRoute />}
      </Box>
    </Layout>
  );
};

export default MyClasses;
