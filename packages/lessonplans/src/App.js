import React from "react";
import "./App.css";
import { extendTheme } from "native-base";
import { DEFAULT_THEME, AppShell, initializeI18n } from "@shiksha/common-lib";
import LessonPlansDetails from "pages/LessonPlansDetails";
import Lessonplans from "./pages/Lessonplans";
import SingleLessonPlan from "pages/SingleLessonPlan";
import ExploreVideosList from "pages/ExploreVideosList";
import VideoDetails from "pages/VideoDetails";
import LessonplanShare from "pages/LessonplanShare";

function App() {
  const theme = extendTheme(DEFAULT_THEME);
  initializeI18n(
    ["lessonplans"],
    `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
  );
  const routes = [
    {
      moduleName: "lessonplans",
      path: "/lessonplans/list",
      component: Lessonplans,
    },
    {
      moduleName: "lessonplans",
      path: "/videos/list",
      component: ExploreVideosList,
    },
    {
      moduleName: "lessonplans",
      path: "/video/:id",
      component: VideoDetails,
    },
    {
      moduleName: "lessonplans",
      path: "/lessonplan/:id",
      component: SingleLessonPlan,
    },
    {
      moduleName: "lessonplans",
      path: "/lessonplan/:lessonplanId/share",
      component: LessonplanShare,
    },
    {
      moduleName: "lessonplans",
      path: "*",
      component: LessonPlansDetails,
    },
  ];
  const LoginComponent = React.lazy(() => import("core/Login"));

  return (
    <AppShell
      theme={theme}
      basename={process.env.PUBLIC_URL}
      routes={routes}
      AuthComponent={LoginComponent}
      _authComponent={{ swPath: "/modules/lessonplans" }}
    />
  );
}

export default App;
