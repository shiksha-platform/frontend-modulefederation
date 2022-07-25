import React from "react";
import "./App.css";
import { extendTheme } from "native-base";
import { DEFAULT_THEME, AppShell, initializeI18n } from "@shiksha/common-lib";
import CourseList from "./pages/CourseList";
import MyLearning from "./pages/MyLearning";
import CourseDetails from "./pages/CourseDetails";
import VideoList from "./pages/VideoList";
import VideoDetails from "./pages/VideoDetails";

function App() {
  const theme = extendTheme(DEFAULT_THEME);
  initializeI18n(
    ["mylearning"],
    `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
  );
  const routes = [
    {
      path: "/mylearning/list/:state",
      component: CourseList,
    },
    {
      path: "/mylearning/list",
      component: CourseList,
    },
    {
      path: "/mylearning/:id/view",
      component: CourseDetails,
    },
    {
      path: "/mylearning/video/list/:state",
      component: VideoList,
    },
    {
      path: "/mylearning/video/list",
      component: VideoList,
    },
    {
      path: "/mylearning/video/:id/view",
      component: VideoDetails,
    },
    {
      path: "/mylearning",
      component: MyLearning,
    },
    {
      path: "*",
      component: MyLearning,
    },
  ];
  const LoginComponent = React.lazy(() => import("core/Login"));

  return (
    <AppShell theme={theme} routes={routes} AuthComponent={LoginComponent} />
  );
}

export default App;
