import React, { useEffect, useState } from "react";
import {
  capture,
  Layout,
  Menu,
  classRegistryService,
  studentRegistryService,
  overrideColorTheme,
  getApiConfig,
} from "@shiksha/common-lib";
import { Stack } from "native-base";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import manifest from "../../manifest.json";
import ClassStudentsPanel from "./Molecules/ClassStudentsPanel";
import ClassSubjectsPanel from "./Molecules/ClassSubjectsPanel";
import ClassAttendanceCard from "./Molecules/ClassAttendanceCard";
import ClassDetailsPanel from "./Molecules/ClassDetailsPanel";
import { _header } from "./assets";
import colorTheme from "../../colorTheme";

const colors = overrideColorTheme(colorTheme);

const ClassDetails = ({ footerLinks }) => {
  const { t } = useTranslation();
  const [students, setStudents] = useState([]);
  const [classObject, setClassObject] = useState({});
  const [loading, setLoading] = useState(true);
  const { classId } = useParams();

  useEffect(() => {
    let ignore = false;
    const getData = async () => {
      const newManifest = await getApiConfig();
      let sortBy = "admissionNo";
      if (
        newManifest?.["attendance.order_of_attendance_card"] ===
        '"Alphabetically"'
      ) {
        sortBy = "firstName";
      }
      const studentData = await studentRegistryService.getAll({
        classId,
        sortBy,
      });
      setStudents(studentData);
      await getClass();
      setLoading(false);
    };
    getData();
  }, [classId]);

  const getClass = async () => {
    let classObj = await classRegistryService.getOne({ id: classId });
    setClassObject(classObj);
  };

  React.useEffect(() => {
    capture("PAGE");
  }, []);

  return (
    <Layout
      imageUrl={
        !loading
          ? classObject.image && classObject.image !== ""
            ? `${process.env.REACT_APP_API_URL}/files/${encodeURIComponent(
                classObject.image
              )}`
            : `${window.location.origin}/class.png`
          : ""
      }
      _header={_header({ name: classObject.name, classId, getClass })}
      _appBar={{ languages: manifest.languages }}
      subHeader={
        <Menu
          routeDynamics={true}
          items={[
            {
              id: classId,
              keyId: 1,
              title: t("TAKE_ATTENDANCE"),
              icon: "CalendarCheckLineIcon",
              _text: { minW: "115px" },
              route: "/attendance/:id",
              boxMinW: "200px",
            },
          ]}
          type={"vertical"}
        />
      }
      _subHeader={{
        bottom: "15px",
        bg: colors.cardBg,
      }}
      _footer={footerLinks}
    >
      <Stack space={1} mb="2" shadow={2}>
        <ClassAttendanceCard
          classId={classId}
          students={students}
        ></ClassAttendanceCard>
        <ClassStudentsPanel
          classObject={classObject}
          students={students}
        ></ClassStudentsPanel>
        <ClassSubjectsPanel />
        <ClassDetailsPanel students={students} />
      </Stack>
    </Layout>
  );
};

export default ClassDetails;
