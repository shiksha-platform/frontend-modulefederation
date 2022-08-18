import React from "react";
import "./App.css";
import { AppShell, initializeI18n } from "@shiksha/common-lib";
import CourseList from "./pages/CourseList";
import MyLearning from "./pages/MyLearning";
import CourseDetails from "./pages/CourseDetails";
import VideoList from "./pages/VideoList";
import VideoDetails from "./pages/VideoDetails";

function App() {
  initializeI18n(
    ["mylearning"],
    `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
  );
  const routes = [
    {
      moduleName: "mylearning",
      path: "/mylearning/list/:state",
      component: CourseList,
    },
    {
      moduleName: "mylearning",
      path: "/mylearning/list",
      component: CourseList,
    },
    {
      moduleName: "mylearning",
      path: "/mylearning/:id/view",
      component: CourseDetails,
    },
    {
      moduleName: "mylearning",
      path: "/mylearning/video/list/:state",
      component: VideoList,
    },
    {
      moduleName: "mylearning",
      path: "/mylearning/video/list",
      component: VideoList,
    },
    {
      moduleName: "mylearning",
      path: "/mylearning/video/:id/view",
      component: VideoDetails,
    },
    {
      moduleName: "mylearning",
      path: "/mylearning",
      component: MyLearning,
    },
    {
      moduleName: "mylearning",
      path: "*",
      component: MyLearning,
    },
  ];
  const LoginComponent = React.lazy(() => import("core/Login"));

  return <AppShell routes={routes} AuthComponent={LoginComponent} />;
}

export default App;
